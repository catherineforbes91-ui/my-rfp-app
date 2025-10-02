import wixData from 'wix-data';
import { createPdfFromData, createExcelFromData } from './fileGenerators';
import { sendEmail } from './emailSender';

export async function submitRFP(request) {
  try {
    const { name, email, notes, cartItems } = await request.body.json();

    if (!name || !email || !cartItems || cartItems.length === 0) {
      return {
        status: 400,
        body: { success: false, error: "Missing required fields or empty cart" }
      };
    }

    const submission = {
      submitterName: name,
      submitterEmail: email,
      timestamp: new Date(),
      notes,
      items: cartItems
    };

    const inserted = await wixData.insert("RFP_Submissions", submission);

    const pdfBuf = await createPdfFromData(submission, inserted._id);
    const excelBuf = await createExcelFromData(submission, inserted._id);

    const pdfUrl = await uploadBuffer(pdfBuf, `${inserted._id}.pdf`);
    const excelUrl = await uploadBuffer(excelBuf, `${inserted._id}.xlsx`);

    await wixData.update("RFP_Submissions", {
      _id: inserted._id,
      pdfUrl,
      excelUrl
    });

    // send email to user
    await sendEmail({
      to: email,
      subject: `Your RFP #${inserted._id}`,
      html: `<p>Thank you for your RFP request.</p><p><a href="${pdfUrl}">PDF</a> | <a href="${excelUrl}">Excel</a></p>`
    });

    // send to you (site owner)
    await sendEmail({
      to: "you@yourdomain.com",
      subject: `New RFP Submission #${inserted._id}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p>
             <p>Notes: ${notes}</p>
             <p><a href="${pdfUrl}">PDF</a> | <a href="${excelUrl}">Excel</a></p>`
    });

    return { status: 200, body: { success: true } };
  } catch (err) {
    console.error("submitRFP error:", err);
    return { status: 500, body: { success: false, error: err.message } };
  }
}

// Placeholder stub: upload buffer => URL
async function uploadBuffer(buffer, filename) {
  // Implement your logic (Wix Media Manager, external storage, etc.)
  return `https://yourcdn.com/files/${filename}`;
}

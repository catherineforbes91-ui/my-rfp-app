import { PDFDocument, StandardFonts } from 'pdf-lib';
import { utils, write } from 'xlsx';

export async function createPdfFromData(submission, id) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  let y = height - 50;

  page.drawText(`RFP Request #${id}`, { x: 50, y, size: 18, font });
  y -= 30;
  page.drawText(`Name: ${submission.submitterName}`, { x: 50, y, size: 12, font });
  y -= 20;
  page.drawText(`Email: ${submission.submitterEmail}`, { x: 50, y, size: 12, font });
  y -= 20;
  page.drawText(`Notes: ${submission.notes}`, { x: 50, y, size: 12, font });
  y -= 30;
  page.drawText("Items:", { x: 50, y, size: 14, font });
  y -= 20;

  submission.items.forEach((item) => {
    let line = `• ${item.title} ×${item.qty}`;
    if (item.price != null) {
      line += ` — $${item.price}`;
    }
    page.drawText(line, { x: 60, y, size: 12, font });
    y -= 20;
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

export function createExcelFromData(submission, id) {
  const wsData = [
    ["RFP Request", id],
    ["Name", submission.submitterName],
    ["Email", submission.submitterEmail],
    ["Notes", submission.notes],
    [],
    ["Product", "Qty", "Price"]
  ];
  submission.items.forEach(item => {
    wsData.push([
      item.title,
      item.qty,
      item.price != null ? item.price : "N/A"
    ]);
  });

  const ws = utils.aoa_to_sheet(wsData);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "RFP");
  const buf = write(wb, { bookType: "xlsx", type: "buffer" });
  return buf;
}

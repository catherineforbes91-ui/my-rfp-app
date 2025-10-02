import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SubmitRFPPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !email) {
      alert("Name and email are required.");
      return;
    }
    const cartItems = JSON.parse(sessionStorage.getItem("rfpCart") || "[]");
    if (cartItems.length === 0) {
      alert("Cart is empty.");
      return;
    }

    const payload = {
      name,
      email,
      notes,
      cartItems
    };

    try {
      const resp = await fetch("/_api/rfp/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await resp.json();
      if (result.success) {
        sessionStorage.removeItem("rfpCart");
        navigate("/thank-you");
      } else {
        alert("Submission failed: " + result.error);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Error submitting RFP.");
    }
  };

  return (
    <div className="submit-rfp-page">
      <h2>Submit Your RFP</h2>
      <label>Name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <label>Email:</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Notes:</label>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      <button onClick={handleSubmit}>Submit RFP</button>
    </div>
  );
}

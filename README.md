# Wix RFP Catalog App Starter

This is a starter template for a Wix CLI app that implements a product / service catalog plus cart system, allowing visitors to submit a Request for Proposal (RFP). Includes PDF/Excel generation, email notifications, and data storage in Wix Data.

## Setup

1. Clone this repository.
2. Run `npm install`.
3. Connect with a Wix site / set up with Wix CLI.
4. Add your own logic for uploading generated files (`uploadBuffer`) and configure your email (SendGrid or other).
5. Create the Wix Data Collections:
   - `Products`
   - `RFP_Submissions`
6. Run using `wix dev`, test the flow: catalog → cart → submit → email.
7. Deploy using `wix deploy`.

## File Layout

- `frontend/` — React components or UI pages
- `backend/` — server-side logic (handlers, file generation, email)
- `public/` — static assets (if needed)

---

You’ll need to integrate this into your Wix environment, adapt routing & configuration as needed.

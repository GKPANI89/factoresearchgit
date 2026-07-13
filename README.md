# Facto Research

This project now has:

- a Vite/React frontend
- a separate Node/Express mail API for form submission

## Frontend setup

The frontend lives in `client/`.

Set these values in `client/.env`:

- `VITE_API_BASE_URL`: your API origin, for example `https://api.factoresearch.com`
- `VITE_RAZORPAY_KEY_ID`: the Razorpay public key ID (never put the key secret in the client)

Run the frontend:

```bash
cd client
npm install
npm run dev
```

Local Vite can use the deployed API by keeping `VITE_API_BASE_URL=https://api.factoresearch.com`. If you are also running the backend locally, override it in `client/.env.local` with `VITE_API_BASE_URL=http://localhost:3001`.

## Backend setup

The backend lives in `server/`.

Set these values in `server/.env`:

- `SUPPORT_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM_NAME`
- `SMTP_FROM_EMAIL`
- `ALLOWED_ORIGINS`
- `SMTP_CONNECTION_TIMEOUT_MS` (optional, default `10000`)
- `SMTP_GREETING_TIMEOUT_MS` (optional, default `10000`)
- `SMTP_SOCKET_TIMEOUT_MS` (optional, default `20000`)
- `SMTP_SEND_TIMEOUT_MS` (optional, default `25000`)
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

Run the backend:

```bash
cd server
npm install
npm run dev
```

## Backend deployment

Create a web service for the backend with:

- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`

Set the required environment variables on your backend host to match `server/.env`.

For `ALLOWED_ORIGINS`, include your frontend domains, for example:

```text
https://factoresearch.com,https://www.factoresearch.com,http://localhost:5173,http://127.0.0.1:5173
```

## Frontend deployment

Set this environment variable on the frontend host:

```text
VITE_API_BASE_URL=https://api.factoresearch.com
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Build the frontend from `client/`:

```text
Build command: npm run build
Publish directory: client/dist
```

## Razorpay checkout

Service Subscribe buttons create an order through `POST /api/create-order`, add 18% GST to the base price on the server, open Razorpay Standard Checkout with the tax-inclusive total, and verify successful payments through `POST /api/verify-payment`.

Configure Razorpay credentials on the backend deployment. The create-order response supplies the public key ID to Checkout, while the key secret remains on the backend only. `VITE_RAZORPAY_KEY_ID` can remain as an optional frontend fallback.

## Mail behavior

Forms now submit to the backend API and the backend sends the email to `support@factoresearch.com`.

The email entered by the user is used as `reply-to`, which is the correct and safe approach. The backend should not forge the user email as the SMTP sender.

## SMTP auth troubleshooting

If `/api/contact` returns an SMTP authentication error (`535`, `EAUTH`), the SMTP login is being rejected by the mail provider.

Verify:

- `SMTP_USER` and `SMTP_PASS` are valid mailbox credentials (or an app password if required).
- `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` match your provider settings.
- Render can reach your SMTP host from its network region (firewall/provider allowlist issues can cause timeouts and gateway `502`).
- On Render free web services, outbound SMTP ports `25`, `465`, and `587` are blocked (effective September 26, 2025). Use a paid Render instance for SMTP delivery.

Common values:

- GoDaddy Workspace Email: `SMTP_HOST=smtpout.secureserver.net`, `SMTP_PORT=465`, `SMTP_SECURE=true`
- Microsoft 365 (including many GoDaddy M365 mailboxes): `SMTP_HOST=smtp.office365.com`, `SMTP_PORT=587`, `SMTP_SECURE=false`

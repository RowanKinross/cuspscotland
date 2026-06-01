# cuspscotland
website for a support organisation

## Referral submissions

The BRAW and CUSP referral forms now write to Firestore first and then send an EmailJS notification.

Set these Vite env vars before submitting referrals:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

The forms write to `braw-referrals` and `cusp-referrals`, and the EmailJS template receives a `subject`, `message`, and `respondentName` field.

import { addDoc, collection } from 'firebase/firestore';
import dayjs from 'dayjs';
import { db, isFirebaseConfigured } from './firebase';

export const referralCollections = {
  BRAW: 'braw-referrals',
  CUSP: 'cusp-referrals',
};

export const getRespondentName = (form) => {
  const signature = form.signature?.trim();
  if (signature) return signature;

  const fullName = `${form.firstName || ''} ${form.surname || ''}`.trim();
  if (fullName) return fullName;

  return 'Unknown respondent';
};

export const buildReferralEmailPayload = ({ referralLabel, form }) => {
  return {
    refType: referralLabel,
    name: form.surname?.trim() || '',
  };
};

export const saveReferralSubmission = async ({ collectionName, referralLabel, form }) => {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured for referral submissions.');
  }

  return addDoc(collection(db, collectionName), {
    ...form,
    referralLabel,
    respondentName: getRespondentName(form),
    submittedAt: dayjs().toISOString(),
  });
};
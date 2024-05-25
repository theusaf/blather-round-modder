import "server-only";
import { getApps, initializeApp } from "firebase-admin/app";
import { credential } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

const existingApps = getApps();
const app =
  existingApps.length === 0
    ? initializeApp({
        credential: credential.cert(
          JSON.parse(process.env.FIREBASE_CREDENTIALS!)
        ),
      })
    : existingApps[0];

export const firestore = getFirestore(app);

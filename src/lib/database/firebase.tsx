import "server-only";
import { credential } from "firebase-admin";
import { getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const existingApps = getApps();
const app =
	existingApps.length === 0
		? initializeApp({
				credential: credential.cert(
					JSON.parse(
						process.env.NODE_ENV === "production"
							? process.env.FIREBASE_CREDENTIALS!
							: process.env.FIREBASE_CREDENTIALS_DEV!,
					),
				),
			})
		: existingApps[0];

/**
 * The Firestore database instance.
 */
export const firestore = getFirestore(app);

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Prefer using environment variables (NEXT_PUBLIC_* for client-accessible values).
// Defaults below are the config you provided; replace with env vars in production.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyAjCgxG3rtM9OY372yMv6rH8e89AT7orYk", 
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "tasks9-e2fe1.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "tasks9-e2fe1",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?? "tasks9-e2fe1.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "383640036700",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:383640036700:web:7b02f029dc90a34dfb0d99",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "G-67L709W4B3",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Analytics only works in the browser; guard access.
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) analytics = getAnalytics(app);
    })
    .catch(() => {
      analytics = null;
    });
}

export { app, auth, db, storage, analytics };

export default firebaseConfig;

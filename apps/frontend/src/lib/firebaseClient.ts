"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:        process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:     process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId:         process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey) {
  // 開発時に気づければよいので console.warn 程度に
  console.warn("Firebase config is missing. Check NEXT_PUBLIC_FIREBASE_* env vars.");
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
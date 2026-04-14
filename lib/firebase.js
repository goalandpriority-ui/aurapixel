// lib/firebase.js

import { initializeApp } from "firebase/app";

// 🔐 AUTH
import { getAuth } from "firebase/auth";

// 🔥 FIRESTORE (history save)
import { getFirestore } from "firebase/firestore";

// ☁️ STORAGE (image upload)
import { getStorage } from "firebase/storage";

// 🔑 CONFIG (UNTOUCHED - same ah vechuruken)
const firebaseConfig = {
  apiKey: "AIzaSyD9JmUgyEBaQO7Ih_stVQT1FYFY1PXWXAI",
  authDomain: "aurapixel-79620.firebaseapp.com",
  projectId: "aurapixel-79620",
  storageBucket: "aurapixel-79620.firebasestorage.app",
  messagingSenderId: "821210065354",
  appId: "1:821210065354:android:420b80286f9f5f55378733",
};

// 🚀 INIT APP
const app = initializeApp(firebaseConfig);

// 🔐 AUTH EXPORT (OLD LOGIC KEEP)
export const auth = getAuth(app);

// 🔥 NEW - DATABASE
export const db = getFirestore(app);

// ☁️ NEW - STORAGE
export const storage = getStorage(app);

// 📦 EXPORT APP (optional but useful)
export default app;

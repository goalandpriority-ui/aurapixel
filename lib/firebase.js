// lib/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9JmUgyEBaQO7Ih_stVQT1FYFY1PXWXAI",
  authDomain: "aurapixel-79620.firebaseapp.com",
  projectId: "aurapixel-79620",
  storageBucket: "aurapixel-79620.firebasestorage.app",
  messagingSenderId: "821210065354",
  appId: "1:821210065354:android:420b80286f9f5f55378733",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

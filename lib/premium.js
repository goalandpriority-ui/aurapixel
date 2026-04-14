// lib/premium.js

import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

// 💎 ENABLE PREMIUM
export const activatePremium = async (uid) => {
  try {
    await setDoc(
      doc(db, "users", uid),
      {
        isPremium: true,
        premiumAt: serverTimestamp(),
      },
      { merge: true }
    );

    console.log("✅ Premium activated");
  } catch (e) {
    console.log("Premium error:", e);
  }
};

// 🔢 CHECK DAILY LIMIT
export const checkUsageLimit = async (uid) => {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) return { allowed: true };

    const data = snap.data();

    // 💎 Premium → unlimited
    if (data.isPremium) {
      return { allowed: true };
    }

    const today = new Date().toDateString();
    const lastReset = data.lastReset?.toDate().toDateString();

    let count = data.dailyCount || 0;

    // 🔄 Reset daily
    if (today !== lastReset) {
      await updateDoc(ref, {
        dailyCount: 0,
        lastReset: serverTimestamp(),
      });
      count = 0;
    }

    if (count >= 2) {
      return { allowed: false };
    }

    return { allowed: true };

  } catch (e) {
    console.log("Limit error:", e);
    return { allowed: true };
  }
};

// ➕ INCREMENT USAGE
export const incrementUsage = async (uid) => {
  try {
    const ref = doc(db, "users", uid);

    const snap = await getDoc(ref);
    const current = snap.exists() ? snap.data().dailyCount || 0 : 0;

    await setDoc(
      ref,
      {
        dailyCount: current + 1,
        lastReset: serverTimestamp(),
      },
      { merge: true }
    );

  } catch (e) {
    console.log("Usage error:", e);
  }
};

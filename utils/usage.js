import { db, auth } from "../lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "firebase/firestore";

const LIMIT = 2;

// 🔥 CHECK & UPDATE USAGE
export const checkUsage = async () => {
  const user = auth.currentUser;
  if (!user) return { allowed: false };

  const today = new Date().toISOString().split("T")[0];

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  // 🆕 first time user
  if (!snap.exists()) {
    await setDoc(ref, {
      userId: user.uid,
      dailyCount: 1,
      lastUsed: today,
      isPremium: false,
    });

    return { allowed: true };
  }

  const data = snap.data();

  // 💎 Premium → unlimited
  if (data.isPremium) {
    return { allowed: true, premium: true };
  }

  // 🔄 New day reset
  if (data.lastUsed !== today) {
    await updateDoc(ref, {
      dailyCount: 1,
      lastUsed: today,
    });

    return { allowed: true };
  }

  // 🔢 Check limit
  if (data.dailyCount < LIMIT) {
    await updateDoc(ref, {
      dailyCount: data.dailyCount + 1,
    });

    return { allowed: true };
  }

  // ❌ limit reached
  return { allowed: false };
};

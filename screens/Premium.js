// screens/Premium.js

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

// 🔥 FIREBASE
import { auth, db } from "../lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

// 💳 RAZORPAY
import RazorpayCheckout from "react-native-razorpay";

export default function Premium() {

  // 💳 PAYMENT FUNCTION (SECURE FLOW)
  const handlePayment = () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "Login pannunga first ⚠️");
      return;
    }

    const options = {
      description: "AuraPixel Premium",
      currency: "INR",
      key: "YOUR_RAZORPAY_KEY_ID", // 🔑 replace later
      amount: "9900", // ₹99
      name: "AuraPixel",
      prefill: {
        email: user.email,
      },
      theme: { color: "#7c3aed" },
    };

    RazorpayCheckout.open(options)
      .then(async (data) => {

        try {
          // 🔐 BACKEND VERIFY
          const response = await fetch("http://YOUR_SERVER_IP:3000/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          const result = await response.json();

          if (result.success) {
            // 💎 UNLOCK PREMIUM
            await updateDoc(doc(db, "users", user.uid), {
              isPremium: true,
            });

            Alert.alert("Success 🎉", "Premium Activated 💎🔥");
          } else {
            Alert.alert("Verification failed ❌");
          }

        } catch (err) {
          console.log("Verify error:", err);
          Alert.alert("Server error ❌");
        }

      })
      .catch((error) => {
        Alert.alert("Payment Failed ❌");
      });
  };

  return (
    <View style={styles.container}>

      {/* TITLE */}
      <Text style={styles.title}>Go Premium 💎</Text>

      {/* TAGLINE */}
      <Text style={styles.sub}>
        Unlock full power of AuraPixel 🚀
      </Text>

      {/* PLAN CARD */}
      <View style={styles.card}>
        
        <Text style={styles.plan}>Premium Plan</Text>

        <Text style={styles.price}>₹99</Text>

        <Text style={styles.desc}>
          Monthly subscription 🔥
        </Text>

        {/* FEATURES */}
        <View style={styles.features}>
          <Text style={styles.feature}>✅ Unlimited Enhances</Text>
          <Text style={styles.feature}>✅ No Ads</Text>
          <Text style={styles.feature}>✅ Faster Processing</Text>
          <Text style={styles.feature}>✅ HD Download</Text>
        </View>

        {/* BUY BUTTON */}
        <TouchableOpacity
          style={styles.buyBtn}
          onPress={handlePayment}
        >
          <Text style={styles.btnText}>
            Buy Now ₹99 🚀
          </Text>
        </TouchableOpacity>

      </View>

      {/* NOTE */}
      <Text style={styles.note}>
        Cancel anytime 💡
      </Text>

    </View>
  );
}

/* 🎨 STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sub: {
    color: "#94a3b8",
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 25,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
  },
  plan: {
    color: "#22c55e",
    fontSize: 18,
    marginBottom: 10,
  },
  price: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  desc: {
    color: "#94a3b8",
    marginBottom: 20,
  },
  features: {
    width: "100%",
    marginBottom: 20,
  },
  feature: {
    color: "#e2e8f0",
    marginBottom: 8,
  },
  buyBtn: {
    backgroundColor: "#7c3aed",
    padding: 15,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
  note: {
    color: "#64748b",
    marginTop: 20,
  },
});

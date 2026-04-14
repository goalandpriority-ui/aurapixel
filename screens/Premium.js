// screens/Premium.js

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

export default function Premium() {

  // 💳 RAZORPAY PAYMENT (dummy for now)
  const handlePayment = () => {
    Alert.alert("Payment", "Razorpay integration varum 🔥");
    
    // 👉 Next step la real Razorpay add pannuvom
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
            Buy Now 🚀
          </Text>
        </TouchableOpacity>

      </View>

      {/* BACK */}
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

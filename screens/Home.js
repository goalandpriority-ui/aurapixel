import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* APP NAME */}
      <Text style={styles.title}>AuraPixel ✨</Text>

      {/* TAGLINE */}
      <Text style={styles.sub}>
        Turn your photos into HD magic 🔥
      </Text>

      {/* MAIN BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Upload")}
      >
        <Text style={styles.btnText}>Upload Photo 📸</Text>
      </TouchableOpacity>

      {/* SECOND BUTTON */}
      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => navigation.navigate("Upload")}
      >
        <Text style={styles.btnText}>Quick Enhance ⚡</Text>
      </TouchableOpacity>

      {/* HISTORY BUTTON */}
      <TouchableOpacity
        style={styles.historyBtn}
        onPress={() => navigation.navigate("History")}
      >
        <Text style={styles.historyText}>View History 📂</Text>
      </TouchableOpacity>

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
  },
  title: {
    color: "#e2e8f0",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sub: {
    color: "#94a3b8",
    marginBottom: 40,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#7c3aed",
    padding: 15,
    borderRadius: 12,
    width: 200,
    alignItems: "center",
    marginBottom: 15,
  },
  secondaryBtn: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 12,
    width: 200,
    alignItems: "center",
    marginBottom: 20,
  },
  historyBtn: {
    marginTop: 10,
  },
  historyText: {
    color: "#38bdf8",
    fontSize: 14,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
});

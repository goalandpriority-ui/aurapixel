import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import { auth } from "../lib/firebase";
import {
  signInWithCredential,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export default function Home({ navigation }) {
  const [user, setUser] = useState(null);

  // 🔥 Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "821210065354-4ph7l3oe07lfar01e0mtc4pkechfjkbc.apps.googleusercontent.com",
  });

  // 🔥 Handle Google response
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.authentication;

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  // 🔥 Listen user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return unsubscribe;
  }, []);

  // 🔥 Logout
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <View style={styles.container}>
      
      {/* APP NAME */}
      <Text style={styles.title}>AuraPixel ✨</Text>

      {/* USER NAME */}
      {user && (
        <Text style={styles.user}>
          Welcome, {user.displayName} 👋
        </Text>
      )}

      {/* TAGLINE */}
      <Text style={styles.sub}>
        Turn your photos into HD magic 🔥
      </Text>

      {/* LOGIN BUTTON */}
      {!user && (
        <TouchableOpacity
          style={styles.loginBtn}
          disabled={!request}
          onPress={() => promptAsync()}
        >
          <Text style={styles.btnText}>Login with Google 🔐</Text>
        </TouchableOpacity>
      )}

      {/* MAIN BUTTON */}
      {user && (
        <>
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

          {/* HISTORY */}
          <TouchableOpacity
            style={styles.historyBtn}
            onPress={() => navigation.navigate("History")}
          >
            <Text style={styles.historyText}>View History 📂</Text>
          </TouchableOpacity>

          {/* LOGOUT */}
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={handleLogout}
          >
            <Text style={styles.btnText}>Logout 🚪</Text>
          </TouchableOpacity>
        </>
      )}

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
  user: {
    color: "#22c55e",
    marginBottom: 10,
    fontSize: 16,
  },
  sub: {
    color: "#94a3b8",
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  loginBtn: {
    backgroundColor: "#db4437",
    padding: 15,
    borderRadius: 12,
    width: 220,
    alignItems: "center",
    marginBottom: 20,
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
  logoutBtn: {
    backgroundColor: "#ef4444",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
});

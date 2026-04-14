import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert
} from "react-native";
import { useState } from "react";

// 🔥 FIREBASE
import { storage, db, auth } from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// 🔥 USAGE LIMIT
import { checkUsage } from "../utils/usage";

export default function Upload({ navigation }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // 😎 MODE (FULL / FACE)
  const [mode, setMode] = useState("full");

  // 📸 PICK IMAGE
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // ☁️ UPLOAD TO FIREBASE + LIMIT CHECK
  const uploadToFirebase = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Login pannunga first ⚠️");
        return;
      }

      // 🔥 DAILY LIMIT CHECK
      const usage = await checkUsage();

      if (!usage.allowed) {
        Alert.alert(
          "Limit reached ⚠️",
          "2 free uses mudinjiduchu!\n\nWatch Ad 🎥 or Upgrade 💎",
          [
            {
              text: "Watch Ad 🎥",
              onPress: () => {
                // 🔥 future: show rewarded ad
                alert("Ad system later connect pannuvom 😎");
              },
            },
            {
              text: "Go Premium 💎",
              onPress: () => {
                navigation.navigate("Profile");
              },
            },
            {
              text: "Cancel",
              style: "cancel",
            },
          ]
        );
        return;
      }

      setLoading(true);

      const response = await fetch(image);
      const blob = await response.blob();

      const filename = Date.now() + ".jpg";

      const storageRef = ref(storage, `images/${user.uid}/${filename}`);

      // 🔥 Upload
      await uploadBytes(storageRef, blob);

      // 🔗 URL
      const downloadURL = await getDownloadURL(storageRef);

      // 📝 Firestore history
      await addDoc(collection(db, "history"), {
        userId: user.uid,
        image: downloadURL,
        mode: mode,
        createdAt: serverTimestamp(),
      });

      setLoading(false);

      // 🚀 Move to Processing
      navigation.navigate("Processing", {
        image: downloadURL,
        mode,
      });

    } catch (e) {
      console.log("Upload error:", e);
      setLoading(false);
      alert("Upload fail aachu ❌");
    }
  };

  return (
    <View style={styles.container}>

      {/* TITLE */}
      <Text style={styles.title}>Upload Photo 📸</Text>

      {/* LIMIT INFO */}
      <Text style={styles.limitText}>
        Free: 2 images/day ⚡ | Premium: Unlimited 💎
      </Text>

      {/* MODE SELECT */}
      <View style={styles.modeRow}>
        
        <TouchableOpacity
          style={[styles.modeBtn, mode === "full" && styles.active]}
          onPress={() => setMode("full")}
        >
          <Text style={styles.modeText}>Full Enhance</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modeBtn, mode === "face" && styles.active]}
          onPress={() => setMode("face")}
        >
          <Text style={styles.modeText}>Face Enhance 😎</Text>
        </TouchableOpacity>

      </View>

      {/* PICK BUTTON */}
      <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
        <Text style={styles.btnText}>Pick Image</Text>
      </TouchableOpacity>

      {/* IMAGE PREVIEW */}
      {image && (
        <>
          <Image source={{ uri: image }} style={styles.preview} />

          {/* ENHANCE BUTTON */}
          <TouchableOpacity
            style={styles.enhanceBtn}
            onPress={uploadToFirebase}
          >
            <Text style={styles.btnText}>Upload & Enhance 🔥</Text>
          </TouchableOpacity>
        </>
      )}

      {/* LOADING */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#7c3aed"
          style={{ marginTop: 20 }}
        />
      )}

    </View>
  );
}

/* 🎨 STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 20,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
  },
  limitText: {
    color: "#94a3b8",
    marginBottom: 15,
    fontSize: 12,
  },
  modeRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  modeBtn: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#1e293b",
  },
  active: {
    backgroundColor: "#7c3aed",
  },
  modeText: {
    color: "#fff",
  },
  uploadBtn: {
    backgroundColor: "#7c3aed",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  enhanceBtn: {
    backgroundColor: "#22c55e",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    color: "#fff",
  },
  preview: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
});

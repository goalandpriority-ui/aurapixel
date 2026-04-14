import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { useState } from "react";

export default function Upload({ navigation }) {
  const [image, setImage] = useState(null);

  // 😎 MODE (FULL / FACE)
  const [mode, setMode] = useState("full");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>

      {/* TITLE */}
      <Text style={styles.title}>Upload Photo 📸</Text>

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
          <Image
            source={{ uri: image }}
            style={styles.preview}
          />

          <TouchableOpacity
            style={styles.enhanceBtn}
            onPress={() =>
              navigation.navigate("Processing", { image, mode })
            }
          >
            <Text style={styles.btnText}>Enhance Image 🔥</Text>
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
    padding: 20,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
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

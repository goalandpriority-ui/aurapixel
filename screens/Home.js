import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AuraPixel ✨</Text>
      <Text style={styles.sub}>AI Photo Enhancer</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Upload")}
      >
        <Text style={styles.btnText}>Upload Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#e2e8f0",
    fontSize: 28,
    fontWeight: "bold",
  },
  sub: {
    color: "#94a3b8",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#7c3aed",
    padding: 15,
    borderRadius: 12,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
});

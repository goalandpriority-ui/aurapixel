import { View, Text, ActivityIndicator } from "react-native";
import { useEffect } from "react";

export default function Processing({ route, navigation }) {
  const { image } = route.params;

  const API_KEY = "r8_4rFqzsKL383O8pWzvVY8hZtf99WE8cY0pMgEn"; // 👈 inga nee paste panniko

  const enhanceImage = async () => {
    try {
      const res = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          Authorization: `Token ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version: "db21e45c3b2c1e5d6d6f0a0c7c8c8f0b6f5e6d5c",
          input: {
            image: image,
          },
        }),
      });

      const data = await res.json();
      let output = data;

      // polling
      while (output.status !== "succeeded") {
        const check = await fetch(output.urls.get, {
          headers: {
            Authorization: `Token ${API_KEY}`,
          },
        });

        output = await check.json();
      }

      navigation.replace("Result", {
        before: image,
        after: output.output[0],
      });
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    enhanceImage();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#020617",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#7c3aed" />
      <Text style={{ color: "#fff", marginTop: 20 }}>
        Enhancing with AI...
      </Text>
    </View>
  );
}

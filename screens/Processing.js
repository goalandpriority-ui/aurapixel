import { View, Text, ActivityIndicator } from "react-native";
import { useEffect } from "react";

export default function Processing({ route, navigation }) {
  const { image } = route.params;

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Result", { image });
    }, 3000);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#020617", justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#7c3aed" />
      <Text style={{ color: "#fff", marginTop: 20 }}>
        Enhancing with AI...
      </Text>
    </View>
  );
}

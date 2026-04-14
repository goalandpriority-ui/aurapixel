import { View, Text, Image } from "react-native";

export default function Result({ route }) {
  const { image } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: "#020617", alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#fff", marginBottom: 20 }}>
        Your Enhanced Photo 🔥
      </Text>

      <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
    </View>
  );
}

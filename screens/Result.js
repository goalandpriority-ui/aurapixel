import { View, Text, Image } from "react-native";

export default function Result({ route }) {
  const { before, after } = route.params;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#020617",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#fff", marginBottom: 20 }}>
        Before
      </Text>
      <Image source={{ uri: before }} style={{ width: 250, height: 250 }} />

      <Text style={{ color: "#fff", marginVertical: 20 }}>
        After 🔥
      </Text>
      <Image source={{ uri: after }} style={{ width: 250, height: 250 }} />
    </View>
  );
}

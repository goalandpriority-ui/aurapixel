import { View, Text, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation }) {

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "1234567890-abc.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      navigation.replace("Home");
    }
  }, [response]);

  return (
    <View style={{ flex:1, backgroundColor:"#020617", justifyContent:"center", alignItems:"center" }}>
      
      <Text style={{ color:"#fff", marginBottom:20 }}>
        Welcome to AuraPixel 🔥
      </Text>

      <TouchableOpacity
        style={{ backgroundColor:"#7c3aed", padding:15, borderRadius:10 }}
        onPress={() => promptAsync()}
      >
        <Text style={{ color:"#fff" }}>Continue with Google</Text>
      </TouchableOpacity>

    </View>
  );
}

import * as ImagePicker from "expo-image-picker";
import { View, Text, Button, Image } from "react-native";
import { useState } from "react";

export default function Upload({ navigation }) {
  const [image, setImage] = useState(null);

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
    <View style={{ flex: 1, backgroundColor: "#020617", padding: 20 }}>
      <Button title="Pick Image" onPress={pickImage} />

      {image && (
        <>
          <Image source={{ uri: image }} style={{ height: 200, marginTop: 20 }} />
          <Button
            title="Enhance Image"
            onPress={() => navigation.navigate("Processing", { image })}
          />
        </>
      )}
    </View>
  );
}

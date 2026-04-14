import {
  View,
  Text,
  Image,
  PanResponder,
  Animated,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from "react-native";
import { useRef, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

export default function Result({ route }) {
  const { before, after } = route.params;

  const slider = useRef(new Animated.Value(150)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        let x = gestureState.moveX;
        if (x < 0) x = 0;
        if (x > 300) x = 300;
        slider.setValue(x);
      },
    })
  ).current;

  const [filter, setFilter] = useState("none");

  const getFilterStyle = () => {
    switch (filter) {
      case "warm":
        return { tintColor: "#ffb347" };
      case "bw":
        return { tintColor: "#888" };
      case "contrast":
        return { opacity: 0.8 };
      case "gold":
        return { tintColor: "#facc15" };
      default:
        return {};
    }
  };

  // 📥 DOWNLOAD FUNCTION
  const downloadImage = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission required");
      return;
    }

    const asset = await MediaLibrary.createAssetAsync(after);
    await MediaLibrary.createAlbumAsync("AuraPixel", asset, false);

    Alert.alert("Downloaded 🔥");
  };

  // 📤 SHARE FUNCTION
  const shareImage = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert("Sharing not available");
      return;
    }

    await Sharing.shareAsync(after);
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Drag to Compare 🔥</Text>

      <View style={styles.imageBox}>
        
        <Image source={{ uri: after }} style={styles.image} />

        <Animated.View style={{ width: slider, height: 300, overflow: "hidden" }}>
          <Image source={{ uri: before }} style={styles.image} />
        </Animated.View>

        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.sliderLine, { left: slider }]}
        />

        <Animated.View
          style={[styles.handle, { left: slider }]}
        />
      </View>

      <Text style={styles.filterTitle}>Filters 🎨</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FilterBtn title="Normal" onPress={() => setFilter("none")} active={filter==="none"} />
        <FilterBtn title="Warm" onPress={() => setFilter("warm")} active={filter==="warm"} />
        <FilterBtn title="Gold" onPress={() => setFilter("gold")} active={filter==="gold"} />
        <FilterBtn title="B&W" onPress={() => setFilter("bw")} active={filter==="bw"} />
        <FilterBtn title="Contrast" onPress={() => setFilter("contrast")} active={filter==="contrast"} />
      </ScrollView>

      <Image source={{ uri: after }} style={[styles.preview, getFilterStyle()]} />

      {/* 🔥 ACTION BUTTONS */}
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        
        <TouchableOpacity style={styles.btn} onPress={downloadImage}>
          <Text style={styles.btnText}>Download ⬇️</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={shareImage}>
          <Text style={styles.btnText}>Share 📤</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

/* FILTER BUTTON */
const FilterBtn = ({ title, onPress, active }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      padding: 10,
      margin: 8,
      borderRadius: 10,
      backgroundColor: active ? "#7c3aed" : "#1e293b",
    }}
  >
    <Text style={{ color: "#fff" }}>{title}</Text>
  </TouchableOpacity>
);

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    color: "#fff",
    marginBottom: 20,
  },
  imageBox: {
    width: 300,
    height: 300,
  },
  image: {
    width: 300,
    height: 300,
    position: "absolute",
  },
  sliderLine: {
    position: "absolute",
    width: 3,
    height: 300,
    backgroundColor: "#7c3aed",
  },
  handle: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "#7c3aed",
    borderRadius: 10,
    marginLeft: -10,
    top: 140,
  },
  filterTitle: {
    color: "#fff",
    marginTop: 30,
  },
  preview: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: "#7c3aed",
    padding: 12,
    margin: 10,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
  },
});

import {
  View,
  Text,
  Image,
  PanResponder,
  Animated,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRef, useState } from "react";

export default function Result({ route }) {
  const { before, after } = route.params;

  // 🔥 SLIDER
  const slider = useRef(new Animated.Value(150)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        let x = gestureState.moveX;

        // LIMIT inside image
        if (x < 0) x = 0;
        if (x > 300) x = 300;

        slider.setValue(x);
      },
    })
  ).current;

  // 🎨 FILTER STATE
  const [filter, setFilter] = useState("none");

  // 🎯 FILTER STYLE
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

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Drag to Compare 🔥</Text>

      {/* IMAGE COMPARE */}
      <View style={styles.imageBox}>
        
        {/* AFTER IMAGE */}
        <Image
          source={{ uri: after }}
          style={styles.image}
        />

        {/* BEFORE IMAGE */}
        <Animated.View
          style={{
            width: slider,
            height: 300,
            overflow: "hidden",
          }}
        >
          <Image
            source={{ uri: before }}
            style={styles.image}
          />
        </Animated.View>

        {/* SLIDER LINE */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.sliderLine,
            { left: slider }
          ]}
        />

        {/* SLIDER HANDLE */}
        <Animated.View
          style={[
            styles.handle,
            { left: slider }
          ]}
        />
      </View>

      {/* FILTER TITLE */}
      <Text style={styles.filterTitle}>Filters 🎨</Text>

      {/* FILTER LIST */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        
        <FilterBtn title="Normal" onPress={() => setFilter("none")} active={filter==="none"} />
        <FilterBtn title="Warm" onPress={() => setFilter("warm")} active={filter==="warm"} />
        <FilterBtn title="Gold" onPress={() => setFilter("gold")} active={filter==="gold"} />
        <FilterBtn title="B&W" onPress={() => setFilter("bw")} active={filter==="bw"} />
        <FilterBtn title="Contrast" onPress={() => setFilter("contrast")} active={filter==="contrast"} />

      </ScrollView>

      {/* FILTER PREVIEW */}
      <Image
        source={{ uri: after }}
        style={[styles.preview, getFilterStyle()]}
      />

    </View>
  );
}

/* 🔥 FILTER BUTTON COMPONENT */
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

/* 🎨 STYLES */
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
    fontSize: 16,
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
    marginBottom: 10,
  },
  preview: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});

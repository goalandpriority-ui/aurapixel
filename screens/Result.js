import { View, Text, Image, PanResponder, Animated } from "react-native";
import { useRef } from "react";

export default function Result({ route }) {
  const { before, after } = route.params;

  const slider = useRef(new Animated.Value(150)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        slider.setValue(gestureState.moveX);
      },
    })
  ).current;

  return (
    <View style={{ flex: 1, backgroundColor: "#020617", justifyContent: "center", alignItems: "center" }}>
      
      <Text style={{ color: "#fff", marginBottom: 20 }}>
        Drag to Compare 🔥
      </Text>

      <View style={{ width: 300, height: 300 }}>
        
        {/* AFTER IMAGE (FULL) */}
        <Image
          source={{ uri: after }}
          style={{
            width: 300,
            height: 300,
            position: "absolute",
          }}
        />

        {/* BEFORE IMAGE (CLIPPED) */}
        <Animated.View
          style={{
            width: slider,
            height: 300,
            overflow: "hidden",
          }}
        >
          <Image
            source={{ uri: before }}
            style={{
              width: 300,
              height: 300,
            }}
          />
        </Animated.View>

        {/* SLIDER LINE */}
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            position: "absolute",
            left: slider,
            width: 3,
            height: 300,
            backgroundColor: "#7c3aed",
          }}
        />
      </View>

    </View>
  );
}

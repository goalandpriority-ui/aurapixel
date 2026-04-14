import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/Home";
import Upload from "./screens/Upload";
import Processing from "./screens/Processing";
import Result from "./screens/Result";
import History from "./screens/History"; // 🆕 added

const Stack = createStackNavigator();

// 🌑 Custom Dark Theme (AuraPixel style)
const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#020617",
    card: "#020617",
    text: "#e2e8f0",
    primary: "#7c3aed",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: true, // 🔥 smooth transition
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Upload" component={Upload} />
        <Stack.Screen name="Processing" component={Processing} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="History" component={History} /> {/* 🆕 */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

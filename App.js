// App.js

import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./screens/Login";
import Home from "./screens/Home";
import Upload from "./screens/Upload";
import Processing from "./screens/Processing";
import Result from "./screens/Result";
import History from "./screens/History";

// 🔥 NEW SCREENS
import Premium from "./screens/Premium";
import Profile from "./screens/Profile";

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
          animationEnabled: true,
        }}
      >
        {/* 🔐 LOGIN */}
        <Stack.Screen name="Login" component={Login} />

        {/* 🏠 MAIN */}
        <Stack.Screen name="Home" component={Home} />

        {/* 📸 FEATURES */}
        <Stack.Screen name="Upload" component={Upload} />
        <Stack.Screen name="Processing" component={Processing} />
        <Stack.Screen name="Result" component={Result} />

        {/* 📂 HISTORY */}
        <Stack.Screen name="History" component={History} />

        {/* 👤 PROFILE */}
        <Stack.Screen name="Profile" component={Profile} />

        {/* 💎 PREMIUM */}
        <Stack.Screen name="Premium" component={Premium} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

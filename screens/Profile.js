import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";

export default function Profile({ navigation }) {
  const user = auth.currentUser;

  return (
    <View style={styles.container}>
      
      <Image source={{ uri: user?.photoURL }} style={styles.avatar} />

      <Text style={styles.name}>{user?.displayName}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("History")}
      >
        <Text style={styles.btnText}>View History 📂</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logout}
        onPress={() => signOut(auth)}
      >
        <Text style={styles.btnText}>Logout 🚪</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    color: "#fff",
    fontSize: 22,
  },
  email: {
    color: "#94a3b8",
    marginBottom: 30,
  },
  btn: {
    backgroundColor: "#7c3aed",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  logout: {
    backgroundColor: "#ef4444",
    padding: 12,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
  },
});

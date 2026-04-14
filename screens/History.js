import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { useEffect, useState } from "react";

// 🔥 FIREBASE
import { db, auth } from "../lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

export default function History() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      // 🔥 Query user history
      const q = query(
        collection(db, "history"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(list);
      setLoading(false);

    } catch (e) {
      console.log("History error:", e);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Your History 📂</Text>

      {/* LOADING */}
      {loading && (
        <ActivityIndicator size="large" color="#7c3aed" />
      )}

      {/* EMPTY */}
      {!loading && data.length === 0 && (
        <Text style={styles.empty}>No history yet 😢</Text>
      )}

      {/* LIST */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            
            <Image source={{ uri: item.image }} style={styles.img} />

            <Text style={styles.mode}>
              Mode: {item.mode === "face" ? "Face 😎" : "Full"}
            </Text>

          </View>
        )}
      />

    </View>
  );
}

/* 🎨 STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    paddingTop: 40,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
  },
  empty: {
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    marginBottom: 15,
    alignItems: "center",
  },
  img: {
    width: "90%",
    height: 200,
    borderRadius: 12,
  },
  mode: {
    color: "#22c55e",
    marginTop: 5,
  },
});

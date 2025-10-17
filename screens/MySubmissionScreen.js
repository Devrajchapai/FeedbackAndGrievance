// screens/MySubmissionScreen.js
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, RefreshControl, Alert } from "react-native";
import { Card, Text, ActivityIndicator, Button, IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../src/api"; // your axios instance (baseURL: /api)

const ItemCard = ({ item, type }) => {
  // item fields differ slightly; we normalize
  const title = type === "grievance" ? item.title : item.rating ? `Rating: ${item.rating}` : item.title || "(" + type + ")";
  const body = item.comment || item.message || "";
  const response = item.response || null;
  return (
    <Card style={styles.card} mode="outlined">
      <Card.Title
        title={type === "feedback" ? "Feedback" : "Grievance"}
        subtitle={`Location: ${item.state || "N/A"} / ${item.district || "N/A"} / ${item.municipality || "N/A"}`}
        right={() => response ? <IconButton icon="reply" disabled /> : null}
      />
      <Card.Content>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemBody}>{body}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>Submitted: {new Date(item.created_at).toLocaleString()}</Text>
          {item.responded_at && (
            <Text style={styles.metaText}>Responded: {new Date(item.responded_at).toLocaleString()}</Text>
          )}
        </View>

        {response ? (
          <View style={styles.responseBox}>
            <Text style={styles.responseLabel}>Admin response</Text>
            <Text style={styles.responseText}>{response}</Text>
          </View>
        ) : (
          <Text style={styles.waitingText}>No response yet</Text>
        )}
      </Card.Content>
    </Card>
  );
};

const MySubmissionScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [grievances, setGrievances] = useState([]);
  const [userId, setUserId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      // 1) get profile to know user id (assumes endpoint /user-profile/ returns user info with "user" or "id")
      const token = await AsyncStorage.getItem("access");
      if (!token) {
        // not logged in
        navigation.replace("Login");
        return;
      }

      const profileRes = await api.get("/user-profile/"); // expected to return {id, user, phone_number, ...} or similar
      const profile = profileRes.data;
      // determine user id
      const uid = profile.user || profile.id || profile.user_id || null;
      setUserId(uid);

      // 2) fetch feedbacks & grievances
      const [fbRes, gvRes] = await Promise.all([api.get("/feedbacks/"), api.get("/grievances/")]);

      const allFeedbacks = Array.isArray(fbRes.data) ? fbRes.data : (fbRes.data.results || []);
      const allGrievances = Array.isArray(gvRes.data) ? gvRes.data : (gvRes.data.results || []);

      // 3) filter to current user (server may already restrict; this is safe)
      const myFB = uid ? allFeedbacks.filter((f) => Number(f.user) === Number(uid)) : allFeedbacks;
      const myGV = uid ? allGrievances.filter((g) => Number(g.user) === Number(uid)) : allGrievances;

      // 4) sort newest first
      myFB.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      myGV.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      setFeedbacks(myFB);
      setGrievances(myGV);
    } catch (err) {
      console.error("Error loading submissions:", err);
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        // token invalid or not provided: force logout and go to Login
        await AsyncStorage.removeItem("access");
        await AsyncStorage.removeItem("refresh");
        Alert.alert("Session expired", "Please log in again.");
        navigation.replace("Login");
        return;
      }
      Alert.alert("Error", "Failed to load your submissions. Try again later.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  // combine arrays into single list with type tag, so FlatList can show both types
  const combined = [
    ...feedbacks.map((f) => ({ ...f, _type: "feedback" })),
    ...grievances.map((g) => ({ ...g, _type: "grievance" })),
  ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>My Submissions</Text>
        <Button mode="text" onPress={() => { navigation.goBack(); }}>
          Back
        </Button>
      </View>

      <FlatList
        data={combined}
        keyExtractor={(item) => `${item._type}-${item.id}`}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ padding: 12, paddingBottom: 60 }}
        renderItem={({ item }) => <ItemCard item={item} type={item._type} />}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text>No submissions yet. Submit feedback or a grievance from a province card.</Text>
            <Button mode="contained" onPress={() => navigation.navigate("Home") } style={{ marginTop: 12 }}>
              Go to Home
            </Button>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f6f8fa" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { padding: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "700" },
  card: { marginVertical: 8, borderRadius: 8, padding: 6 },
  itemTitle: { fontWeight: "700", marginTop: 8, fontSize: 16 },
  itemBody: { marginTop: 8, color: "#333" },
  metaRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  metaText: { fontSize: 12, color: "#666" },
  responseBox: { marginTop: 12, padding: 10, backgroundColor: "#eef7ff", borderRadius: 8 },
  responseLabel: { fontWeight: "700", marginBottom: 6 },
  responseText: { color: "#0b2740" },
  waitingText: { marginTop: 12, color: "#888", fontStyle: "italic" },
  emptyBox: { padding: 20, alignItems: "center" },
});

export default MySubmissionScreen;

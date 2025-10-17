// screens/UserProfile.js
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/user-profile/";

const UserProfile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("access");
        if (!token) {
          navigation.replace("Login");
          return;
        }

        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error);
        Alert.alert("Error", "Could not load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("access");
    await AsyncStorage.removeItem("refresh");
    navigation.replace("Login");
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>No profile data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.label}>Username: {user.user?.username || "N/A"}</Text>
      <Text style={styles.label}>Email: {user.user?.email || "N/A"}</Text>
      <Text style={styles.label}>Phone: {user.phone_number || "Not set"}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  logoutButton: {
    backgroundColor: "#d9534f",
    padding: 12,
    borderRadius: 6,
    marginTop: 20,
  },
  logoutText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default UserProfile;

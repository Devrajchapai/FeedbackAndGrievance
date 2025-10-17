import React, { useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogoutScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      Alert.alert("Logged out successfully");
      navigation.replace("LoginScreen");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Logging out...</Text>
    </View>
  );
};

export default LogoutScreen;

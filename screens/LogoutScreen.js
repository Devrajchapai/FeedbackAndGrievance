import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LogoutScreen({ navigation }) {
  useEffect(() => {
    const logout = async () => {
      try {
        // remove token from storage
        await AsyncStorage.removeItem("accessToken");

        // navigate back to login
        navigation.replace('Login')
      } catch (e) {
        console.log("Error logging out:", e);
      }
    };

    logout();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text>Logging out...</Text>
    </View>
  );
}

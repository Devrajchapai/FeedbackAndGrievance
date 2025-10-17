// app/_layout.js
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigationContainerRef } from "@react-navigation/native";

// Screens
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import LogoutScreen from "../screens/LogoutScreen";
import FeedbackAndGrivanceScreen from "../screens/FeedbackAndGrivanceScreen";
import UserProfile from "../screens/userProfile";
import MySubmissionScreen from "../screens/MySubmissionScreen";

// Provinces
import Bagmati from "../provience/Bagmati";
import Koshi from "../provience/Koshi";
import Gandaki from "../provience/Gandaki";
import Madhesh from "../provience/Madhesh";
import Lumbini from "../provience/Lumbini";
import Karnali from "../provience/Karnali";
import Sudurpashchim from "../provience/Sudurpashchim";

const Stack = createNativeStackNavigator();

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigationRef = useNavigationContainerRef();

  // 🔹 Check if token exists in AsyncStorage
  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("access");
      setIsLoggedIn(!!token);
    } catch (err) {
      console.log("Error reading token:", err);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Run at mount
  useEffect(() => {
    checkAuth();
  }, []);

  // 🔹 Listen for token changes (login/logout updates)
  useEffect(() => {
    const interval = setInterval(async () => {
      const token = await AsyncStorage.getItem("access");
      setIsLoggedIn(!!token);
    }, 1000); // check every second (lightweight)

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isLoggedIn ? "Home" : "Login"}
    >
      {isLoggedIn ? (
        <>
          {/* Main Screens */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="MySubmissions" component={MySubmissionScreen} />
          <Stack.Screen name="Logout" component={LogoutScreen} />

          {/* Feedback & Grievance */}
          <Stack.Screen
            name="FeedbackAndGrivanceScreen"
            component={FeedbackAndGrivanceScreen}
            options={({ route }) => ({
              title: route.params?.districtName || "Feedback & Grievance",
            })}
          />

          {/* Provinces */}
          <Stack.Screen name="Bagmati" component={Bagmati} />
          <Stack.Screen name="Koshi" component={Koshi} />
          <Stack.Screen name="Gandaki" component={Gandaki} />
          <Stack.Screen name="Madhesh" component={Madhesh} />
          <Stack.Screen name="Lumbini" component={Lumbini} />
          <Stack.Screen name="Karnali" component={Karnali} />
          <Stack.Screen name="Sudurpashchim" component={Sudurpashchim} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

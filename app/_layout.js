import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/credentials/LoginScreen";
import SignupScreen from "../screens/credentials/SignupScreen";
import LogoutScreen from "../screens/credentials/LogoutScreen";
import Bagmati from "../provience/Bagmati";
import Koshi from "../provience/Koshi";
import Gandaki from "../provience/Gandaki";
import Madhesh from "../provience/Madhesh";
import Lumbini from "../provience/Lumbini";
import Karnali from "../provience/Karnali";
import Sudurpashchim from "../provience/Sudurpashchim";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import FeedbackAndGrivanceScreen from "../screens/FeedbackAndGrivanceScreen";
import UserProfile from "../screens/userProfile";

const layout = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");

        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.log("Error checking token", err);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Bagmati" component={Bagmati} />
          <Stack.Screen name="Gandaki" component={Gandaki} />
          <Stack.Screen name="Koshi" component={Koshi} />
          <Stack.Screen name="Madhesh" component={Madhesh} />
          <Stack.Screen name="Lumbini" component={Lumbini} />
          <Stack.Screen name="Karnali" component={Karnali} />
          <Stack.Screen name="Sudurpashchim" component={Sudurpashchim} />
          <Stack.Screen
            name="FeedbackAndGrivanceScreen"
            component={FeedbackAndGrivanceScreen}
            options={({ route }) => ({
              title: `${route.params.districtName} Engagement`,
            })}
          />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="Logout" component={LogoutScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
export default layout;

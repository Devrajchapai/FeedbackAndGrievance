import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/credentials/LoginScreen";
import SignupScreen from "../screens/credentials/SignupScreen";
import LogoutScreen from "../screens/credentials/LogoutScreen";
import FeedbackAndGrivanceScreen from "../screens/FeedbackAndGrivanceScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="Logout" component={LogoutScreen} />
    <Stack.Screen name="Home" component={FeedbackAndGrivanceScreen} />
  </Stack.Navigator>
);

export default AppNavigator;

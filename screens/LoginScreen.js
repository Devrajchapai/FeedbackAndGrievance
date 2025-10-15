import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../src/api"; // ✅ correct import

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const data = await login(email, password);

      if (data && data.access) {
        await AsyncStorage.setItem("access", data.access);
        await AsyncStorage.setItem("refresh", data.refresh);
        Alert.alert("✅ Login successful!");
        navigation.replace("Home");
      } else {
        Alert.alert("Login failed", "Invalid credentials or no token received");
      }
    } catch (err) {
      console.log("Login error:", err.response?.data || err.message);
      Alert.alert("Login failed", err.response?.data?.detail || "Invalid credentials");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <KeyboardAvoidingView behavior="position">
          <View>
            <StatusBar backgroundColor="blue" barStyle="dark-content" />
            <Text style={{ fontSize: 35, marginLeft: 18, marginTop: 10, color: "gray" }}>
              Welcome to
            </Text>
            <Text style={{ fontSize: 30, marginLeft: 18, color: "blue" }}>
              Feedback and Redressal
            </Text>

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={{ margin: 18 }}
              theme={{ colors: { primary: "blue" } }}
            />

            <TextInput
              label="Password"
              secureTextEntry={!passwordVisibility}
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              style={{ marginHorizontal: 18 }}
              theme={{ colors: { primary: "blue" } }}
              right={
                <TextInput.Icon
                  icon={passwordVisibility ? "eye-off" : "eye"}
                  onPress={() => setPasswordVisible(!passwordVisibility)}
                />
              }
            />

            <Button
              icon="account-arrow-right"
              mode="contained"
              onPress={handleLogin}
              style={{ margin: 18 }}
            >
              Login
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={{ fontSize: 18, marginLeft: 18, marginTop: 20 }}>
                Don't have an account? Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LoginScreen;

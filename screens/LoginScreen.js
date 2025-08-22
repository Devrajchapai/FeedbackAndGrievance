import { useState } from 'react';
import { KeyboardAvoidingView, StatusBar, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisible] = useState(false);

  const sendCred = async () => {

  try {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      // 👆 If you're using Android Emulator, use 10.0.2.2 instead of 127.0.0.1
      // For iOS Simulator, you can keep 127.0.0.1

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: password,

      }),
    });

      const data = await response.json();

      if (response.ok) {
        // ✅ Save token so layout.js sees it
        await AsyncStorage.setItem("accessToken", data.access);
        await AsyncStorage.setItem("refreshToken", data.refresh);

        Alert.alert("Login successful!");
        navigation.replace("HomeScreen"); // redirect to home
      } else {
        Alert.alert("Login failed", data.detail || "Invalid credentials");
      }
    } catch (err) {
      console.log("Error: " + err);
      Alert.alert("Something went wrong, try again later.");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <KeyboardAvoidingView behavior="position">
          <View>
            <StatusBar backgroundColor="blue" barStyle="dark-content" />
            <Text style={{ fontSize: 35, marginLeft: 18, marginTop: 10, color: 'gray' }}>
              Welcome to
            </Text>
            <Text style={{ fontSize: 30, marginLeft: 18, color: 'blue' }}>
              Feedback and Redressal
            </Text>

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={{ margin: 18 }}
              theme={{ colors: { primary: 'blue' } }}
            />
            <TextInput
              label="Password"
              secureTextEntry={!passwordVisibility}
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              style={{ marginHorizontal: 18 }}
              theme={{ colors: { primary: 'blue' } }}
              right={
                <TextInput.Icon
                  icon={passwordVisibility ? 'eye-off' : 'eye'}
                  onPress={() => setPasswordVisible(!passwordVisibility)}
                />
              }
            />

            <Button
              icon="account-arrow-right"
              mode="contained"
              onPress={sendCred}
              style={{ margin: 18 }}
            >
              Login
            </Button>

            {/* ✅ Fix navigation name */}
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={{ fontSize: 18, marginLeft: 18, marginTop: 20 }}>
                Don't have an account?
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LoginScreen;

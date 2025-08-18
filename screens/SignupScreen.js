import { useState } from 'react';
import { KeyboardAvoidingView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { register } from '../src/api';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisibility, setPasswordVisible] = useState(false);

  const handleSignup = async () => {
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password1: password,
        password2: confirmPassword

      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Signup successful!");
      navigation.navigate("LoginScreen");
    } else {
      alert("Signup failed: " + (data.message || JSON.stringify(data)));
    }

  } catch (err) {
    console.log("Error: " + err);
    alert("Something went wrong, try again later.");
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
            <View style={{ borderBottomColor: 'blue', borderBottomWidth: 4, borderRadius: 10, marginLeft: 20, marginRight: 100 }} />
            <Text style={{ fontSize: 20, marginLeft: 18, marginTop: 20 }}>
              Sign Up With Email
            </Text>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
              theme={{ colors: { primary: 'blue' } }}
            />
            <TextInput
              label="Password"
              secureTextEntry={!passwordVisibility}
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
              theme={{ colors: { primary: 'blue' } }}
              right={<TextInput.Icon icon={passwordVisibility ? 'eye-off' : 'eye'} onPress={() => setPasswordVisible(!passwordVisibility)} />}
            />
            <TextInput
              label="Confirm Password"
              secureTextEntry={!passwordVisibility}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
              theme={{ colors: { primary: 'blue' } }}
              right={<TextInput.Icon icon={passwordVisibility ? 'eye-off' : 'eye'} onPress={() => setPasswordVisible(!passwordVisibility)} />}
            />
            <Button
              icon="account-plus"
              mode="contained"
              onPress={handleSignup}
              style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
            >
              Sign Up
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={{ fontSize: 18, marginLeft: 18, marginTop: 20 }}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SignupScreen;
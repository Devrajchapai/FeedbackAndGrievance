import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen';
import Bagmati from '../screens/Bagmati';
import Koshi from '../screens/Koshi';
import Gandaki from '../screens/Gandaki';
import Madhesh from '../screens/Madhesh';
import Lumbini from '../screens/Lumbini';
import Karnali from '../screens/Karnali';
import Sudurpashchim from '../screens/Sudurpashchim';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";



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
        <Stack.Screen name="Bagmati" component ={Bagmati} />
        <Stack.Screen name="Gandaki" component ={Gandaki} />
        <Stack.Screen name="Koshi" component ={Koshi} />
        <Stack.Screen name="Madhesh" component ={Madhesh} />
        <Stack.Screen name="Lumbini" component ={Lumbini} />
        <Stack.Screen name="Karnali" component ={Karnali} />
        <Stack.Screen name="Sudurpashchim" component ={Sudurpashchim} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default layout;
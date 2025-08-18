import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';


const layout = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={LoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name="home" component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="loading" component={LoadingScreen} options={{headerShown: false}}/>
      <Stack.Screen name="signup" component={SignupScreen} options={{headerShown: false}}/>
   </Stack.Navigator>
  )
}

export default layout
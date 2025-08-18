import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import GrievanceScreen from '../screens/GrievanceScreen';

const layout = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={LoginScreen}/>
      <Stack.Screen name="home" component={HomeScreen}/>
      <Stack.Screen name="signup" component={SignupScreen}/>
   </Stack.Navigator>
  )
}

export default layout;
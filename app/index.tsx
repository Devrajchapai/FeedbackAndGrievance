import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';



const Stack = createNativeStackNavigator();


const index = () => {
  
  return ( 
  
    <Stack.Navigator>
      <Stack.Screen name="login" component={LoginScreen}/>
      <Stack.Screen name="home" component={HomeScreen}/>
      <Stack.Screen name="loading" component={LoadingScreen}/>
      <Stack.Screen name="signup" component={SignupScreen}/>
   </Stack.Navigator>
   
      
 
  )
}


export default index
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

const layout = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen} options={{headerShown : false}}/>

      <Stack.Screen name="Bagmati" component ={Bagmati} options={{headerShown : false}}/>
      <Stack.Screen name="Gandaki" component ={Gandaki} options={{headerShown : false}}/>
      <Stack.Screen name="Koshi" component ={Koshi} options={{headerShown : false}}/>
      <Stack.Screen name="Madhesh" component ={Madhesh} options={{headerShown : false}}/>
      <Stack.Screen name="Lumbini" component ={Lumbini} options={{headerShown : false}}/>
      <Stack.Screen name="Karnali" component ={Karnali} options={{headerShown : false}}/>
      <Stack.Screen name="Sudurpashchim" component ={Sudurpashchim} options={{headerShown : false}}/>


      <Stack.Screen name="login" component={LoginScreen} options={{headerShown : false}}/>
      <Stack.Screen name="signup" component={SignupScreen} options={{headerShown : false}}/>
   </Stack.Navigator>
  )
}

export default layout;
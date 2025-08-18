import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import GrievanceScreen from '../screens/GrievanceScreen';

const layout = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login', headerShown: true }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home', headerShown: true }} />
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ title: 'Loading', headerShown: true }} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ title: 'Sign Up', headerShown: true }} />
            <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} options={{ title: 'Provide Feedback', headerShown: true }} />
            <Stack.Screen name="GrievanceScreen" component={GrievanceScreen} options={{ title: 'Submit Grievance', headerShown: true }} />
        </Stack.Navigator>
    );
};

export default layout;
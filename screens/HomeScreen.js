import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { logout } from '../src/api';

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await logout();
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Feedback and Grievance App</Text>
      <Button title="Provide Feedback" onPress={() => navigation.navigate('FeedbackScreen')} />
      <Button title="Submit Grievance" onPress={() => navigation.navigate('GrievanceScreen')} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen
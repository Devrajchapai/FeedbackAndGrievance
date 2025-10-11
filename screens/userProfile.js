import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity, 
  ScrollView, 
  TextInput, 
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://127.0.0.1:8000/api/user/profile/';

const UserProfile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No access token found');
        }
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.log('Profile fetch error:', error.message);
        Alert.alert('Error', 'Failed to load profile. Please try again.');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found');
      }
      // Filter out read-only fields
      const { is_official, municipality_name, ...updateData } = user;
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || errorData.email?.join(', ') || 'Failed to update profile');
      }
      setIsEditing(false);
      Alert.alert('Profile Updated', 'Your changes have been saved.');
    } catch (error) {
      console.log('Profile update error:', error.message);
      Alert.alert('Update Failed', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
      navigation.replace('Login');
    } catch (error) {
      console.log('Logout error:', error.message);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No user data found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      {/* Editable Fields */}
      {Object.entries(user)
        .filter(([key]) => !['is_official', 'municipality_name'].includes(key)) // Exclude is_official and municipality_name
        .map(([key, value]) => (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.label}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </Text>
            <TextInput
              style={[styles.input, !isEditing && styles.readOnlyInput]}
              value={value}
              editable={isEditing}
              secureTextEntry={key === 'password'}
              onChangeText={(text) => setUser({ ...user, [key]: text })}
            />
          </View>
        ))}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {!isEditing ? (
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f6fa',
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#222',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    color: '#555',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
    elevation: 1,
  },
  readOnlyInput: {
    backgroundColor: '#f0f0f0',
    color: '#444',
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 40,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#007bff',
  },
  saveButton: {
    backgroundColor: '#28a745',
  },
  logoutButton: {
    backgroundColor: '#d9534f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#d9534f',
    fontSize: 16,
  },
});
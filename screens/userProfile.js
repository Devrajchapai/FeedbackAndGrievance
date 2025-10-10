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

const API_URL = 'https://example.com/api/user/profile'; // Replace with your actual backend URL

const UserProfile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Simulate API call with demo data
    setTimeout(() => {
      const demoData = {
        username: 'devraj_chapai',
        email: 'devraj@example.com',
        password: 'MySecret123',
        DOB: '2003-06-15',
        address: 'Pokhara, Nepal',
        contact: '+977 9812345678',
      };
      setUser(demoData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSave = async () => {
    setIsEditing(false);
    Alert.alert('Profile Updated', 'Your changes have been saved.');
    // You can send updated user data to backend using fetch() here
    // await fetch(API_URL, { method: 'PUT', body: JSON.stringify(user), ... })
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => navigation.replace('Logout'),
      },
    ]);
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
      {Object.entries(user).map(([key, value]) => (
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

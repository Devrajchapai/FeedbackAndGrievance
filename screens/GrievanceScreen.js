import { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { getProvinces, getMunicipalities, submitGrievance } from '../src/api';

const GrievanceScreen = ({ navigation }) => {
  const [provinces, setProvinces] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data);
      } catch (error) {
        alert('Failed to fetch provinces: ' + error.message);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchMunicipalities = async () => {
        try {
          const data = await getMunicipalities(selectedProvince);
          setMunicipalities(data);
        } catch (error) {
          alert('Failed to fetch municipalities: ' + error.message);
        }
      };
      fetchMunicipalities();
    }
  }, [selectedProvince]);

  const sendGrievance = async () => {
    if (!selectedMunicipality || !title || !description) {
      alert('Please fill all fields');
      return;
    }
    try {
      await submitGrievance(selectedMunicipality, 1, title, description);
      alert('Grievance submitted');
      navigation.navigate('HomeScreen');
    } catch (error) {
      alert('Grievance submission failed: ' + error.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <View>
        <Text style={{ fontSize: 35, marginLeft: 18, marginTop: 10, color: 'gray' }}>
          Submit Grievance
        </Text>
        <TextInput
          label="Province"
          value={selectedProvince}
          onChangeText={setSelectedProvince}
          mode="outlined"
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          theme={{ colors: { primary: 'blue' } }}
        />
        <TextInput
          label="Municipality"
          value={selectedMunicipality}
          onChangeText={setSelectedMunicipality}
          mode="outlined"
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          theme={{ colors: { primary: 'blue' } }}
        />
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          theme={{ colors: { primary: 'blue' } }}
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          theme={{ colors: { primary: 'blue' } }}
          multiline
        />
        <Button
          icon="send"
          mode="contained"
          onPress={sendGrievance}
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
        >
          Submit Grievance
        </Button>
        <Button
          mode="text"
          onPress={() => navigation.navigate('HomeScreen')}
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
        >
          Back to Home
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default GrievanceScreen;
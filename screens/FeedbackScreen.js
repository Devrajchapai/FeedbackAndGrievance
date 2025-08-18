import { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { getProvinces, getMunicipalities, submitFeedback } from '../src/api';

const FeedbackScreen = ({ navigation }) => {
  const [provinces, setProvinces] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

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

  const sendFeedback = async () => {
    if (!selectedMunicipality || !rating || !comment) {
      alert('Please fill all fields');
      return;
    }
    try {
      await submitFeedback(selectedMunicipality, 1, parseInt(rating), comment);
      alert('Feedback submitted');
      navigation.navigate('HomeScreen');
    } catch (error) {
      alert('Feedback submission failed: ' + error.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <View>
        <Text style={{ fontSize: 35, marginLeft: 18, marginTop: 10, color: 'gray' }}>
          Provide Feedback
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
          label="Rating (1-5)"
          value={rating}
          onChangeText={setRating}
          mode="outlined"
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          theme={{ colors: { primary: 'blue' } }}
          keyboardType="numeric"
        />
        <TextInput
          label="Comment"
          value={comment}
          onChangeText={setComment}
          mode="outlined"
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          theme={{ colors: { primary: 'blue' } }}
          multiline
        />
        <Button
          icon="send"
          mode="contained"
          onPress={sendFeedback}
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
        >
          Submit Feedback
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

export default FeedbackScreen;
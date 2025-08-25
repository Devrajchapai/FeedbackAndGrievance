import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { submitFeedback } from '../src/api';

const FeedbackScreen = ({ route }) => {
  const { municipalityId, departmentId } = route.params;
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    try {
      await submitFeedback(municipalityId, departmentId, {
        rating: parseInt(rating),
        comment,
      });
      Alert.alert('Success', 'Feedback submitted!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View>
      <TextInput
        label="Rating (1-5)"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
        style={{ margin: 16 }}
      />
      <TextInput
        label="Comment"
        value={comment}
        onChangeText={setComment}
        multiline
        style={{ margin: 16 }}
      />
      <Button mode="contained" onPress={handleSubmit} style={{ margin: 16 }}>
        Submit Feedback
      </Button>
    </View>
  );
};

export default FeedbackScreen;
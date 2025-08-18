import React from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList, StatusBar } from 'react-native';
import {Avatar, Card, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const provincesData = [
  {
    id: '1',
    title: 'Bagmati',
    subtitle: 'Hetauda',
    description: 'Your voice is the foundation of progress in Bagmati Province. We invite you to submit your feedback on a wide range of topics, including urban development, environmental initiatives, and the quality of public service delivery. By sharing your insights, you help us shape a more efficient, livable, and sustainable future for our province and its citizens.',
    imageUri: 'https://picsum.photos/id/1015/700/400'
  },
  {
    id: '2',
    title: 'Koshi',
    subtitle: 'Biratnagar',
    description: 'Your insights are essential for the progress of Koshi Province. We encourage you to provide detailed feedback on services and public welfare projects. Your input is crucial for improving governance and shaping a brighter future for districts like Morang, Sunsari, and Jhapa.',
    imageUri: 'https://picsum.photos/id/1000/700/400'
  },
  {
    id: '3',
    title: 'Gandaki',
    subtitle: 'Pokhara',
    description: 'Contribute directly to the development of Gandaki Province. We warmly welcome your feedback on topics ranging from tourism and sustainable development to critical infrastructure and public services. Your input helps us make this a better and more prosperous place for everyone.',
    imageUri: 'https://picsum.photos/id/1019/700/400'
  },
  {
    id: '4',
    title: 'Madhesh',
    subtitle: 'Janakpur',
    description: 'We are committed to building a better Madhesh Province, and your active participation is key. Please share your thoughts and suggestions on local governance, infrastructure, and the quality of public services to drive meaningful progress and development across this entire region.',
    imageUri: 'https://picsum.photos/id/1025/700/400'
  },
  {
    id: '5',
    title: 'Lumbini',
    subtitle: 'Deukhuri',
    description: 'You have the power to shape the future of Lumbini Province. We urge you to share your feedback on cultural preservation efforts, major development projects, and the efficiency of public services. Your suggestions are highly valued and will guide our collective efforts.',
    imageUri: 'https://picsum.photos/id/1033/700/400'
  },
  {
    id: '6',
    title: 'Karnali',
    subtitle: 'Birendranagar',
    description: 'Your feedback is more than a suggestion; it is essential for the sustained progress of Karnali Province. Please share your experiences and detailed suggestions on government services, infrastructure, and social development to help us address local needs and build a more resilient community.',
    imageUri: 'https://picsum.photos/id/1036/700/400'
  },
  {
    id: '7',
    title: 'Sudurpashchim',
    subtitle: 'Godawari',
    description: 'Help us improve governance and public services in Sudurpashchim Province. We are committed to listening to your feedback to address local issues, enhance regional growth, and ensure that every citizen has a voice in our shared future.',
    imageUri: 'https://picsum.photos/id/1043/700/400'
  },
];

const HomeScreen = ({navigation}) => {

  const renderProvinceCard = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate(`${item.title}`)
      }}
    >
      <Card mode='contained' style={styles.card}>
        <Card.Title
          title={item.title}
          subtitle={item.subtitle}
          left={(props) => <Avatar.Icon {...props} icon="image-filter-hdr" />}
        />
        <Card.Cover source={{ uri: item.imageUri }} />
        <Card.Content>
          <Text variant="bodyMedium" style={styles.cardText}>{item.description}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          Choose Province
        </Text>
        <FlatList
          data={provincesData}
          renderItem={renderProvinceCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    paddingBottom: 24,
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
  },
  cardText: {
    marginTop: 8,
    lineHeight: 22,
    color: '#555',
  },
});

export default HomeScreen;

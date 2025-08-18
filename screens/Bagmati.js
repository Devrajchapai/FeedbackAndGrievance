import React from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Data array for the districts of Bagmati Province
const districtsData = [
  { id: '1', name: 'Sindhuli', description: 'Known for its historical fort and strategic location.', imageUri: 'https://picsum.photos/id/237/700/400' },
  { id: '2', name: 'Ramechhap', description: 'A district with diverse landscapes, from river valleys to high hills.', imageUri: 'https://picsum.photos/id/163/700/400' },
  { id: '3', name: 'Dolakha', description: 'Famous for the Bhimeshwar Temple and Mount Gaurishankar.', imageUri: 'https://picsum.photos/id/286/700/400' },
  { id: '4', name: 'Bhaktapur', description: 'A city of ancient temples, rich in Newari culture and architecture.', imageUri: 'https://picsum.photos/id/292/700/400' },
  { id: '5', name: 'Dhading', description: 'Offers stunning views of Ganesh Himal and is a popular trekking route.', imageUri: 'https://picsum.photos/id/354/700/400' },
  { id: '6', name: 'Kathmandu', description: 'The capital city, a bustling hub of culture, history, and modernity.', imageUri: 'https://picsum.photos/id/400/700/400' },
  { id: '7', name: 'Kavrepalanchok', description: 'A scenic district known for its religious sites and beautiful hill stations.', imageUri: 'https://picsum.photos/id/431/700/400' },
  { id: '8', name: 'Lalitpur', description: 'A city of fine arts and rich history, also known as Patan.', imageUri: 'https://picsum.photos/id/444/700/400' },
  { id: '9', name: 'Nuwakot', description: 'Historically significant with the Nuwakot Durbar and Seven-Story Palace.', imageUri: 'https://picsum.photos/id/450/700/400' },
  { id: '10', name: 'Rasuwa', description: 'Home to Langtang National Park and the popular Gosainkunda Lake.', imageUri: 'https://picsum.photos/id/452/700/400' },
  { id: '11', name: 'Sindhupalchok', description: 'A mountainous district with a mix of diverse cultures and landscapes.', imageUri: 'https://picsum.photos/id/471/700/400' },
  { id: '12', name: 'Chitwan', description: 'Famous for Chitwan National Park and its diverse wildlife.', imageUri: 'https://picsum.photos/id/476/700/400' },
  { id: '13', name: 'Makwanpur', description: 'Known for its forests, wildlife, and the historic Makwanpur Gadhi fort.', imageUri: 'https://picsum.photos/id/485/700/400' },
];

const Bagmati = () => {

  // Function to render each district card item in the FlatList
  const renderDistrictCard = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        console.log(`Navigating to feedback page for ${item.name}`);
        // Here you would add navigation logic to go to a new screen
        // for providing feedback for the selected district.
      }}
    >
      <Card mode="elevated" style={styles.card}>
        <Card.Title
          title={item.name}
          left={(props) => <Avatar.Icon {...props} icon="map-marker" />}
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
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Text variant="headlineSmall" style={styles.title}>
            Districts of Bagmati Province
          </Text>
          <FlatList
            data={districtsData}
            renderItem={renderDistrictCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
};

// Stylesheet for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd', // A new light blue color
  },
  safeArea: {
    flex: 1,
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

export default Bagmati;

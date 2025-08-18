import React from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Data array for the districts of Lumbini Province
const districtsData = [
  { id: '1', name: 'Kapilvastu', description: 'The historic birthplace of Siddhartha Gautama, a site of immense spiritual importance.', imageUri: 'https://picsum.photos/id/675/700/400' },
  { id: '2', name: 'Rupandehi', description: 'A major hub for trade and industry, home to the bustling city of Bhairahawa.', imageUri: 'https://picsum.photos/id/680/700/400' },
  { id: '3', name: 'Arghakhanchi', description: 'Known for its hilly terrain, historical sites, and the scenic Supa Deurali temple.', imageUri: 'https://picsum.photos/id/685/700/400' },
  { id: '4', name: 'Gulmi', description: 'A district with rich cultural heritage, known for coffee farming and scenic landscapes.', imageUri: 'https://picsum.photos/id/690/700/400' },
  { id: '5', name: 'Palpa', description: 'Famous for its traditional Dhaka fabric, historical Tansen Durbar, and stunning views.', imageUri: 'https://picsum.photos/id/695/700/400' },
  { id: '6', name: 'Dang', description: 'The largest district in the province, with diverse geography and a major transportation hub.', imageUri: 'https://picsum.photos/id/700/700/400' },
  { id: '7', name: 'Pyuthan', description: 'A mountainous district with religious sites like Swargadwari and scenic trekking trails.', imageUri: 'https://picsum.photos/id/705/700/400' },
  { id: '8', name: 'Rolpa', description: 'A historical district known for its role in Nepal\'s political movements and mountainous terrain.', imageUri: 'https://picsum.photos/id/710/700/400' },
  { id: '9', name: 'Eastern Rukum', description: 'A newly formed district with high-altitude lakes and beautiful natural scenery.', imageUri: 'https://picsum.photos/id/715/700/400' },
  { id: '10', name: 'Banke', description: 'A terai district with a tropical climate, known for Banke National Park.', imageUri: 'https://picsum.photos/id/720/700/400' },
  { id: '11', name: 'Bardiya', description: 'Famous for Bardiya National Park, a prime location for spotting tigers and rhinos.', imageUri: 'https://picsum.photos/id/725/700/400' },
];

const Lumbini = () => {

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
          left={(props) => <Avatar.Icon {...props} icon="map" />}
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
            Districts of Lumbini Province
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
    backgroundColor: '#e3f5e0', // A light green color for Lumbini Province
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

export default Lumbini;

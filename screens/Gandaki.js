import React from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Data array for the districts of Gandaki Province
const districtsData = [
  { id: '1', name: 'Baglung', description: 'Known for its suspension bridges and the famous Baglung Kalika Temple.', imageUri: 'https://picsum.photos/id/580/700/400' },
  { id: '2', name: 'Gorkha', description: 'The ancestral home of the Shah dynasty and a historic site of unification.', imageUri: 'https://picsum.photos/id/585/700/400' },
  { id: '3', name: 'Kaski', description: 'Home to the beautiful city of Pokhara and stunning views of the Annapurna range.', imageUri: 'https://picsum.photos/id/590/700/400' },
  { id: '4', name: 'Lamjung', description: 'A district rich in culture, natural beauty, and trekking routes.', imageUri: 'https://picsum.photos/id/595/700/400' },
  { id: '5', name: 'Manang', description: 'A high-altitude district known for its harsh climate and unique landscapes.', imageUri: 'https://picsum.photos/id/600/700/400' },
  { id: '6', name: 'Mustang', description: 'Known as the "Kingdom of Lo," famous for its rugged terrain and Tibetan culture.', imageUri: 'https://picsum.photos/id/605/700/400' },
  { id: '7', name: 'Myagdi', description: 'A mountainous district with diverse flora and fauna, bordering the Dhaulagiri range.', imageUri: 'https://picsum.photos/id/610/700/400' },
  { id: '8', name: 'Nawalpur', description: 'A new district formed from the former Nawalparasi and known for its flat terrain.', imageUri: 'https://picsum.photos/id/615/700/400' },
  { id: '9', name: 'Parbat', description: 'Features the longest and highest suspension bridge in Nepal, connecting to Baglung.', imageUri: 'https://picsum.photos/id/620/700/400' },
  { id: '10', name: 'Syangja', description: 'Known for its picturesque hills, fertile land, and agricultural products.', imageUri: 'https://picsum.photos/id/625/700/400' },
  { id: '11', name: 'Tanahun', description: 'A district with scenic views and historical caves, including the Bandipur area.', imageUri: 'https://picsum.photos/id/630/700/400' },
];

const Gandaki = () => {

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
            Districts of Gandaki Province
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
    backgroundColor: '#fff3e0', // A light orange color for Gandaki Province
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

export default Gandaki;

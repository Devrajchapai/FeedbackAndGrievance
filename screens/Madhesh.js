import React from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Data array for the districts of Madhesh Province
const districtsData = [
  { id: '1', name: 'Sarlahi', description: 'An agricultural district known for sugarcane and rice production.', imageUri: 'https://picsum.photos/id/635/700/400' },
  { id: '2', name: 'Dhanusha', description: 'Features Janakpur, a city of religious importance with the Janaki Temple.', imageUri: 'https://picsum.photos/id/640/700/400' },
  { id: '3', name: 'Bara', description: 'Known for its fertile land and industrial development, especially in the Birgunj area.', imageUri: 'https://picsum.photos/id/645/700/400' },
  { id: '4', name: 'Rautahat', description: 'A district with a mix of agriculture and historical sites, including the Shiv Nagar Temple.', imageUri: 'https://picsum.photos/id/650/700/400' },
  { id: '5', name: 'Saptari', description: 'Located on the border with India, known for its diverse culture and traditions.', imageUri: 'https://picsum.photos/id/655/700/400' },
  { id: '6', name: 'Siraha', description: 'A flat district in the Terai region with significant agricultural importance.', imageUri: 'https://picsum.photos/id/660/700/400' },
  { id: '7', name: 'Mahottari', description: 'A district rich in cultural heritage and home to the ancient city of Jaleshwar.', imageUri: 'https://picsum.photos/id/665/700/400' },
  { id: '8', name: 'Parsa', description: 'A major gateway to Nepal from India, known for the Parsa National Park.', imageUri: 'https://picsum.photos/id/670/700/400' },
];

const Madhesh = () => {

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
            Districts of Madhesh Province
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
    backgroundColor: '#fffbe6', // A light yellow color for Madhesh Province
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

export default Madhesh;

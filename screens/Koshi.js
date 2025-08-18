import React from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Data array for the districts of Koshi Province
const districtsData = [
  { id: '1', name: 'Bhojpur', description: 'Known for its beautiful scenery and unique local culture.', imageUri: 'https://picsum.photos/id/491/700/400' },
  { id: '2', name: 'Dhankuta', description: 'A hilly district famous for orange cultivation and its serene atmosphere.', imageUri: 'https://picsum.photos/id/500/700/400' },
  { id: '3', name: 'Ilam', description: 'Renowned for its tea gardens, lush greenery, and scenic beauty.', imageUri: 'https://picsum.photos/id/507/700/400' },
  { id: '4', name: 'Jhapa', description: 'The easternmost district, known as the "tea and rice hub" of Nepal.', imageUri: 'https://picsum.photos/id/511/700/400' },
  { id: '5', name: 'Khotang', description: 'Features the Halesi Mahadev Temple, a major religious site.', imageUri: 'https://picsum.photos/id/517/700/400' },
  { id: '6', name: 'Morang', description: 'A large district with a mix of industrial and agricultural landscapes.', imageUri: 'https://picsum.photos/id/526/700/400' },
  { id: '7', name: 'Okhaldhunga', description: 'A district with historical significance and scenic mountain views.', imageUri: 'https://picsum.photos/id/531/700/400' },
  { id: '8', name: 'Panchthar', description: 'Known for its high hills, trekking trails, and diverse ethnic groups.', imageUri: 'https://picsum.photos/id/539/700/400' },
  { id: '9', name: 'Sankhuwasabha', description: 'A mountainous district with rich biodiversity and access to Makalu Barun National Park.', imageUri: 'https://picsum.photos/id/545/700/400' },
  { id: '10', name: 'Solukhumbu', description: 'Home to Mount Everest and a major destination for mountaineers and trekkers.', imageUri: 'https://picsum.photos/id/552/700/400' },
  { id: '11', name: 'Sunsari', description: 'Known for its agricultural land and industrial areas.', imageUri: 'https://picsum.photos/id/560/700/400' },
  { id: '12', name: 'Taplejung', description: 'Features the Kanchenjunga mountain and is a popular trekking destination.', imageUri: 'https://picsum.photos/id/564/700/400' },
  { id: '13', name: 'Terhathum', description: 'Known for its beautiful Rhododendron forests and the Tinjure-Milke-Jaljale area.', imageUri: 'https://picsum.photos/id/568/700/400' },
  { id: '14', name: 'Udayapur', description: 'A district with scenic lakes, caves, and a developing infrastructure.', imageUri: 'https://picsum.photos/id/573/700/400' },
];

const Koshi = () => {

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
            Districts of Koshi Province
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
    backgroundColor: '#e8f5e9', // A light green color for Koshi Province
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

export default Koshi;

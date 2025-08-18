import React from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Data array for the districts of Karnali Province
const districtsData = [
  { id: '1', name: 'Western Rukum', description: 'Known for its rugged beauty and the historical connection to the Maoist insurgency.', imageUri: 'https://picsum.photos/id/730/700/400' },
  { id: '2', name: 'Salyan', description: 'A hilly district known for its diverse climate and agricultural production.', imageUri: 'https://picsum.photos/id/735/700/400' },
  { id: '3', name: 'Dolpa', description: 'Nepal\'s largest district, known for its pristine beauty and the remote Shey Phoksundo Lake.', imageUri: 'https://picsum.photos/id/740/700/400' },
  { id: '4', name: 'Humla', description: 'The most remote district in Nepal, accessible only by foot or air, known for its traditional Tibetan culture.', imageUri: 'https://picsum.photos/id/745/700/400' },
  { id: '5', name: 'Jumla', description: 'The highest altitude rice-growing region in the world and home to the Chandannath Temple.', imageUri: 'https://picsum.photos/id/750/700/400' },
  { id: '6', name: 'Kalikot', description: 'A district with significant historical and cultural importance, offering stunning mountain views.', imageUri: 'https://picsum.photos/id/755/700/400' },
  { id: '7', name: 'Mugu', description: 'Features the largest lake in Nepal, Rara Lake, a major tourist destination.', imageUri: 'https://picsum.photos/id/760/700/400' },
  { id: '8', name: 'Surkhet', description: 'The provincial capital, a valley district with a sub-tropical climate.', imageUri: 'https://picsum.photos/id/765/700/400' },
  { id: '9', name: 'Dailekh', description: 'Known for its ancient Pancha Deval and the petroleum and gas reserves found here.', imageUri: 'https://picsum.photos/id/770/700/400' },
  { id: '10', name: 'Jajarkot', description: 'A hilly district with a mix of diverse cultures and scenic landscapes.', imageUri: 'https://picsum.photos/id/775/700/400' },
];

const Karnali = () => {

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
            Districts of Karnali Province
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
    backgroundColor: '#e6f7ff', // A light blue color for Karnali Province
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

export default Karnali;

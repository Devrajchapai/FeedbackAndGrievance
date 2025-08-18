import React from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const districtsData = [
  { id: '1', name: 'Achham', description: 'A remote, hilly district with a rugged landscape and rich cultural heritage.', imageUri: 'https://picsum.photos/id/780/700/400' },
  { id: '2', name: 'Baitadi', description: 'Known for its historical and religious sites, and its strategic location on the border with India.', imageUri: 'https://picsum.photos/id/785/700/400' },
  { id: '3', name: 'Bajhang', description: 'A mountainous district with diverse terrain and a challenging, but rewarding, trekking experience.', imageUri: 'https://picsum.photos/id/790/700/400' },
  { id: '4', name: 'Bajura', description: 'One of the most remote and least developed districts, known for its challenging terrain.', imageUri: 'https://picsum.photos/id/795/700/400' },
  { id: '5', name: 'Dadeldhura', description: 'The headquarters of the province and a major hub, known for its scenic beauty and ancient temples.', imageUri: 'https://picsum.photos/id/800/700/400' },
  { id: '6', name: 'Darchula', description: 'A remote Himalayan district with views of Mount Api and the Mahakali River.', imageUri: 'https://picsum.photos/id/805/700/400' },
  { id: '7', name: 'Doti', description: 'A hilly district known for its unique culture, traditional dances, and historical landmarks.', imageUri: 'https://picsum.photos/id/810/700/400' },
  { id: '8', name: 'Kailali', description: 'The largest district in the province and a major agricultural and industrial center.', imageUri: 'https://picsum.photos/id/815/700/400' },
  { id: '9', name: 'Kanchanpur', description: 'Located in the Terai region, known for its flat plains, forests, and Shuklaphanta National Park.', imageUri: 'https://picsum.photos/id/820/700/400' },
];

const Sudurpashchim = () => {

 
  const renderDistrictCard = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        console.log(`Navigating to feedback page for ${item.name}`);
        
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
            Districts of Sudurpashchim Province
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe0b2', 
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

export default Sudurpashchim;

import React from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const districtsData = [
  { 
    id: '1', 
    name: 'Bhojpur', 
    description: 'Known for its beautiful scenery and unique local culture.', 
    imageUri: 'https://superdesk-pro-c.s3.amazonaws.com/sd-nepalitimes/2022111011110/636ccc779c7e80680e08bc24jpeg.jpg',
    municipalities: ['Bhojpur Municipality', 'Shadananda Municipality', 'Tyamke Mailung Rural Municipality', 'Ramprasad Rai Rural Municipality']
  },
  { 
    id: '2', 
    name: 'Dhankuta', 
    description: 'A hilly district famous for orange cultivation and its serene atmosphere.', 
    imageUri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMVFhUVFRcXFxgYGBgXFxgWFxUYFx0XGBcYHSggGBolHRYVITEhJSorLi4uFx8zODMtNygtLysBCgoKDg0OGhAQGy0lICUtLS0vLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAJwBQwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQECAw...',
    municipalities: ['Dhankuta Municipality', 'Pakhribas Municipality', 'Mahalaxmi Municipality', 'Chhathar Jorpati Rural Municipality']
  },
  { 
    id: '3', 
    name: 'Ilam', 
    description: 'Famous for its tea gardens, especially the Ilam tea.', 
    imageUri: '...',
    municipalities: ['Ilam Municipality', 'Mai Municipality', 'Suryodaya Municipality', 'Deumai Municipality']
  },
  { 
    id: '4', 
    name: 'Jhapa', 
    description: 'The easternmost district, known as the "Granary of Nepal" for rice production.', 
    imageUri: '...',
    municipalities: ['Birtamod Municipality', 'Damak Municipality', 'Mechinagar Municipality', 'Arjundhara Municipality']
  },
  { 
    id: '5', 
    name: 'Khotang', 
    description: 'Known for the Halesi Mahadev cave temple, a significant Hindu and Buddhist pilgrimage site.', 
    imageUri: '...',
    municipalities: ['Diktel Rupakot Majhuwagadhi Municipality', 'Halesi Tuwachung Municipality', 'Khotang Rural Municipality', 'Aiselukharka Rural Municipality']
  },
  { 
    id: '6', 
    name: 'Morang', 
    description: 'Home to Biratnagar, the industrial capital of Koshi Province.', 
    imageUri: '...',
    municipalities: ['Biratnagar Metropolitan City', 'Sundarharaicha Municipality', 'Belbari Municipality', 'Ratuwamai Municipality']
  },
  { 
    id: '7', 
    name: 'Okhaldhunga', 
    description: 'Known for the Sunkoshi river and its historical connection to the Rana regime.', 
    imageUri: '...',
    municipalities: ['Siddhicharan Municipality', 'Manebhanjyang Rural Municipality', 'Chisankhugadhi Rural Municipality', 'Molung Rural Municipality']
  },
  { 
    id: '8', 
    name: 'Panchthar', 
    description: 'Hilly district with diverse ethnic groups and the gateway to the Kanchenjunga trekking area.', 
    imageUri: '...',
    municipalities: ['Phidim Municipality', 'Miklajung Rural Municipality', 'Falgunanda Rural Municipality', 'Hilihang Rural Municipality']
  },
  { 
    id: '9', 
    name: 'Sankhuwasabha', 
    description: 'Home to Mt. Makalu and the Arun River, rich in biodiversity.', 
    imageUri: '...',
    municipalities: ['Khandbari Municipality', 'Chainpur Municipality', 'Dharmadevi Municipality', 'Madi Municipality']
  },
  { 
    id: '10', 
    name: 'Solukhumbu', 
    description: 'The Everest region, famous for Mount Everest and the Sherpa culture.', 
    imageUri: '...',
    municipalities: ['Solududhkunda Municipality', 'Khumbu Pasang Lhamu Rural Municipality', 'Thulung Dudhkoshi Rural Municipality', 'Nechasalyan Rural Municipality']
  },
  { 
    id: '11', 
    name: 'Sunsari', 
    description: 'Known for the Koshi Tappu Wildlife Reserve and major cities like Dharan.', 
    imageUri: '...',
    municipalities: ['Itahari Sub-Metropolitan City', 'Dharan Sub-Metropolitan City', 'Ramdhuni Municipality', 'Barahachhetra Municipality']
  },
  { 
    id: '12', 
    name: 'Taplejung', 
    description: 'The easternmost district, known for the Kanchenjunga mountain range.', 
    imageUri: '...',
    municipalities: ['Phungling Municipality', 'Faktanglung Rural Municipality', 'Sirijanga Rural Municipality', 'Mikwakhola Rural Municipality']
  },
  { 
    id: '13', 
    name: 'Terhathum', 
    description: 'Known for its beautiful rhododendron forests and the Tinjure-Milke-Jaljale area.', 
    imageUri: '...',
    municipalities: ['Myanglung Municipality', 'Laligurans Municipality', 'Chhathar Rural Municipality', 'Phedap Rural Municipality']
  },
];

const Koshi = ({ navigation }) => {
  const renderDistrictCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        // FIXED NAVIGATION LOGIC: Passing districtName and municipalities
        navigation.navigate('FeedbackAndGrivanceScreen', { 
          districtName: item.name, 
          municipalities: item.municipalities // Pass the new data
        });
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 24,
    fontWeight: 'bold',
    color: '#388e3c',
  },
  card: {
    marginVertical: 8,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, 
  },
  cardText: {
    marginTop: 10,
    color: '#555',
  },
  listContent: {
    paddingBottom: 20, 
  }
});

export default Koshi;

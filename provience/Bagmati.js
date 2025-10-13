import { StyleSheet, TouchableOpacity, View, FlatList } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const districtsData = [
  {
    id: "1",
    municipalities: [
      "marin rural municipality",
      "phikkal rural municipality",
      "tinpatan rural municipality",
      "sunkoshi rural municipality",
      "golanjor rural municipality",
      "ghanglekh rural municipality",
      "hariharpurgadhi rural municipality",
      "dudhouli municipality",
      "kamalamai municipality",
    ],
    name: "Sindhuli",
    description: "Known for its historical fort and strategic location.",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvC9IvbT_wlN0q9ZFtoX3yKKCwoUUqrXdnasIfgXVamA4tkdEy5qfhnmhdnrv60BFyvjI&usqp=CAU",
  },
  {
    id: "2",
    name: "Ramechhap",
    municipalities: [
      "bigu rural municipality",
      "sailung rural municipality",
      "melung rural municipality",
      "baiteshwor rural municipality",
      "tamakoshi rural municipality",
      "gaurishankar rural municipality",
      "kalinchok rural municipality",
      "jiri municipality",
      "bhimeshwor municipality",
    ],
    description:
      "A district with diverse landscapes, from river valleys to high hills.",
    imageUri:
      "data:image/jpeg;base64,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",
  },
  {
    id: "3",
    municipalities: [
      "marin rural municipality",
      "phikkal rural municipality",
      "tinpatan rural municipality",
      "sunkoshi rural municipality",
      "golanjor rural municipality",
      "ghanglekh rural municipality",
      "hariharpurgadhi rural municipality",
      "dudhouli municipality",
      "kamalamai municipality",
    ],
    name: "Dolakha",
    description: "Famous for the Bhimeshwar Temple and Mount Gaurishankar.",
    imageUri:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/1c/7c/c4/north-east-view-from.jpg?w=900&h=-1&s=1",
  },
  {
    id: "4",
    municipalities: [
      "changunarayan municipality",
      "suryabinayak municipality",
      "bhaktapur municipality",
      "madhyapur thimi municipality",
    ],
    name: "Bhaktapur",
    description:
      "A city of ancient temples, rich in Newari culture and architecture.",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0sddRM8I5elS_iVEa4F2_WVdnqHZb3oEZ8Q&s",
  },
  {
    id: "5",
    municipalities: [
      "gajuri rural municipality",
      "galchi rural municipality",
      "thakre rural municipality",
      "siddhalek rural municipality",
      "khaniyabash rural municipality",
      "jwalamukhi rural municipality",
      "gangajamuna rural municipality",
      "rubi valley rural municipality",
      "tripura sundari rural municipality",
      "netrawati dabjong rural municipality",
      "benighat rorang rural municipality",
      "nilakantha municipality",
      "dhunibesi municipality",
    ],
    name: "Dhading",
    description:
      "Offers stunning views of Ganesh Himal and is a popular trekking route.",
    imageUri:
      "data:image/jpeg;base64,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",
  },
  {
    id: "6",
    municipalities: [
      "shankharapur municipality",
      "nagarjun municipality",
      "kageshwori manahora municipality",
      "dakshinkali municipality",
      "budhanilakantha municipality",
      "tarakeshwor municipality",
      "kathmandu metropolitian city",
      "tokha municipality",
      "chandragiri municipality",
      "gokarneshwor municipality",
    ],
    name: "Kathmandu",
    description:
      "The capital city, a bustling hub of culture, history, and modernity.",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf10JYmbpXn6RJAv2M1NVQ5HvEbE4psvBiTg&s",
  },
  {
    id: "7",
    municipalities: [
      "roshi rural municipality",
        "temal rural municipality",
        "bhumlu rural municipality",
        "mahabharat rural municipality",
        "bethanchowk rural municipality",
        "khanikhola rural municipality",
        "chaurideurali rural municipality",
        "banepa municipality",
        "mandandeupur municipality",
        "dhulikhel municipality",
        "panauti municipality",
        "namobuddha municipality",
        "panchkhal municipality"
    ],
    name: "Kavrepalanchok",
    description:
      "A scenic district known for its religious sites and beautiful hill stations.",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVq6515_66PiUm8gJb5ngDRtAkQ1PKwaR96Aho7b_dXX16yyvXryJ_d5eCugn8g4ozhBU&usqp=CAU",
  },
  {
    id: "8",
    municipalities: [
       "bagmati rural municipality",
        "mahankal rural municipality",
        "konjyosom rural municipality",
        "lalitpur metropolitian city",
        "mahalaxmi municipality",
        "godawari municipality"
    ],
    name: "Lalitpur",
    description: "A city of fine arts and rich history, also known as Patan.",
    imageUri:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiVhECsRWfww3FcnTenXebIY3y6xoseeNfvHkQZCRg3dHUu57w6mAHuYU5q543HKbbcSMTKLHpvoF3K-iWOPVYGZcqoLteeeWq1V5l8g1RJk53R44KfWpmRuHdUmuVmZDwHKau2zr2fEfHI/s1600/patan.jpg",
  },
  {
    id: "9",
    municipalities: [
      "kakani rural municipality",
        "tadi rural municipality",
        "likhu rural municipality",
        "myagang rural municipality",
        "shivapuri rural municipality",
        "kispang rural municipality",
        "suryagadhi rural municipality",
        "tarkeshwar rural municipality",
        "panchakanya rural municipality",
        "dupcheshwar rural municipality",
        "belkotgadhi municipality",
        "bidur municipality"
    ],
    name: "Nuwakot",
    description:
      "Historically significant with the Nuwakot Durbar and Seven-Story Palace.",
    imageUri:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/cb/fb/91/nuwakot-s-the-famous.jpg?w=1400&h=1400&s=1",
  },
  {
    id: "10",
    municipalities:[
       "kalika rural municipality",
        "naukunda rural municipality",
        "uttargaya rural municipality",
        "gosaikunda rural municipality",
        "amachodingmo rural municipality"
    ],
    name: "Rasuwa",
  
    description:
      "Home to Langtang National Park and the popular Gosainkunda Lake.",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyw-QbiTnziP7_xhdDz5uUN1FDJDV1swjGYw&s",
  },
  {
    id: "11",
    municipalities: [
      "jugal rural municipality",
        "balefi rural municipality",
        "sunkoshi rural municipality",
        "helambu rural municipality",
        "bhotekoshi rural municipality",
        "lisangkhu pakhar rural municipality",
        "indrawati rural municipality",
        "tripurasundari rural municipality",
        "panchpokhari thangpal rural municipality",
        "chautara sangachokgadhi municipality",
        "barhabise municipality",
        "melamchi municipality"
    ],
    name: "Sindhupalchok",
    description:
      "A mountainous district with a mix of diverse cultures and landscapes.",
    imageUri:
      "https://nepalog.com/wp-content/uploads/2024/10/289d9ba1-a785-43fe-8d21-01e688ec1dee.jpg.webp",
  },
  {
    id: "12",
    municipalities:[
      "ichchhyakamana rural municipality",
        "bharatpur metropolitian city",
        "kalika municipality",
        "khairahani municipality",
        "madi municipality",
        "rapti municipality",
        "ratnanagar municipality"
    ],
    name: "Chitwan",
    description: "Famous for Chitwan National Park and its diverse wildlife.",
    imageUri: "https://picsum.photos/id/476/700/400",
  },
  {
    id: "13",
    municipalities:[
       "bakaiya rural municipality",
        "kailash rural municipality",
        "manahari rural municipality",
        "bhimphedi rural municipality",
        "bagmati rural municipality",
        "raksirang rural municipality",
        "makawanpurgadhi rural municipality",
        "indrasarowar rural municipality",
        "hetauda sub-metropolitian city",
        "thaha municipality"
    ],
    name: "Makwanpur",
    description:
      "Known for its forests, wildlife, and the historic Makwanpur Gadhi fort.",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQQ8apmeMmLbQy0YqOFTJSkFqVN_KIkZPjOg&s",
  },
];

const Bagmati = ({ navigation }) => {
  const renderDistrictCard = ({ item }) => (
    <TouchableOpacity
          onPress={() => {
            // FIXED NAVIGATION LOGIC: Passing districtName and municipalities
            navigation.navigate("FeedbackAndGrivanceScreen", {
              districtName: item.name,
              municipalities: item.municipalities, // Pass the new data
              state: 'Bagmati'
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
          <Text variant="bodyMedium" style={styles.cardText}>
            {item.description}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  // ... rest of the component remains the same
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

// ... styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3f2fd",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 24,
    fontWeight: "bold",
    color: "#303f9f",
  },
  card: {
    marginVertical: 8,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  cardText: {
    marginTop: 10,
    color: "#555",
  },
  listContent: {
    paddingBottom: 20,
  },
});
export default Bagmati;


import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const provincesData = [
  {
    id: "1",
    title: "Bagmati",
    subtitle: "Hetauda",
    description:
      "Your voice is the foundation of progress in Bagmati Province. We invite you to submit your feedback on a wide range of topics, including urban development, environmental initiatives, and the quality of public service delivery. By sharing your insights, you help us shape a more efficient, livable, and sustainable future for our province and its citizens.",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2CdGZuTPhSoOt_JZM2_0LYeM4L_88RGvRgA&s",
  },
  {
    id: "2",
    title: "Koshi",
    subtitle: "Biratnagar",
    description:
      "Your insights are essential for the progress of Koshi Province. We encourage you to provide detailed feedback on services and public welfare projects. Your input is crucial for improving governance and shaping a brighter future for districts like Morang, Sunsari, and Jhapa.",
    imageUri:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Mount_Everest_as_seen_from_Drukair2_PLW_edit.jpg/1200px-Mount_Everest_as_seen_from_Drukair2_PLW_edit.jpg",
  },
  {
    id: "3",
    title: "Gandaki",
    subtitle: "Pokhara",
    description:
      "Contribute directly to the development of Gandaki Province. We warmly welcome your feedback on topics ranging from tourism and sustainable development to critical infrastructure and public services. Your input helps us make this a better and more prosperous place for everyone.",
    imageUri:
      "https://upload.wikimedia.org/wikipedia/commons/3/3f/Phewa_lake_Pokhara.jpg",
  },
  {
    id: "4",
    title: "Madhesh",
    subtitle: "Janakpur",
    description:
      "We are committed to building a better Madhesh Province, and your active participation is key. Please share your thoughts and suggestions on local governance, infrastructure, and the quality of public services to drive meaningful progress and development across this entire region.",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMQsriurN8kXx293_ZdoqLiDGRksP_mOzRPA&s",
  },
  {
    id: "5",
    title: "Lumbini",
    subtitle: "Deukhuri",
    description:
      "You have the power to shape the future of Lumbini Province. We urge you to share your feedback on cultural preservation efforts, major development projects, and the efficiency of public services. Your suggestions are highly valued and will guide our collective efforts.",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWB98QWIcHPND7n1WJ0Epp7emAMrLGkD01gQ&s",
  },
  {
    id: "6",
    title: "Karnali",
    subtitle: "Birendranagar",
    description:
      "Your feedback is more than a suggestion; it is essential for the sustained progress of Karnali Province. Please share your experiences and detailed suggestions on government services, infrastructure, and social development to help us address local needs and build a more resilient community.",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9P_Ljv-1MouJApWrviABvHK7ASu8gignrNw&s",
  },
  {
    id: "7",
    title: "Sudurpashchim",
    subtitle: "Godawari",
    description:
      "Help us improve governance and public services in Sudurpashchim Province. We are committed to listening to your feedback to address local issues, enhance regional growth, and ensure that every citizen has a voice in our shared future.",
    imageUri:
      "https://farsight.saviskarcdn.net/media/photos/tinywow_HimalDoc_Village-councillevelNaturalResourceManagement_Saipal_34415813_1.jpg",
  },
];

const HomeScreen = ({ navigation }) => {
  const renderProvinceCard = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate(`${item.title}`);
      }}
    >
      <Card mode="contained" style={styles.card}>
        <Card.Title
          title={item.title}
          subtitle={item.subtitle}
          left={(props) => <Avatar.Icon {...props} icon="image-filter-hdr" />}
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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerRow}>
          <Text style={styles.screenTitle}>Choose Province</Text>

          <TouchableOpacity
            style={styles.profileIconContainer}
            onPress={() => navigation.navigate("UserProfile")}
          >
            <Avatar.Icon
              size={40}
              icon="account-circle"
              color="#1976d2"
              style={{ backgroundColor: "#e3f2fd" }}
            />
          </TouchableOpacity>
        </View>

        {/* View My Submissions Button */}
        <Button
          mode="contained"
          icon="folder-account"
          onPress={() => navigation.navigate("MySubmissions")}
          style={styles.submissionsButton}
          labelStyle={{ fontSize: 16, fontWeight: "600" }}
        >
          View My Submissions
        </Button>

        {/* Province List */}
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
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
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
    color: "#555",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
    marginBottom: 5,
  },
  screenTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#333",
  },
  profileIconContainer: {
    padding: 4,
    borderRadius: 20,
  },
  submissionsButton: {
    backgroundColor: "#1976d2",
    marginVertical: 12,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
  },
});

export default HomeScreen;

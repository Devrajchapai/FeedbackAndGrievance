import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { sendFeedbackOrGrievance } from "../src/api";
import departments from "../src/api"; // departments defined locally inside api.jsx

// Import province data from new location (outside screens/)
import Bagmati from "../provience/Bagmati";
import Gandaki from "../provience/Gandaki";
import Koshi from "../provience/Koshi";
import Lumbini from "../provience/Lumbini";
import Madhesh from "../provience/Madhesh";
import Sudurpashchim from "../provience/Sudurpashchim";
import Karnali from "../provience/Karnali";

const provinceData = {
  bagmati: Bagmati,
  gandaki: Gandaki,
  koshi: Koshi,
  lumbini: Lumbini,
  madhesh: Madhesh,
  sudurpashchim: Sudurpashchim,
  karnali: Karnali,
};

const FeedbackAndGrivanceScreen = ({ route, navigation }) => {
  const { province, district } = route.params || {};
  const [selectedMunicipality, setSelectedMunicipality] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [message, setMessage] = useState("");
  const [municipalities, setMunicipalities] = useState([]);

  useEffect(() => {
    if (!province || !district) {
      Alert.alert("Error", "Province or District not provided.");
      navigation.navigate("Home");
      return;
    }

    const provinceKey = province.toLowerCase();
    const data = provinceData[provinceKey];

    if (data) {
      const matchedDistrict = data.districts.find(
        (d) => d.name.toLowerCase() === district.toLowerCase()
      );

      if (matchedDistrict) {
        setMunicipalities(matchedDistrict.municipalities);
      } else {
        console.warn("No district found for:", district);
        setMunicipalities([]);
      }
    } else {
      console.warn("No province data found for:", province);
      setMunicipalities([]);
    }
  }, [province, district]);

  const handleSubmit = async () => {
    if (!selectedMunicipality || !selectedDepartment || !message.trim()) {
      Alert.alert("Incomplete", "Please fill all fields before submitting.");
      return;
    }

    try {
      const payload = {
        province,
        district,
        municipality: selectedMunicipality,
        department: selectedDepartment,
        message,
      };
      await sendFeedbackOrGrievance(payload);
      Alert.alert("Success", "Your feedback has been submitted!");
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to submit feedback.");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Submit Feedback or Grievance
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 5 }}>Province: {province}</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        District: {district}
      </Text>

      {/* Municipality Dropdown */}
      <Text style={{ fontSize: 16, marginTop: 10 }}>Select Municipality:</Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          marginBottom: 15,
        }}
      >
        <Picker
          selectedValue={selectedMunicipality}
          onValueChange={(value) => setSelectedMunicipality(value)}
        >
          <Picker.Item label="Select a municipality" value="" />
          {municipalities.map((mun, idx) => (
            <Picker.Item key={idx} label={mun} value={mun} />
          ))}
        </Picker>
      </View>

      {/* Department Dropdown */}
      <Text style={{ fontSize: 16 }}>Select Department:</Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          marginBottom: 15,
        }}
      >
        <Picker
          selectedValue={selectedDepartment}
          onValueChange={(value) => setSelectedDepartment(value)}
        >
          <Picker.Item label="Select a department" value="" />
          {departments.map((dept, idx) => (
            <Picker.Item key={idx} label={dept.name} value={dept.name} />
          ))}
        </Picker>
      </View>

      {/* Message Box */}
      <Text style={{ fontSize: 16 }}>Message:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
          height: 100,
          textAlignVertical: "top",
          marginBottom: 20,
        }}
        multiline
        placeholder="Write your feedback or grievance here..."
        value={message}
        onChangeText={setMessage}
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#007bff",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
        }}
        onPress={handleSubmit}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          Submit
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FeedbackAndGrivanceScreen;

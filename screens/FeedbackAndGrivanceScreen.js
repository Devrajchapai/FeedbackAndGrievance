import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { PROVINCES, DEPARTMENTS } from "../data/nepalData";
import api from "../src/api";

const FeedbackAndGrivanceScreen = ({ route, navigation }) => {
  const { province: initialProvince, district: initialDistrict } = route.params || {};

  const [province, setProvince] = useState(initialProvince || "");
  const [district, setDistrict] = useState(initialDistrict || "");
  const [municipality, setMunicipality] = useState("");
  const [department, setDepartment] = useState("");
  const [message, setMessage] = useState("");

  // Derived lists based on selected province & district
  const selectedProvince = PROVINCES.find((p) => p.name === province);
  const districts = selectedProvince ? selectedProvince.districts : [];

  const selectedDistrict = districts.find((d) => d.name === district);
  const municipalities = selectedDistrict ? selectedDistrict.municipalities : [];

  const handleSubmit = async () => {
    if (!province || !district || !municipality || !department || !message) {
      Alert.alert("Error", "Please fill out all fields before submitting.");
      return;
    }

    try {
      await api.post("/feedbacks/", {
        province,
        district,
        municipality,
        department,
        message,
      });

      Alert.alert("Success", "Your feedback has been submitted!");
      setMessage("");
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error("Submit error:", error);
      Alert.alert("Error", "Failed to send feedback.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Feedback & Grievance</Text>

      {/* Province Dropdown */}
      <Text style={styles.label}>Select Province</Text>
      <Picker
        selectedValue={province}
        onValueChange={(value) => {
          setProvince(value);
          setDistrict("");
          setMunicipality("");
        }}
        style={styles.picker}
      >
        <Picker.Item label="-- Select Province --" value="" />
        {PROVINCES.map((p) => (
          <Picker.Item key={p.id} label={p.name} value={p.name} />
        ))}
      </Picker>

      {/* District Dropdown */}
      {province ? (
        <>
          <Text style={styles.label}>Select District</Text>
          <Picker
            selectedValue={district}
            onValueChange={(value) => {
              setDistrict(value);
              setMunicipality("");
            }}
            style={styles.picker}
          >
            <Picker.Item label="-- Select District --" value="" />
            {districts.map((d) => (
              <Picker.Item key={d.id} label={d.name} value={d.name} />
            ))}
          </Picker>
        </>
      ) : null}

      {/* Municipality Dropdown */}
      {district ? (
        <>
          <Text style={styles.label}>Select Municipality</Text>
          <Picker
            selectedValue={municipality}
            onValueChange={(value) => setMunicipality(value)}
            style={styles.picker}
          >
            <Picker.Item label="-- Select Municipality --" value="" />
            {municipalities.map((m) => (
              <Picker.Item key={m.id} label={m.name} value={m.name} />
            ))}
          </Picker>
        </>
      ) : null}

      {/* Department Dropdown */}
      <Text style={styles.label}>Select Department</Text>
      <Picker
        selectedValue={department}
        onValueChange={(value) => setDepartment(value)}
        style={styles.picker}
      >
        <Picker.Item label="-- Select Department --" value="" />
        {DEPARTMENTS.map((dep) => (
          <Picker.Item key={dep.id} label={dep.name} value={dep.name} />
        ))}
      </Picker>

      {/* Message Box */}
      <Text style={styles.label}>Your Message</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Write your feedback or grievance..."
        multiline
        value={message}
        onChangeText={setMessage}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    marginTop: 10,
    fontWeight: "600",
    fontSize: 16,
  },
  picker: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 5,
  },
  textInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FeedbackAndGrivanceScreen;

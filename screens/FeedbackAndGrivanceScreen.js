// screens/FeedbackAndGrivanceScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { PROVINCES, DEPARTMENTS } from "../data/nepalData"; // adjust path if needed
import { sendFeedback, sendGrievance } from "../src/api";
import * as ImagePicker from "expo-image-picker"; // optional: install expo-image-picker

// Small segmented control button
const Segmented = ({ value, onChange }) => (
  <View style={segStyles.container}>
    <TouchableOpacity
      style={[segStyles.btn, value === "feedback" && segStyles.active]}
      onPress={() => onChange("feedback")}
    >
      <Text style={[segStyles.txt, value === "feedback" && segStyles.txtActive]}>Feedback</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[segStyles.btn, value === "grievance" && segStyles.active]}
      onPress={() => onChange("grievance")}
    >
      <Text style={[segStyles.txt, value === "grievance" && segStyles.txtActive]}>Grievance</Text>
    </TouchableOpacity>
  </View>
);

const FeedbackAndGrivanceScreen = ({ route, navigation }) => {
  // Allow pre-selection from route.params (province/district passed from previous screen)
  const { province: paramProvince, district: paramDistrict } = route.params || {};

  const [type, setType] = useState("feedback");
  const [province, setProvince] = useState(paramProvince || "");
  const [district, setDistrict] = useState(paramDistrict || "");
  const [municipality, setMunicipality] = useState("");
  const [department, setDepartment] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [title, setTitle] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [imagePermissionGranted, setImagePermissionGranted] = useState(true); // assume true until we test

  // Derived lists
  const selectedProvince = PROVINCES.find((p) => p.name === province || p.id === province);
  const districts = selectedProvince ? selectedProvince.districts : [];

  const selectedDistrict = districts.find((d) => d.name === district || d.id === district);
  const municipalities = selectedDistrict ? selectedDistrict.municipalities : [];

  useEffect(() => {
    // If route params changed after mount, update states
    if (paramProvince && paramProvince !== province) setProvince(paramProvince);
    if (paramDistrict && paramDistrict !== district) setDistrict(paramDistrict);
  }, [paramProvince, paramDistrict]);

  // IMAGE PICKER (optional)
  const pickImage = async () => {
    try {
      // request permission on iOS/Android
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Permission to access photos is required to attach images.");
        setImagePermissionGranted(false);
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.6,
        allowsEditing: true,
      });
      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    } catch (err) {
      console.warn("Image picker error", err);
    }
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!province || !district || !municipality || !department) {
      Alert.alert("Missing fields", "Please select province / district / municipality and department.");
      return;
    }

    try {
      if (type === "feedback") {
        if (!rating || Number.isNaN(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) {
          Alert.alert("Invalid rating", "Please provide a rating between 1 and 5.");
          return;
        }
        await sendFeedback({
          state: province,
          district,
          municipality,
          department,
          rating,
          comment,
        });
        Alert.alert("Success", "Feedback submitted.");
      } else {
        // grievance
        if (!title || title.trim() === "") {
          Alert.alert("Missing title", "Please add a title for the grievance.");
          return;
        }
        await sendGrievance({
          state: province,
          district,
          municipality,
          department,
          title,
          comment,
          imageUri, // optional
        });
        Alert.alert("Success", "Grievance submitted.");
      }

      // reset fields (keep province/district so user doesn't have to re-select)
      setTitle("");
      setComment("");
      setRating("");
      setImageUri(null);
      navigation.navigate("Home"); // ensure route name matches your layout
    } catch (err) {
      console.error("Submit error:", err);
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        Alert.alert("Authentication", "Please login again.");
        navigation.replace("Login"); // ensure "Login" route exists in navigator
        return;
      }
      // show backend message if any
      const detail = err?.response?.data || err?.message || "Submission failed";
      Alert.alert("Error", JSON.stringify(detail));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Engagement</Text>

      <Segmented value={type} onChange={setType} />

      <Text style={styles.label}>Province</Text>
      <View style={styles.pickerBox}>
        <Picker
          selectedValue={province}
          onValueChange={(val) => {
            setProvince(val);
            setDistrict("");
            setMunicipality("");
          }}
        >
          <Picker.Item label="-- Select Province --" value="" />
          {PROVINCES.map((p) => (
            <Picker.Item key={p.id} label={p.name} value={p.name} />
          ))}
        </Picker>
      </View>

      {province ? (
        <>
          <Text style={styles.label}>District</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={district}
              onValueChange={(val) => {
                setDistrict(val);
                setMunicipality("");
              }}
            >
              <Picker.Item label="-- Select District --" value="" />
              {districts.map((d) => (
                <Picker.Item key={d.id} label={d.name} value={d.name} />
              ))}
            </Picker>
          </View>
        </>
      ) : null}

      {district ? (
        <>
          <Text style={styles.label}>Municipality</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={municipality}
              onValueChange={(val) => setMunicipality(val)}
            >
              <Picker.Item label="-- Select Municipality --" value="" />
              {municipalities.map((m) => (
                <Picker.Item key={m.id} label={m.name} value={m.name} />
              ))}
            </Picker>
          </View>
        </>
      ) : null}

      <Text style={styles.label}>Department</Text>
      <View style={styles.pickerBox}>
        <Picker
          selectedValue={department}
          onValueChange={(val) => setDepartment(val)}
        >
          <Picker.Item label="-- Select Department --" value="" />
          {DEPARTMENTS.map((d) => (
            <Picker.Item key={d.id} label={d.name} value={d.name} />
          ))}
        </Picker>
      </View>

      {type === "feedback" ? (
        <>
          <Text style={styles.label}>Rating (1 - 5)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={rating}
            onChangeText={setRating}
            placeholder="e.g. 4"
          />
        </>
      ) : (
        <>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Short descriptive title"
          />
        </>
      )}

      <Text style={styles.label}>
        {type === "feedback" ? "Comment" : "Describe your grievance"}
      </Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={comment}
        onChangeText={setComment}
        multiline
      />

      {type === "grievance" && (
        <>
          <Text style={styles.label}>Attach image (optional)</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TouchableOpacity onPress={pickImage} style={styles.imageBtn}>
              <Text style={{ color: "#fff" }}>Pick Image</Text>
            </TouchableOpacity>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.preview} />
            ) : (
              <Text style={{ color: "#666" }}>No image selected</Text>
            )}
          </View>
        </>
      )}

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>
          Submit {type === "feedback" ? "Feedback" : "Grievance"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const segStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#e9eefb",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 12,
  },
  btn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  active: {
    backgroundColor: "#2b6df6",
  },
  txt: {
    color: "#2b6df6",
    fontWeight: "600",
  },
  txtActive: {
    color: "#fff",
  },
});

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#fff",
    minHeight: "100%",
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "center",
  },
  label: {
    marginTop: 12,
    fontWeight: "600",
  },
  pickerBox: {
    backgroundColor: "#f7f9ff",
    borderRadius: 8,
    marginTop: 6,
  },
  input: {
    backgroundColor: "#f7f9ff",
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  submitBtn: {
    backgroundColor: "#2b6df6",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 18,
  },
  submitText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
  },
  imageBtn: {
    backgroundColor: "#2b6df6",
    padding: 10,
    borderRadius: 8,
  },
  preview: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginLeft: 12,
  },
});

export default FeedbackAndGrivanceScreen;

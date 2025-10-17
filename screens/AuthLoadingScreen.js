// screens/AuthLoadingScreen.js
import React, { useContext } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { AuthContext } from "../navigation/AuthContext"; // Adjust path if needed
import { navigationRef } from "../navigation/RootNavigation";

const AuthLoadingScreen = () => {
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (!loading && navigationRef.isReady()) {
    navigationRef.replace(isLoggedIn ? "Home" : "Login");
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default AuthLoadingScreen;
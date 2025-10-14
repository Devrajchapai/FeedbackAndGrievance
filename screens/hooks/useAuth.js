// app/_layout.jsx
import { Stack } from "expo-router";
import useAuth from "../hooks/useAuth";

export default function RootLayout() {
  const { loading } = useAuth();

  if (loading) return null; // could show splash

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="feedback-and-grievance" options={{ headerShown: false }} />
    </Stack>
  );
}

import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import React from "react";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="welcome"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="home" options={{ headerShown: false }} />

      <Stack.Screen name="carousel" options={{ headerShown: false }} />
      <Stack.Screen name="images" options={{ headerShown: false }} />
      <Stack.Screen name="graph" options={{ headerShown: false }} />
    </Stack>
  );
}

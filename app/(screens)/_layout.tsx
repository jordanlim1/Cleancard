import { Stack } from "expo-router";

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
    </Stack>
  );
}

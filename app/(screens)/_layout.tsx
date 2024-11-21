import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
}

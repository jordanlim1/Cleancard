import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { router } from "expo-router";

const home = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to Cleancard</Text>

        <LottieView
          source={require("../../assets/animations/doctor.json")}
          style={styles.lottie}
          autoPlay
          loop={true}
          speed={1}
        />

        <Text style={styles.slogan}>
          Making cancer detection as easy as a pregnancy test
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/carousel")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#4b82dd",
  },
  slogan: {
    fontSize: 20,
    color: "rgba(0, 0, 0, 0.6)",
    textAlign: "center",
  },
  lottie: {
    height: 350,
    width: 390,
    marginTop: "15%",
    marginBottom: "5%",
  },
  button: {
    width: "70%",
    backgroundColor: "#4b82dd",
    padding: 12,
    borderRadius: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
  },
  buttonText: {
    fontSize: 25,
    color: "#fff",
  },
});

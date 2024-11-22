import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
const getStarted = () => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 8,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Results</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Contact a medical provider to better understand your results.
          </Text>
        </View>
        <LottieView
          source={require("../../../assets/animations/results.json")}
          style={styles.lottie}
          autoPlay
          loop={true}
          speed={1}
        />
        <Animated.View
          style={[
            styles.tooltip,
            {
              transform: [{ translateY: bounceAnim }], // Apply bounce animation
            },
          ]}
        >
          <Text style={styles.tooltipText}>Get Started</Text>
        </Animated.View>

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => router.push("/images")}
        >
          <Entypo name="camera" size={36} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default getStarted;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#4b82dd",
  },
  titleContainer: {
    position: "absolute",
    paddingHorizontal: 10,
    alignItems: "flex-start",
    width: "100%",
    top: 40,
  },
  lottie: {
    height: 400,
    width: 440,
    marginTop: "5%",
    marginBottom: "5%",
  },
  floatingButton: {
    position: "absolute",
    bottom: 70,
    right: 40,
    backgroundColor: "#4b82dd",
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  textContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    marginTop: -20,
  },
  text: {
    fontSize: 24,
    textAlign: "center",
    width: "100%",
    color: "rgba(0, 0, 0, 0.7)",
  },
  tooltip: {
    position: "absolute",
    bottom: 170,
    right: 30,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 100,
    alignItems: "center",
  },
  tooltipText: {
    color: "black",
    fontSize: 15,
  },
});

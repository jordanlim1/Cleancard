import React, { useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import { router } from "expo-router";

export default function Welcome() {
  const logoScale = useRef(new Animated.Value(1)).current;

  const logo = require("../../assets/images/cleancardlogo.jpeg");

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 0.7,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setTimeout(() => {
        router.push("/home");
      }, 700);
    });
  }, [logoScale]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Animated.View
          style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}
        >
          <Image source={logo} style={styles.logo} />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#4b82dd",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4b82dd",
  },
  logoContainer: {
    position: "absolute",
  },
  logo: {
    width: 1000,
    height: 1000,
    resizeMode: "contain",
  },
});

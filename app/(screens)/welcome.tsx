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
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const lottieOpacity = useRef(new Animated.Value(0)).current;

  const logo = require("../../assets/images/cleancardlogo.jpeg");

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 1000,
          delay: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(lottieOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        router.push("/home");
      }, 1300);
    });
  }, [logoScale, logoOpacity, textOpacity, lottieOpacity]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.logoContainer,
            { transform: [{ scale: logoScale }], opacity: logoOpacity },
          ]}
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
    width: 500,
    height: 500,
    resizeMode: "contain",
  },
});

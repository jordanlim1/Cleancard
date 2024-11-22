import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";

const Guidelines = () => {
  const device = require("../../../assets/images/device.jpeg");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Guidelines</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.contentText}>
            <Text style={styles.text}>Position the test horizontally!</Text>
          </View>
          <View style={styles.deviceContainer}>
            <View style={styles.imageContainer}>
              <Image source={device} style={styles.image} />
            </View>

            <FontAwesome5 name="check-circle" size={50} color="green" />
          </View>
        </View>

        <View style={styles.contentVertical}>
          <View style={styles.contentText}>
            <Text style={styles.text}>
              Do not position the test vertically!
            </Text>
          </View>
          <View style={styles.verticalDeviceContainer}>
            <View style={styles.verticalImageContainer}>
              <Image source={device} style={styles.imageVertical} />
            </View>
            <View style={styles.verticalImageContainer2}>
              <Image source={device} style={styles.imageVertical2} />
            </View>
            <Feather name="x-circle" size={60} color="red" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Guidelines;

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
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-5%",
  },
  contentVertical: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "left",
    paddingHorizontal: 10,
  },
  contentText: {
    width: "100%",
    marginBottom: "3%",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 2.7,
    flex: 1,
  },
  verticalImageContainer: {
    width: "40%",
    aspectRatio: 2.7,
    marginRight: -10,
  },
  verticalImageContainer2: {
    width: "40%",
    aspectRatio: 2.7,
    marginRight: 30,
  },
  image: {
    width: "90%",
    height: "100%",
    resizeMode: "contain",
  },
  imageVertical: {
    width: "150%",
    height: "150%",
    resizeMode: "contain",
    transform: [{ rotate: "90deg" }],
  },
  imageVertical2: {
    width: "150%",
    height: "150%",
    resizeMode: "contain",
    transform: [{ rotate: "-90deg" }],
  },
  deviceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginBottom: "15%",
  },
  verticalDeviceContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: "30%",
    marginBottom: "10%",
    marginRight: 40,
  },
});

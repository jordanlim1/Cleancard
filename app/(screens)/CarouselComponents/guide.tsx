import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Swiper from "react-native-swiper";

const Guide = () => {
  const cameraIcon = require("../../../assets/images/cameraIcon.png");
  const tips = [
    "Place the device against a dark background.",
    "Try with and without flash.",
    "Try different lighting conditions.",
  ];
  return (
    <SafeAreaView style={styles.safeArea}>
      <Swiper showsPagination={true} loop={false}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>A Quick Guide </Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Take 5 photos of the Cleancard device.
            </Text>
            <Text style={styles.tip}>Tips:</Text>
            <View style={styles.listContainer}>
              {tips.map((tip, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.bullet}>{index + 1})</Text>
                  <Text style={styles.listText}>{tip}</Text>
                </View>
              ))}
            </View>
          </View>

          <Image source={cameraIcon} style={styles.imageContainer} />
        </View>
      </Swiper>
    </SafeAreaView>
  );
};

export default Guide;

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
  imageContainer: {
    width: "100%",
    alignItems: "center",
    aspectRatio: 1,
    height: "auto",
    resizeMode: "contain",
    marginTop: "10%",
  },
  textContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: "20%",
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 21,
    marginBottom: 8,
    textAlign: "left",
    width: "100%",
    textDecorationLine: "underline",
  },
  tip: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: "10%",
  },
  listContainer: {
    marginTop: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    marginRight: 5,
  },
  listText: {
    fontStyle: "italic",
    fontSize: 17,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 40,
    backgroundColor: "#4b82dd",
    borderRadius: 37.5,
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
});

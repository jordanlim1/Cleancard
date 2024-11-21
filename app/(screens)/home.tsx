import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

const home = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Welcome to Cleancard</Text>
        <LottieView
          source={require("../../assets/animations/doctor.json")}
          style={styles.lottie}
          autoPlay
          loop={false}
          speed={0.6}
        />

        <Text>Making cancer detection as easy as a pregnancy test</Text>
      </View>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  lottie: {
    height: 260,
    width: 300,
  },
});

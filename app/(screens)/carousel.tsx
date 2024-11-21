import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import Guide from "./CarouselComponents/guide";
import Guidelines from "./CarouselComponents/guidelines";
import Swiper from "react-native-swiper";

const Carosel = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Swiper showsPagination={true} loop={false}>
        <View style={styles.container}>
          <Guide />
        </View>
        <View style={styles.container}>
          <Guidelines />
        </View>
      </Swiper>
    </SafeAreaView>
  );
};

export default Carosel;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
  },
});

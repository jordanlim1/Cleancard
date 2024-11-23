import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  Image,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function results() {
  const [data, setData] = useState<number[] | null>(null);
  const [mean, setMean] = useState<number | null>(null);
  const [criticalLevels, setCriticalLevels] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const logo = require("../../assets/images/clearlogo-removebg.png");

  useEffect(() => {
    (async () => {
      try {
        const results = await AsyncStorage.getItem("data");
        if (results) {
          const parsedResults = JSON.parse(results);

          if (parsedResults.status === "success" && parsedResults.levels) {
            const levels = parsedResults.levels;

            const mean =
              levels.reduce((sum: number, val: number) => sum + val, 0) /
              levels.length;

            const criticalThreshold = 0.8;
            const criticalLevels = levels.filter(
              (val: number) => val > criticalThreshold
            ).length;

            setCriticalLevels(criticalLevels);
            setMean(mean);
            setData(levels);
          } else {
            console.error("Invalid data structure");
          }
        } else {
          console.error("No data found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error reading data from AsyncStorage:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={logo} style={styles.logo} />
        </View>

        <Text style={styles.chartTitle}>Cancer Cell Count</Text>

        <LineChart
          data={{
            labels: data!.map((_, index) =>
              index % 2 === 0 ? `Analysis ${index + 1}` : ""
            ),
            datasets: [
              {
                data: data!,
              },
            ],
          }}
          width={Dimensions.get("window").width - 30}
          height={250}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: "#1c910a",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={{
            marginVertical: 8,
          }}
        />

        {mean !== null && criticalLevels !== null && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>National Average: 0.45</Text>
            <Text style={styles.summaryText}>
              Your Average: {mean.toFixed(2)}
            </Text>
            <Text style={styles.summaryText}>
              Critical Levels Detected: {criticalLevels}
            </Text>
          </View>
        )}

        <View style={styles.banner}>
          <Text style={styles.text}>
            Your results are within normal limits.
          </Text>
          <Text style={styles.text}>
            Please contact your primary physician if there are any concerns.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  titleContainer: {
    position: "absolute",
    alignItems: "flex-start",
    width: "100%",
    top: 30,
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#4b82dd",
    marginBottom: -30,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  chartTitle: {
    fontSize: 25,
    marginBottom: 20,
    color: "#000",
    fontWeight: 500,
  },
  summaryContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "500",
  },
  text: {
    textAlign: "left",
    fontSize: 20,
    color: "white",
    marginBottom: 10,
  },
  imageContainer: {
    width: 500,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 30,
  },
  logo: {
    // borderColor: "red",
    // borderWidth: 2,
    resizeMode: "contain",
    width: 400,
    height: 300,
  },
  banner: {
    width: "90%",
    height: "20%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#4b82dd",
    padding: 15,
    paddingTop: 30,
    borderRadius: 15,
  },
});

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function App() {
  const [data, setData] = useState<number[] | null>(null);
  const [mean, setMean] = useState<number | null>(null);
  const [criticalLevels, setCriticalLevels] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add a loading state

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

  if (!data) {
    // Handle the case where no data is found
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No data available to display.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Final Results</Text>
        </View>
        <Text style={styles.chartTitle}>Cancer Cell Levels</Text>

        <LineChart
          data={{
            labels: data.map((_, index) =>
              index % 2 === 0 ? `Sample ${index + 1}` : ""
            ), // Show every 2nd label`), // Label each sample
            datasets: [
              {
                data: data, // The cancer levels
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
            backgroundGradientTo: "#4b82dd",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />

        {mean !== null && criticalLevels !== null && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>
              Average Level: {mean.toFixed(2)}
            </Text>
            <Text style={styles.summaryText}>
              Critical Levels Detected: {criticalLevels}
            </Text>
          </View>
        )}

        <Text style={styles.text}>
          Please contact your medical provider for more information.
        </Text>
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
    padding: 20,
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
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
    textAlign: "center",
    fontSize: 15,
    bottom: -50,
  },
});

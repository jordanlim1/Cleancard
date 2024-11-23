import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { useCameraPermissions } from "expo-image-picker";
import Toast from "react-native-toast-message";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
const Images = () => {
  const [images, setImages] = useState<string[]>(["", "", "", "", ""]);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const YOUR_URL = process.env.EXPO_PUBLIC_REACT_URL;

  const suggestions = [
    "Try the next one with different lighting",
    "Remember to use flash",
    "Focus on the subject",
    "Ensure the device is centered",
    "Looks great!",
  ];

  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //       <Text style={{ fontSize: 20, marginTop: 15 }}>Uploading Images...</Text>
  //     </View>
  //   );
  // }
  const pickImage = async (index: number) => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        alert("Camera permission is required to take a photo.");
        return;
      }
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"], // Fixed mediaTypes
      allowsEditing: true,
      quality: 1,
      aspect: [8, 2],
    });

    if (!result.canceled) {
      const newImages = [...images];
      newImages[index] = result.assets[0].uri;
      setImages(newImages);
      Toast.show({
        type: "info",
        text1: "Photo Added",
        text1Style: { fontSize: 15, color: "gray" },
        text2: suggestions[index],
        text2Style: { fontWeight: "bold", fontSize: 13, color: "#000" },
        position: "bottom",
      });
    }
  };

  const uploadImages = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      const imagePromises = images.map(async (uri) => {
        if (uri) {
          formData.append("images", {
            uri: uri,
            type: "image/jpeg",
            name: `photo-${Date.now()}.jpg`,
          } as any);
        }
      });

      await Promise.all(imagePromises);

      const data = await fetch(`http://${YOUR_URL}:3000`, {
        method: "POST",
        body: formData,
      });

      const response = await data.json();
      console.log(response);
      if (response.status === "success") {
        await AsyncStorage.setItem("data", JSON.stringify(response));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      router.push("/results");
    }
  };

  function handleDelete(idx: number) {
    const updatedImages = [...images];
    updatedImages[idx] = "";
    setImages(updatedImages);

    Toast.show({
      type: "info",
      text1: "Photo Deleted",
      text2: "The photo has been removed.",
      position: "bottom",
    });
  }

  async function handleNext() {
    const uploadedImagesCount = images.filter((uri) => uri !== "").length;

    if (uploadedImagesCount < 5) {
      alert("Upload 5 photos to continue.");
      return;
    } else await uploadImages();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push("/carousel")}
          >
            <Text style={styles.buttonText}>Home</Text>
            <MaterialIcons name="arrow-back" size={26} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text>.</Text>
          <Ionicons name="images-outline" size={55} color="black" />
        </View>
        <Text style={styles.header}>
          Capture 5 photos of your Cleancard Device
        </Text>
        <View style={styles.gridContainer}>
          {images.map((imageUri: string | null, idx: number) => (
            <View key={idx} style={styles.imageBox}>
              {imageUri ? (
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: imageUri }} style={styles.image} />
                  <Pressable
                    style={styles.deleteButton}
                    onPress={() => handleDelete(idx)}
                  >
                    <Text style={styles.deleteText}>
                      <Feather name="x-circle" size={36} color="white" />
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  style={styles.uploadBox}
                  onPress={() => pickImage(idx)}
                >
                  <Text style={styles.uploadText}>+</Text>
                </Pressable>
              )}
            </View>
          ))}
        </View>
        <View style={styles.tipContainer}>
          <Text style={styles.tip}>Tap any square to upload a photo.</Text>
        </View>
        <TouchableOpacity style={styles.floatingButton} onPress={handleNext}>
          <AntDesign name="arrowright" size={30} color="white" />
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
          <Text
            style={{
              fontSize: 25,
              marginTop: 15,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Uploading Images...
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Images;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  titleContainer: {
    position: "absolute",
    alignItems: "flex-start",
    width: "100%",
    top: 50,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#4b82dd",
    marginBottom: -30,
  },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 15,
    position: "absolute",
  },
  imageBox: {
    width: "30%",
    aspectRatio: 1,
    marginBottom: 15,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    position: "absolute",
    zIndex: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backButton: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  uploadBox: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
    borderColor: "#a9a9a9",
    borderWidth: 1.5,
    borderStyle: "dashed",
  },
  uploadText: {
    color: "#a9a9a9",
    fontSize: 50,
  },
  deleteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: 9,
    padding: 2,
  },
  backButtonContainer: {
    position: "absolute",
    width: "100%",
    top: -5,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  deleteText: {
    color: "white",
    fontSize: 10,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  header: {
    position: "absolute",
    fontWeight: "bold",
    fontSize: 30,
    top: "17%",
    textAlign: "left",
    width: "80%",
    left: 30,
    paddingRight: 25,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 40,
    backgroundColor: "#4b82dd",
    borderRadius: 35,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  tipContainer: {
    position: "absolute",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    bottom: "22%",
  },
  tip: {
    fontSize: 18,
  },
});

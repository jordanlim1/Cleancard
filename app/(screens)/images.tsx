import { Button, StyleSheet, Text, View, Image, Pressable } from "react-native";
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

const Images = () => {
  const [images, setImages] = useState<string[]>(["", "", "", "", ""]);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  const suggestions = [
    "Try the next one with different lighting",
    "Use flash for the next one",
    "Focus on the subject",
    "Ensure the device is centered",
    "Looks great!",
  ];

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
    }

    Toast.show({
      type: "info",
      text1: "Photo Added",
      text1Style: { fontSize: 15, color: "gray" }, // Customize font weight and color for text2
      text2: suggestions[index],
      text2Style: { fontWeight: "bold", fontSize: 13, color: "#000" }, // Customize font weight and color for text2
      position: "bottom",
    });
  };

  const addImages = async () => {
    try {
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

      const response = await fetch("http://192.168.137.245:3000/query/images", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return true;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
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
    }

    const uploadImages = await addImages();
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
          <Text style={styles.title}>Images</Text>
        </View>
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
                      <Feather name="x-circle" size={36} color="black" />
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  style={styles.uploadBox}
                  onPress={() => pickImage(idx)}
                >
                  <Text style={styles.uploadText}>Upload Image</Text>
                </Pressable>
              )}
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.floatingButton} onPress={handleNext}>
          <AntDesign name="arrowright" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Images;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  titleContainer: {
    position: "absolute",
    alignItems: "flex-start",
    width: "100%",
    top: 50,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
    justifyContent: "space-evenly",
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
  },
  imageBox: {
    width: "45%",
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
    backgroundColor: "#ddd",
    borderRadius: 8,
  },
  uploadText: {
    color: "#333",
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
});

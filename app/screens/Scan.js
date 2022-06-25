import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import SubmitButton from "../components/button/SubmitButton";
import colors from "../config/colors";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";

function Scan({ navigation }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [1, 1],
      quality: 1,
    });
    // Explore the result

    if (!result.cancelled) {
      setImage(result);
      // console.log(result);
    }
  };

  const handlePress = () => {
    if (!image) setImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => setImage(null) },
        { text: "No" },
      ]);
  };

  const uploadImage = async () => {
    try {
      setLoading(true);

      const manipResult = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: 201, height: 250 } }],
        { format: "jpeg", base64: true }
      );

      fetch("https://codesmartacademy.com/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file: `${manipResult.base64}`, chance: 1 }),
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          // console.log("Success:", data);
          navigation.navigate("Result", data.data);
          setImage("");
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error:", error);
        });
    } catch (err) {
      console.log("ERROR", err);
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text>Instructions:</Text>
        <Text>1. Snap a clean picture without glare or blur</Text>
        <Text>2. Crop the image to the size of the fingerprint</Text>
        <View style={styles.imageContainer}>
          {image ? (
            <>
              <View style={styles.closeIcon}>
                <TouchableWithoutFeedback onPress={handlePress}>
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={40}
                    color={colors.danger}
                  />
                </TouchableWithoutFeedback>
              </View>
              <Image source={{ uri: image.uri }} style={styles.image} />
            </>
          ) : (
            <View style={styles.scanContainer}>
              <Text>Press on button to Capture</Text>
            </View>
          )}
        </View>

        {!image ? (
          <SubmitButton
            title="Capture"
            // color="secoundary"
            width="70%"
            onPress={openCamera}
          />
        ) : (
          <SubmitButton
            title="Process Captured Image"
            color="green"
            loading={loading}
            onPress={uploadImage}
            // onPress={() => {
            //   uploadImage();
            //   // navigation.navigate("Result", pickedImagePath);
            //   // setPickedImagePath("");
            // }}
          />
        )}
      </View>
    </ScrollView>
  );
}

export default Scan;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#eee",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  imageContainer: {
    padding: 20,
  },
  image: {
    width: 300,
    height: 360,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: colors.white,
    resizeMode: "cover",
  },
  scanContainer: {
    width: 300,
    height: 360,
    borderRadius: 10,
    backgroundColor: "#9e9e9e",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    position: "absolute",
    zIndex: 3,
    marginLeft: 280,
  },
});

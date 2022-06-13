import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import SubmitButton from "../components/button/SubmitButton";
import colors from "../config/colors";

function Scan({ navigation }) {
  const [pickedImagePath, setPickedImagePath] = useState("");
  // This function is triggered when the "Open camera" button pressed

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    // Explore the result
    // console.log(result);
    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      // console.log(result.uri);
    }
  };

  const handlePress = () => {
    if (!pickedImagePath) setPickedImagePath();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => setPickedImagePath(null) },
        { text: "No" },
      ]);
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {pickedImagePath ? (
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
              <Image source={{ uri: pickedImagePath }} style={styles.image} />
            </>
          ) : (
            <View style={styles.scanContainer}>
              <Text>Press on button to Capture</Text>
            </View>
          )}
        </View>

        {!pickedImagePath ? (
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
            onPress={() => {
              navigation.navigate("Result", pickedImagePath);
              setPickedImagePath("");
            }}
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

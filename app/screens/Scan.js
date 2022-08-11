import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Alert,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import SubmitButton from "../components/button/SubmitButton";
import colors from "../config/colors";
import * as FileSystem from 'expo-file-system'
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";

const {width,height} = Dimensions.get("screen");

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
      base64: true,
      quality: 1
      
    });
    // Explore the result

    if (!result.cancelled) {
      setImage(result);
      // console.log(result);
    }
  };

  const openLibrary = async () => {
    // Ask the user for the permission to access the camera
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 1
      
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
     
      // const manipResult = await ImageManipulator.manipulateAsync(
      //   image.uri,
      //   { format: "jpeg", base64: true }
      // );
      const manipResult = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: 1024, height: 767 } }],
        { format: 'jpeg'}
    );
      //const formData = new FormData;
      //formData.append("image",image.uri.replace("file:///","file://"))

      //console.log(image.uri.replace("file:///","file://"))
      // const response = await axios({
      //   method: "POST",
      //   url: "https://fingerauth.link/upload",
      //   data: formData,
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      // //const out = await axios.post("https://fingerauth.link/upload",formData,{headers:{"Content-Type": "multipart/form-data"}})
      // console.log(response)
      var formdata = new FormData();
      formdata.append("image",manipResult.uri.replace("file:///","file://"));

      const file = {
        uri:manipResult.uri,             // e.g. 'file:///path/to/file/image123.jpg'
        name:"image3.jpg",            // e.g. 'image123.jpg',
        type:"image/jpg"             // e.g. 'image/jpg'
      }
      
      const body = new FormData()
      body.append('image', file)
      
      fetch("https://fingerauth.link/upload", {
        timeout:360,
        method: 'POST',
        body
      }).then((response) => {
        return response.json()
        })
        .then((data) => {
          setLoading(false);
          console.log("Success:", data);
          if(data.data === -1){
            setLoading(false)
            Alert.alert("Unable to extract fingerprint fetures from image. Please capture an image with clear fingerprints")
          }else{
            navigation.navigate("Result", data.data);
          }
         
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
    // finally{
    //   setLoading(false)
    // }
  };

  return (
    <ScrollView style={styles.mainContainer} contentContainerStyle={{height:height}}>
      <View style={styles.container}>
        <Text>Instructions:</Text>
        <Text>1. Snap a clean picture without glare or blur</Text>
       
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
          <View style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center',flexDirection:'column',justifyContent:'space-evenly'}}>
          <SubmitButton
            title="Capture"
            // color="secoundary"
            width="70%"
            onPress={openCamera}
          />
          <SubmitButton
          title="Pick Image"
          // color="secoundary"
          width="70%"
          onPress={openLibrary}
          />
          </View>
        ) : (
          <SubmitButton
            title="Process Captured Image"
            color="green"
            loading={loading}
            onPress={uploadImage}
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
    //height: height + 100
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
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

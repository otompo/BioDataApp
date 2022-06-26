import React, { useState } from "react";
import { View, StyleSheet, Text, Alert, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppTextInput from "../components/AppTextInput";
import SubmitButton from "../components/button/SubmitButton";
import ImageInputList from "../components/ImageInputList";
import * as ImageManipulator from "expo-image-manipulator";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const key = 'authorizer'

function Settings(props) {
  const [name, setName] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [imageUris, setImageUris] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null)

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
      return true
    } catch (e) {
      console.log("Error saving data")
      return false
      // saving error
    }
  }

  
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    console.log(jsonValue.name)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log("Error retrieving data",e)
    // error reading value
    return false
  }
}

  React.useEffect(()=>{
    getData().then(resp=>{
      if(resp){
        setUserData(resp)
      }
    })
  },[loading])


  const handleAdd = (uri,file) => {
    //console.log(uri)
    setImageUris([...imageUris, {uri,file}]);
  };
  const handleRemove = (uri) => {
    setImageUris(imageUris.filter((imageUri) => imageUri.uri !== uri));
  };
  //TODO: the server URL and other static constants can be added to an env file
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const manipResult = await ImageManipulator.manipulateAsync(
        imageUris[0].file,
        [{ resize: { width: 201, height: 250 } }],
        { format: "jpeg", base64: true }
      );

      fetch("https://codesmartacademy.com/upload/authorize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file: `${manipResult.base64}`, chance: 1 }),
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
           console.log("Success:", data);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error:", error);
        });

      //after uploading then you send the user details to the server
      storeData({name,contactNum,imageUris}).then(resp=>{
        if(resp){
         // setLoading(false)
        }
      }).catch(err=>{
        Alert.alert("Error saving user data. Only image uploaded")
      })
      // const { data } = axios.post(
      //   `https://43ef-41-66-199-195.ngrok.io/api/users`,
      //   {
      //     name,
      //     contactNum,
      //     imageUris,
      //   }
      // );
      // setName("");
      // setContactNum("");
      // setImageUris([]);
      // setLoading(false);
      // alert("success");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      <View>
        <ImageInputList
          imageUris={imageUris}
          onAddImage={handleAdd}
          onRemoveImage={handleRemove}
        />
      </View>

      <View style={{ marginVertical: 100 }}>
        <AppTextInput
          autoCapitalize="words"
          autoCorrect={false}
          icon="account"
          placeholder="Name..."
          value={name}
          setValue={setName}
        />

        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="phone"
          placeholder="Contact No..."
          keyboardType="numeric"
          value={contactNum}
          setValue={setContactNum}
        />

        <View>
          <SubmitButton
            title="Add User"
            onPress={handleSubmit}
            loading={loading}
          />
        </View>

        <Text style={{marginVertical:10}}>CURRENT USER DATA</Text>
        <View></View>
        {userData &&
        <View>
          <Text>{userData.name}</Text>
          <Text>{userData.contactNum}</Text>
          <Image source={{ uri: userData.imageUris[0].uri }} style={styles.image} />
        </View>
        }
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 7
  },
});

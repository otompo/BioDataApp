import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppTextInput from "../components/AppTextInput";
import SubmitButton from "../components/button/SubmitButton";
import ImageInputList from "../components/ImageInputList";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";

function Settings(props) {
  const [name, setName] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [imageUris, setImageUris] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAdd = (uri) => {
    setImageUris([...imageUris, uri]);
  };
  const handleRemove = (uri) => {
    setImageUris(imageUris.filter((imageUri) => imageUri !== uri));
  };
  //TODO: the server URL and other static constants can be added to an env file
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const manipResult = await ImageManipulator.manipulateAsync(
        imageUris[0],
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
          // console.log("Success:", data);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error:", error);
        });

      //after uploading then you send the user details to the server

      const { data } = axios.post(
        `https://43ef-41-66-199-195.ngrok.io/api/users`,
        {
          name,
          contactNum,
          imageUris,
        }
      );
      setName("");
      setContactNum("");
      setImageUris([]);
      setLoading(false);
      alert("success");
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
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

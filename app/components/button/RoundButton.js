import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

function RoundButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="magnify" size={40} color="#fff" />
      </View>
    </TouchableOpacity>
  );
}

export default RoundButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4C044C",
    borderColor: "#FFF",
    height: 80,
    width: 80,
    borderWidth: 5,
    borderRadius: 40,
    bottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import colors from "../../config/colors";

function SubmitButton({
  title,
  loading,
  color = "primary",
  onPress,
  disabled,
  width,
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={disabled ? 0.5 : 1}
      style={[styles.button, { backgroundColor: colors[color], width: width }]}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {" "}
        {loading ? <ActivityIndicator size="large" color="white" /> : title}
      </Text>
      {/* <Text style={styles.text}>{loading ? "Please wait..." : title}</Text> */}
    </TouchableOpacity>
  );
}

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "60%",
    // marginVertical: 10,
    marginTop: 20,
  },
  text: {
    color: colors.white,
    textTransform: "uppercase",
  },
});

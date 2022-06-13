import React, { useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
import { AuthContext } from "../../context/authContext";
import { useNavigation } from "@react-navigation/native";
import colors from "../../config/colors";

function HeaderTopLeft() {
  const [state, setState] = useContext(AuthContext);

  const handleAlert = async () => {
    alert("Please Coming soon");
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logot.png")}
        style={{
          width: 120,
          height: 55,
        }}
      />
      {/* <Text style={styles.text}>Edwom</Text> */}
    </View>
  );
}

export default HeaderTopLeft;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    //   marginVertical: 15,
    marginBottom: 15,
    // marginHorizontal: 110,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
    marginTop: 10,
  },
  badgeStyle: {
    elevation: 6,
    position: "absolute",
    bottom: 10,
    right: 11,
  },
});

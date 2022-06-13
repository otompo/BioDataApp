import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ListItems from "../components/ListItem";
import colors from "../config/colors";
import * as Progress from "react-native-progress";

function Result({ route }) {
  const pickedImagePath = route.params;

  const [matchProgress, setMatchProgress] = useState("");
  const [notMatchProgress, setNotMatchProgress] = useState("");
  const [progress, setProgress] = useState(0.2);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.dataScan}>
        <Text>{pickedImagePath}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Progress.Bar
          animated={true}
          color={colors.green}
          progress={progress}
          width={200}
        />
      </View>
      <View>
        <ListItems date="16/10/2022" match="match" percent="90%" />
        <ListItems
          date="16/10/2022"
          match="not match"
          percent="30%"
          bordercolor="danger"
        />
      </View>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="check-circle"
          size={40}
          color={colors.green}
        />
        <MaterialCommunityIcons
          name="close-circle"
          size={40}
          color={colors.danger}
        />
      </View>
    </SafeAreaView>
  );
}

export default Result;

const styles = StyleSheet.create({
  // mainContainer: {
  //   flex: 1,
  //   backgroundColor: "#eeeff00",
  // },
  dataScan: {
    backgroundColor: colors.light,
    height: "50%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

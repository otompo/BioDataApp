import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ListItems from "../components/ListItem";
import colors from "../config/colors";
import * as Progress from "react-native-progress";
import axios from "axios";
import moment from "moment";

function Result({ route }) {
  const data = route.params;
  let file = data;
  let formdata = new FormData();
  const chance = 1;
  formdata.append(file, chance);
  // console.log(formdata);
  const [matchProgress, setMatchProgress] = useState("");
  const [scanDate, setScanDate] = useState(new Date());
  const [notMatchProgress, setNotMatchProgress] = useState("");
  const [progress, setProgress] = useState(0.2);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.dataScan}>
        <Text
          style={{ fontSize: 50, fontWeight: "700", fontStyle: "italic" }}
        >{`${data?.toFixed(0)}%`}</Text>
      </View>

      {data && data >= 30 ? (
        <View>
          <ListItems
            date={`${moment(scanDate).format("ll")}`}
            match="Match"
            percent={`${data.toFixed(0)}%`}
          />
        </View>
      ) : (
        <ListItems
          date={`${moment(scanDate).format("ll")}`}
          match="Not Match"
          percent={data}
          bordercolor="danger"
        />
      )}
      <View style={styles.iconContainer}>
        {data && data >= 30 ? (
          <MaterialCommunityIcons
            name="check-circle"
            size={40}
            color={colors.green}
          />
        ) : (
          <MaterialCommunityIcons
            name="close-circle"
            size={40}
            color={colors.danger}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default Result;

const styles = StyleSheet.create({
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

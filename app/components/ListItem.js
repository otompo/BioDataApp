import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import colors from "../config/colors";

function ListItems({ date, match, percent, bordercolor }) {
  return (
    <View style={[styles.container, { borderColor: colors[bordercolor] }]}>
      <View>
        <Text style={styles.innerText}>{date}</Text>
      </View>
      <View>
        <Text style={styles.innerText}>{match}</Text>
      </View>
      <View>
        <Text style={styles.innerText}>{percent}</Text>
      </View>
    </View>
  );
}

export default ListItems;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    borderRadius: 15,
    borderWidth: 3,
    borderColor: colors.green,
    backgroundColor: colors.light,
  },
  innerText: {
    padding: 10,
    color: colors.dark,
  },
});

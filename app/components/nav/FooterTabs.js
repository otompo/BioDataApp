import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import { Divider } from "react-native-elements";

export const Tabs = ({ title, icon, screenName, handlePress, routeName }) => {
  const activeScreenColor = screenName === routeName && `${"#fff"}`;

  return (
    <TouchableOpacity onPress={handlePress}>
      <>
        <MaterialCommunityIcons
          name={icon}
          size={25}
          style={{ marginBottom: 3, alignSelf: "center" }}
          color={activeScreenColor}
        />
        <Text light style={{ color: activeScreenColor }}>
          {title}
        </Text>
      </>
    </TouchableOpacity>
  );
};

function FooterTabs() {
  const navigation = useNavigation();
  const route = useRoute();
  // console.log(navigation);
  return (
    <>
      {/* <Divider width={1} /> */}
      <View style={styles.footerStyle}>
        <Tabs
          title="Home"
          icon="home"
          screenName="Home"
          routeName={route.name}
          handlePress={() => navigation.navigate("Home")}
        />

        <Tabs
          title="Profile"
          icon="account-circle"
          screenName="Profile"
          routeName={route.name}
          handlePress={navigation.navigate("Profile")}
        />

        <Tabs
          title="Profile"
          icon="account-circle"
          screenName="Profile"
          routeName={route.name}
          handlePress={navigation.navigate("Profile")}
        />
      </View>
    </>
  );
}

export default FooterTabs;
const styles = StyleSheet.create({
  footerStyle: {
    flexDirection: "row",
    marginHorizontal: 30,
    // margin: 10,
    justifyContent: "space-between",
  },
  badgeStyle: {
    elevation: 5,
    position: "absolute",
    top: -8,
    left: 187,
  },
});

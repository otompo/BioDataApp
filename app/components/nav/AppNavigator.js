import React from "react";
import { StyleSheet, Text,View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Settings from "../../screens/Settings";
import Result from "../../screens/Result";
import Scan from "../../screens/Scan";
import RoundButton from "../button/RoundButton";

const Tab = createBottomTabNavigator();

function AppNavigator(props) {
  return (
    <Tab.Navigator
      initialRouteName="Scan"
      screenOptions={{
        tabBarActiveTintColor: "#f68d22",
        tabBarInactiveBackgroundColor: "#fff",
        tabBarInactiveTinColor: "#fff",
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#4C044C",
        },
        headerTitleStyle: {
          fontWeight: "200",
        },
        // headerShown: false,
      }}
    >
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="cog-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={Scan}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <RoundButton onPress={() => navigation.navigate("Scan")} />
          ),
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="magnify" size={size} color={color} />
          ),
        })}
      />

      <Tab.Screen
        name="Result"
        component={Result}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="cog-clockwise"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;

const styles = StyleSheet.create({});

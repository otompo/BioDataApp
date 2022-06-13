import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";

const Stack = createNativeStackNavigator();

export default function ScreensNav() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#FFAE00",
        },
        headerTitleStyle: {
          fontWeight: "200",
        },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "",
          headerShown: true,
        }}
      />

      {/* <Stack.Screen
        name="Market"
        component={Market}
        options={{
          title: "",
        }}
      />

      <Stack.Screen
        name="Food"
        component={Food}
        options={{
          title: "",
        }}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerShown: true,
          headerRight: () => <HeaderTabs icon="shopping-cart" />,
          headerLeft: () => <></>,
        }}
      /> */}
    </Stack.Navigator>
  );
}

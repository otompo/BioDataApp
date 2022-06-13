import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import colors from "../../config/colors";
import { Badge } from "react-native-elements";
import { CartContext } from "../../context/cartContext";

function HeaderTabs({ icon }) {
  const { stateData, dispatch } = useContext(CartContext);
  const { cart } = stateData;

  useEffect(() => {}, [cart]);

  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.navigate("CartItemDetails")}
        style={styles.iconContainer}
      >
        <Badge
          value={cart.length}
          status="error"
          containerStyle={styles.badgeStyle}
        />
        <Icon name={icon} size={25} color={colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HeaderTabs;

const styles = StyleSheet.create({
  badgeStyle: {
    elevation: 6,
    position: "absolute",
    bottom: 13,
    left: 20,
  },
  iconContainer: {
    marginRight: 30,
  },
});

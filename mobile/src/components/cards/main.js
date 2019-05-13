import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { elevationShadowStyle } from "../../util/shadow";

const MainCard = () => (
  <View style={style.card}>
    <Text>Put nearest point later</Text>
  </View>
);

const style = StyleSheet.create({
  card: {
    height: 100,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 4,
    ...elevationShadowStyle(3),
    marginBottom: 32
  }
});

export default MainCard;

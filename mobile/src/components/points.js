import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Point = ({ point = {} }) => (
  <View>
    <Text>
      {point.name} ({point.current.time})
    </Text>
    <Text>
      Depth: {point.current.depth}m /{" "}
      {point.limits[`s${point.current.status.siaga - 1 || 1}`].min}m -{" "}
      {point.current.status.label}
    </Text>
    <Text>{point.current.weatherLabel}</Text>
  </View>
);

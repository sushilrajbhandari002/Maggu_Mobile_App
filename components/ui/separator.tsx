import * as React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  style?: ViewStyle;
  decorative?: boolean; // just for parity, not used in RN
}

function Separator({
  orientation = "horizontal",
  style,
  decorative = true,
}: SeparatorProps) {
  const separatorStyle =
    orientation === "horizontal" ? styles.horizontal : styles.vertical;

  return <View style={[separatorStyle, style]} accessible={!decorative} />;
}

const styles = StyleSheet.create({
  horizontal: {
    width: "100%",
    height: 1,
    backgroundColor: "#D1D5DB", // bg-border equivalent
  },
  vertical: {
    width: 1,
    height: "100%",
    backgroundColor: "#D1D5DB", // bg-border equivalent
  },
});

export { Separator };

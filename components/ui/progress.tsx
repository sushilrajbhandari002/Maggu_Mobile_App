import * as React from "react";
import { View, StyleSheet } from "react-native";

interface ProgressProps {
  value: number; // 0 to 100
  style?: object;
  barStyle?: object;
}

function Progress({ value = 0, style, barStyle }: ProgressProps) {
  const progress = Math.min(Math.max(value, 0), 100); // clamp between 0 and 100

  return (
    <View style={[styles.root, style]}>
      <View style={[styles.indicator, { width: `${progress}%` }, barStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: 8, // same as h-2 in Tailwind
    backgroundColor: "rgba(59, 130, 246, 0.2)", // bg-primary/20
    borderRadius: 4,
    overflow: "hidden",
  },
  indicator: {
    height: "100%",
    backgroundColor: "#3b82f6", // bg-primary
  },
});

export { Progress };

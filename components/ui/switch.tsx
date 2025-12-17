import React from "react";
import { View, StyleSheet } from "react-native";
import RNESwitch from "react-native-switch";
import { useColorScheme } from "react-native";

interface SwitchProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
}

function Switch({ value = false, onValueChange }: SwitchProps) {
  const colorScheme = useColorScheme(); // light or dark

  return (
    <View style={styles.container}>
      <RNESwitch
        value={value}
        onValueChange={onValueChange}
        circleSize={20}
        barHeight={28}
        circleBorderWidth={0}
        backgroundActive="#3b82f6" // primary
        backgroundInactive={colorScheme === "dark" ? "#d1d5db80" : "#e5e7eb"} // switch-background / input/80
        circleActiveColor="#ffffff" // thumb color when checked
        circleInActiveColor={colorScheme === "dark" ? "#f9fafb" : "#ffffff"} // thumb color when unchecked
        switchLeftPx={2}
        switchRightPx={2}
        switchWidthMultiplier={2.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },
});

export { Switch };

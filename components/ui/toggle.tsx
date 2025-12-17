import React, { useState } from "react";
import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import { cn } from "./utils";

type ToggleVariant = "default" | "outline";
type ToggleSize = "default" | "sm" | "lg";

interface ToggleProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  children: React.ReactNode;
  style?: ViewStyle;
}

function Toggle({
  value,
  onValueChange,
  variant = "default",
  size = "default",
  children,
  style,
}: ToggleProps) {
  const [isOn, setIsOn] = useState(value ?? false);

  const handlePress = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onValueChange?.(newValue);
  };

  const sizeStyles = {
    default: { paddingVertical: 8, paddingHorizontal: 16 },
    sm: { paddingVertical: 6, paddingHorizontal: 12 },
    lg: { paddingVertical: 10, paddingHorizontal: 20 },
  };

  const variantStyles = {
    default: { backgroundColor: isOn ? "#3b82f6" : "transparent" },
    outline: {
      backgroundColor: isOn ? "#3b82f6" : "transparent",
      borderWidth: 1,
      borderColor: isOn ? "#3b82f6" : "#d1d5db",
    },
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.toggle, sizeStyles[size], variantStyles[variant], style]}
    >
      <Text style={{ color: isOn ? "#ffffff" : "#111827" }}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  toggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});

export { Toggle };

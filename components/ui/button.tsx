import React from "react";
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "default",
  size = "default",
  disabled = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.base,
    variantStyles[variant],
    sizeStyles[size],
    disabled && styles.disabled,
    style,
  ];

  const titleStyle = [styles.textBase, textVariantStyles[variant], textStyle];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  textBase: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  disabled: {
    opacity: 0.5,
  },
});

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  default: { backgroundColor: "#4f46e5" },
  destructive: { backgroundColor: "#dc2626" },
  outline: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#d1d5db" },
  secondary: { backgroundColor: "#6b7280" },
  ghost: { backgroundColor: "transparent" },
  link: { backgroundColor: "transparent" },
};

const textVariantStyles: Record<ButtonVariant, TextStyle> = {
  default: { color: "#ffffff" },
  destructive: { color: "#ffffff" },
  outline: { color: "#111827" },
  secondary: { color: "#f9fafb" },
  ghost: { color: "#111827" },
  link: { color: "#4f46e5", textDecorationLine: "underline" },
};

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  default: {},
  sm: { paddingHorizontal: 12, paddingVertical: 6 },
  lg: { paddingHorizontal: 20, paddingVertical: 12 },
  icon: { paddingHorizontal: 10, paddingVertical: 10 },
};

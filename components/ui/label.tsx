import * as React from "react";
import { Text, StyleSheet, TextProps } from "react-native";

interface LabelProps extends TextProps {
  disabled?: boolean;
}

function Label({ style, disabled, children, ...props }: LabelProps) {
  return (
    <Text
      style={[
        styles.label,
        disabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14, // text-sm
    lineHeight: 16, // leading-none
    fontWeight: "500", // font-medium
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // spacing between children
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Label };

import * as React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  className?: object;
}

function Input({ style, ...props }: InputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor="#9ca3af" // muted text color
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 36, // approximate h-9
    minWidth: 0,
    borderWidth: 1,
    borderColor: "#d1d5db", // border-input
    borderRadius: 8, // rounded-md
    paddingHorizontal: 12, // px-3
    paddingVertical: 4, // py-1
    fontSize: 16, // text-base
    backgroundColor: "#f9fafb", // bg-input-background
    color: "#111827", // text color
  },
  // You can add focus/invalid states dynamically via props
});

export { Input };

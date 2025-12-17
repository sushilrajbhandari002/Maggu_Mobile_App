import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { cn } from "./utils";

function Textarea({ style, ...props }: TextInputProps) {
  return (
    <TextInput
      multiline
      placeholderTextColor="#6b7280" // Approximate muted text color
      style={[styles.textarea, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  textarea: {
    minHeight: 64, // Approx min-h-16 in Tailwind (16*4=64)
    width: "100%",
    borderRadius: 8, // Rounded-md
    borderWidth: 1,
    borderColor: "#d1d5db", // border-input
    backgroundColor: "#f9fafb", // bg-input-background
    paddingHorizontal: 12, // px-3
    paddingVertical: 8, // py-2
    fontSize: 16, // base text
    color: "#111827", // text color
    textAlignVertical: "top", // Ensures text starts at top in multiline
  },
});

export { Textarea };

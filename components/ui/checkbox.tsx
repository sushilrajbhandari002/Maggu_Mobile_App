import React, { useState } from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import Svg, { Path } from "react-native-svg";

interface CheckboxProps {
  checked?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  style?: object;
}

export function Checkbox({ checked = false, onValueChange, disabled, style }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleCheckbox = () => {
    if (disabled) return;
    setIsChecked(!isChecked);
    onValueChange?.(!isChecked);
  };

  return (
    <Pressable
      onPress={toggleCheckbox}
      style={[
        styles.checkbox,
        isChecked && styles.checked,
        disabled && styles.disabled,
        style,
      ]}
    >
      {isChecked && (
        <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
          <Path
            d="M5 13l4 4L19 7"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: "#3b82f6", // primary color
    borderColor: "#3b82f6",
  },
  disabled: {
    opacity: 0.5,
  },
});

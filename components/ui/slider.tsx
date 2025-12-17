import React from "react";
import { View, StyleSheet } from "react-native";
import SliderRN from "@react-native-community/slider";

interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  onValueChange?: (value: number) => void;
  step?: number;
  vertical?: boolean;
  style?: any;
}

export const Slider = ({
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  vertical = false,
  style,
}: SliderProps) => {
  const [internalValue, setInternalValue] = React.useState(
    value ?? defaultValue ?? min
  );

  const handleChange = (val: number) => {
    setInternalValue(val);
    onValueChange?.(val);
  };

  return (
    <View
      style={[
        styles.container,
        vertical && styles.verticalContainer,
        style,
      ]}
    >
      <SliderRN
        value={internalValue}
        minimumValue={min}
        maximumValue={max}
        step={step}
        onValueChange={handleChange}
        minimumTrackTintColor="#3b82f6" // bg-primary
        maximumTrackTintColor="#e5e7eb" // bg-muted
        thumbTintColor="#ffffff" // thumb color
        style={[styles.slider, vertical && styles.verticalSlider]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    justifyContent: "center",
  },
  verticalContainer: {
    width: 40,
    height: "100%",
    justifyContent: "flex-start",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  verticalSlider: {
    width: 40,
    height: "100%",
    transform: [{ rotate: "-90deg" }],
  },
});

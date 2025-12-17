import * as React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { CircleIcon } from "lucide-react-native";

interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  style?: object;
}

interface RadioGroupItemProps {
  value: string;
  selectedValue: string;
  onSelect: (value: string) => void;
  style?: object;
}

// RadioGroup wrapper
function RadioGroup({ value, onValueChange, children, style }: RadioGroupProps) {
  return (
    <View style={[styles.group, style]}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;
        return React.cloneElement(child, {
          selectedValue: value,
          onSelect: onValueChange,
        });
      })}
    </View>
  );
}

// Individual RadioGroup item
function RadioGroupItem({ value, selectedValue, onSelect, style }: RadioGroupItemProps) {
  const isSelected = value === selectedValue;

  return (
    <Pressable
      onPress={() => onSelect(value)}
      style={[styles.item, style, isSelected && styles.itemSelected]}
    >
      {isSelected && (
        <View style={styles.indicator}>
          <CircleIcon size={12} color="#3b82f6" />
        </View>
      )}
    </Pressable>
  );
}

// Styles
const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    gap: 8, // spacing between radio items
  },
  item: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  itemSelected: {
    borderColor: "#3b82f6",
  },
  indicator: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});

export { RadioGroup, RadioGroupItem };

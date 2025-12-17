import React, { createContext, useContext } from "react";
import { View, Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import { cn } from "./utils";

type ToggleVariant = "default" | "outline";
type ToggleSize = "default" | "sm" | "lg";

interface ToggleGroupContextProps {
  variant?: ToggleVariant;
  size?: ToggleSize;
}

const ToggleGroupContext = createContext<ToggleGroupContextProps>({
  variant: "default",
  size: "default",
});

interface ToggleGroupProps extends ToggleGroupContextProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

function ToggleGroup({ variant = "default", size = "default", children, style }: ToggleGroupProps) {
  return (
    <ToggleGroupContext.Provider value={{ variant, size }}>
      <View style={[styles.group, style]}>{children}</View>
    </ToggleGroupContext.Provider>
  );
}

interface ToggleGroupItemProps {
  value?: string;
  selected?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

function ToggleGroupItem({ children, selected = false, onPress, style }: ToggleGroupItemProps) {
  const context = useContext(ToggleGroupContext);

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.item,
        context.variant === "outline" && styles.outline,
        selected && styles.selected,
        style,
      ]}
    >
      <Text>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f3f4f6", // default bg
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    backgroundColor: "#3b82f6", // primary color
  },
  outline: {
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
});

export { ToggleGroup, ToggleGroupItem };

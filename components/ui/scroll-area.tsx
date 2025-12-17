import * as React from "react";
import { ScrollView, View, StyleSheet, ViewStyle } from "react-native";

interface ScrollAreaProps {
  children: React.ReactNode;
  style?: ViewStyle;
  horizontal?: boolean;
}

interface ScrollBarProps {
  orientation?: "vertical" | "horizontal";
  style?: ViewStyle;
}

// ScrollArea wrapper
function ScrollArea({ children, style, horizontal = false }: ScrollAreaProps) {
  return (
    <View style={[styles.root, style]}>
      <ScrollView
        horizontal={horizontal}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.viewport}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {children}
      </ScrollView>
      <ScrollBar orientation={horizontal ? "horizontal" : "vertical"} />
    </View>
  );
}

// ScrollBar (visual only, optional)
function ScrollBar({ orientation = "vertical", style }: ScrollBarProps) {
  // For native, scrollbars are handled automatically. 
  // This is just a placeholder for styling purposes.
  return <View style={[orientation === "vertical" ? styles.vScroll : styles.hScroll, style]} />;
}

// Styles
const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: "relative",
  },
  viewport: {
    flex: 1,
    borderRadius: 8,
    outlineStyle: "none",
  },
  vScroll: {
    position: "absolute",
    width: 4,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#d1d5db",
    borderRadius: 2,
  },
  hScroll: {
    position: "absolute",
    height: 4,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#d1d5db",
    borderRadius: 2,
  },
});

export { ScrollArea, ScrollBar };

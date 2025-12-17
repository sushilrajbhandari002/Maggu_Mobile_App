import * as React from "react";
import { View, Modal, Pressable, StyleSheet } from "react-native";

interface PopoverProps {
  children: React.ReactNode;
}

interface PopoverTriggerProps {
  children: React.ReactNode;
}

interface PopoverContentProps {
  children: React.ReactNode;
  style?: object;
}

// Root Popover container
function Popover({ children }: PopoverProps) {
  return <>{children}</>;
}

// Trigger for Popover
function PopoverTrigger({ children, onPress }: PopoverTriggerProps & { onPress?: () => void }) {
  return <Pressable onPress={onPress}>{children}</Pressable>;
}

// Popover Content (displayed as a modal)
function PopoverContent({ children, style }: PopoverContentProps) {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Pressable onPress={() => setVisible(true)}>{children}</Pressable>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={[styles.content, style]}>{children}</View>
        </Pressable>
      </Modal>
    </>
  );
}

// Optional anchor placeholder
function PopoverAnchor({ children }: { children: React.ReactNode }) {
  return <View>{children}</View>;
}

// Styles
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: 280, // approx w-72
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };

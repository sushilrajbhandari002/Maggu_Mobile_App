import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Modal, ScrollView } from "react-native";

type DropdownMenuProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  visible: boolean;
  onClose: () => void;
};

export function DropdownMenu({ children, trigger, visible, onClose }: DropdownMenuProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.menu}>{children}</View>
      </Pressable>
    </Modal>
  );
}

export function DropdownMenuTrigger({ children, onPress }: { children: React.ReactNode; onPress: () => void }) {
  return <Pressable onPress={onPress}>{children}</Pressable>;
}

export function DropdownMenuContent({ children, style }: { children: React.ReactNode; style?: object }) {
  return <ScrollView style={[styles.content, style]}>{children}</ScrollView>;
}

export function DropdownMenuItem({
  children,
  onPress,
  style,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  style?: object;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.item, pressed && styles.itemPressed, style]}>
      {typeof children === "string" ? <Text>{children}</Text> : children}
    </Pressable>
  );
}

export function DropdownMenuLabel({ children, style }: { children: React.ReactNode; style?: object }) {
  return <Text style={[styles.label, style]}>{children}</Text>;
}

export function DropdownMenuSeparator() {
  return <View style={styles.separator} />;
}

export function DropdownMenuCheckboxItem({
  children,
  checked,
  onPress,
}: {
  children: React.ReactNode;
  checked: boolean;
  onPress?: () => void;
}) {
  return (
    <DropdownMenuItem onPress={onPress}>
      <Text>{checked ? "✔ " : ""}</Text>
      {children}
    </DropdownMenuItem>
  );
}

export function DropdownMenuRadioItem({
  children,
  selected,
  onPress,
}: {
  children: React.ReactNode;
  selected: boolean;
  onPress?: () => void;
}) {
  return (
    <DropdownMenuItem onPress={onPress}>
      <Text>{selected ? "● " : ""}</Text>
      {children}
    </DropdownMenuItem>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    minWidth: 200,
    maxHeight: "80%",
  },
  content: {
    flexGrow: 0,
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  itemPressed: {
    backgroundColor: "#eee",
  },
  label: {
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 4,
  },
});

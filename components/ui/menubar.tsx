import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal, ScrollView } from "react-native";

interface MenubarProps {
  style?: object;
  children: React.ReactNode;
}

interface MenubarItemProps {
  title: string;
  onPress?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

// Menubar container
function Menubar({ style, children }: MenubarProps) {
  return <View style={[styles.menubar, style]}>{children}</View>;
}

// Menu item (trigger + optional submenu)
function MenubarItem({ title, onPress, children, disabled }: MenubarItemProps) {
  const [visible, setVisible] = useState(false);

  const hasSubmenu = !!children;

  return (
    <>
      <Pressable
        style={[styles.item, disabled && styles.disabled]}
        onPress={() => (hasSubmenu ? setVisible(true) : onPress?.())}
        disabled={disabled}
      >
        <Text style={styles.itemText}>{title}</Text>
        {hasSubmenu && <Text style={styles.chevron}>›</Text>}
      </Pressable>

      {hasSubmenu && (
        <Modal
          transparent
          visible={visible}
          animationType="fade"
          onRequestClose={() => setVisible(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setVisible(false)}>
            <View style={styles.submenu}>{children}</View>
          </Pressable>
        </Modal>
      )}
    </>
  );
}

// Checkbox item
function MenubarCheckboxItem({ title, checked, onPress }: { title: string; checked: boolean; onPress: () => void }) {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Text style={styles.itemText}>{checked ? "✓ " : ""}{title}</Text>
    </Pressable>
  );
}

// Radio group
function MenubarRadioGroup({ children }: { children: React.ReactNode }) {
  return <View>{children}</View>;
}

// Separator
function MenubarSeparator() {
  return <View style={styles.separator} />;
}

// Label
function MenubarLabel({ title }: { title: string }) {
  return <Text style={styles.label}>{title}</Text>;
}

// Submenu content
function MenubarSub({ children }: { children: React.ReactNode }) {
  return <View style={styles.submenu}>{children}</View>;
}

const styles = StyleSheet.create({
  menubar: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6", // bg-background
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    padding: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 4,
  },
  itemText: {
    fontSize: 14,
  },
  chevron: {
    fontSize: 14,
    marginLeft: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  separator: {
    height: 1,
    backgroundColor: "#d1d5db",
    marginVertical: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  submenu: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 4,
    margin: 20,
    maxHeight: 300,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export {
  Menubar,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarSub,
};

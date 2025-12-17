import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { CheckIcon, Circle } from "lucide-react-native"; // Use lucide-react-native

interface ContextMenuItemType {
  id: string;
  label: string;
  type?: "default" | "checkbox" | "radio" | "separator";
  checked?: boolean;
  onPress?: () => void;
}

interface ContextMenuProps {
  visible: boolean;
  onClose: () => void;
  items: ContextMenuItemType[];
  position?: { x: number; y: number }; // optional touch position
}

export function ContextMenu({
  visible,
  onClose,
  items,
  position,
}: ContextMenuProps) {
  const renderItem = ({ item }: { item: ContextMenuItemType }) => {
    if (item.type === "separator") {
      return <View style={styles.separator} />;
    }

    return (
      <Pressable
        style={styles.item}
        onPress={() => {
          item.onPress?.();
          onClose();
        }}
      >
        {item.type === "checkbox" && item.checked && (
          <CheckIcon size={16} color="black" style={styles.icon} />
        )}
        {item.type === "radio" && item.checked && (
          <Circle size={12} color="black" style={styles.icon} />
        )}
        <Text>{item.label}</Text>
      </Pressable>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View
          style={[
            styles.menu,
            position ? { top: position.y, left: position.x } : undefined,
          ]}
        >
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  menu: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 6,
    paddingVertical: 4,
    minWidth: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 4,
  },
  icon: {
    marginRight: 8,
  },
});

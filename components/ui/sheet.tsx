import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { X } from "lucide-react-native";

interface SheetProps {
  isVisible: boolean;
  onClose: () => void;
  side?: "top" | "right" | "bottom" | "left";
  children: React.ReactNode;
}

function Sheet({ isVisible, onClose, side = "right", children }: SheetProps) {
  const modalStyle = [
    styles.sheetContent,
    side === "right" && styles.right,
    side === "left" && styles.left,
    side === "top" && styles.top,
    side === "bottom" && styles.bottom,
  ];

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      backdropOpacity={0.5}
      animationInTiming={500}
      animationOutTiming={300}
      useNativeDriver
    >
      <View style={modalStyle}>
        {children}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X width={24} height={24} color="#000" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

function SheetHeader({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={[styles.header, style]}>{children}</View>;
}

function SheetFooter({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

function SheetTitle({ children, style }: { children: React.ReactNode; style?: any }) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

function SheetDescription({ children, style }: { children: React.ReactNode; style?: any }) {
  return <Text style={[styles.description, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  sheetContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    maxHeight: "90%",
  },
  right: { alignSelf: "flex-end", width: "75%", height: "100%" },
  left: { alignSelf: "flex-start", width: "75%", height: "100%" },
  top: { alignSelf: "stretch", height: "50%" },
  bottom: { alignSelf: "stretch", height: "50%" },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 4,
  },
  header: {
    marginBottom: 16,
  },
  footer: {
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
  },
});

export { Sheet, SheetHeader, SheetFooter, SheetTitle, SheetDescription };

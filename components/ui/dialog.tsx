import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { X } from "lucide-react-native"; // react-native version of lucide

interface DialogProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Dialog({ visible, onClose, children }: DialogProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          {children}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X width={20} height={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export function DialogHeader({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: object;
}) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function DialogFooter({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: object;
}) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

export function DialogTitle({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: object;
}) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

export function DialogDescription({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: object;
}) {
  return <Text style={[styles.description, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  content: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    opacity: 0.7,
  },
  header: {
    marginBottom: 12,
    alignItems: "center",
  },
  footer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});

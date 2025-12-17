import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from "lucide-react-native";

interface SelectProps {
  children?: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  style?: ViewStyle;
}

interface SelectItemProps {
  label: string;
  value: string;
  onPress?: (value: string) => void;
  isSelected?: boolean;
}

// Select container
function Select({ value, onValueChange, placeholder, style, children }: SelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setOpen((prev) => !prev)}
      >
        <Text style={styles.triggerText}>{value || placeholder || "Select"}</Text>
        <ChevronDownIcon size={16} />
      </TouchableOpacity>

      <Modal transparent visible={open} animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={styles.dropdown}>
            {children}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

// Individual select item
function SelectItem({ label, value, onPress, isSelected }: SelectItemProps) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onPress && onPress(value)}
    >
      <Text style={styles.itemText}>{label}</Text>
      {isSelected && <CheckIcon size={16} />}
    </TouchableOpacity>
  );
}

// Optional group / label / separator
function SelectLabel({ children }: { children: React.ReactNode }) {
  return <Text style={styles.label}>{children}</Text>;
}

function SelectSeparator() {
  return <View style={styles.separator} />;
}

// Styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  trigger: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  triggerText: {
    fontSize: 16,
    color: "#111827",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 6,
    maxHeight: 300,
    minWidth: 200,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  itemText: {
    fontSize: 16,
    color: "#111827",
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  separator: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 4,
  },
});

export { Select, SelectItem, SelectLabel, SelectSeparator };

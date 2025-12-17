import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { SearchIcon } from "lucide-react-native"; // if using lucide-react-native

interface CommandDialogProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  commands: { id: string; label: string }[];
  onSelect: (item: { id: string; label: string }) => void;
}

export function CommandDialog({
  visible,
  onClose,
  title = "Command Palette",
  description = "Search for a command to run...",
  commands,
  onSelect,
}: CommandDialogProps) {
  const [query, setQuery] = useState("");

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.inputWrapper}>
            <SearchIcon size={20} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Type a command..."
              value={query}
              onChangeText={setQuery}
            />
          </View>
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            style={styles.list}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <Pressable
                style={styles.item}
                onPress={() => {
                  onSelect(item);
                  setQuery("");
                  onClose();
                }}
              >
                <Text>{item.label}</Text>
              </Pressable>
            )}
            ListEmptyComponent={
              <Text style={styles.empty}>No commands found</Text>
            }
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  description: { fontSize: 14, color: "gray", marginBottom: 8 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 6,
    paddingHorizontal: 8,
    marginBottom: 8,
    height: 40,
  },
  input: { flex: 1, marginLeft: 8, height: "100%" },
  list: { maxHeight: 300 },
  item: { paddingVertical: 8, paddingHorizontal: 4 },
  empty: { textAlign: "center", marginTop: 20, color: "gray" },
});

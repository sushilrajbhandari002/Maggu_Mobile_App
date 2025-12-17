import React, { useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet, ScrollView } from "react-native";
import { ChevronDownIcon } from "lucide-react-native"; // Use the RN version

// Root Navigation Menu
function NavigationMenu({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={[styles.menuRoot, style]}>{children}</View>;
}

// Menu List
function NavigationMenuList({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={[styles.menuList, style]}>{children}</View>;
}

// Menu Item (trigger + optional submenu)
function NavigationMenuItem({ title, children }: { title: string; children?: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const hasSubmenu = !!children;

  return (
    <>
      <Pressable style={styles.menuItem} onPress={() => hasSubmenu && setVisible(true)}>
        <Text style={styles.menuItemText}>{title}</Text>
        {hasSubmenu && <ChevronDownIcon size={16} />}
      </Pressable>

      {hasSubmenu && (
        <Modal
          visible={visible}
          transparent
          animationType="fade"
          onRequestClose={() => setVisible(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setVisible(false)}>
            <View style={styles.submenu}>
              <ScrollView>{children}</ScrollView>
            </View>
          </Pressable>
        </Modal>
      )}
    </>
  );
}

// Menu Trigger (for navigation items that open submenu)
function NavigationMenuTrigger({ title, onPress }: { title: string; onPress?: () => void }) {
  return (
    <Pressable style={styles.menuTrigger} onPress={onPress}>
      <Text style={styles.menuTriggerText}>{title}</Text>
      <ChevronDownIcon size={16} />
    </Pressable>
  );
}

// Menu Content (submenu)
function NavigationMenuContent({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={[styles.menuContent, style]}>{children}</View>;
}

// Menu Link
function NavigationMenuLink({ title, onPress }: { title: string; onPress?: () => void }) {
  return (
    <Pressable style={styles.menuLink} onPress={onPress}>
      <Text style={styles.menuLinkText}>{title}</Text>
    </Pressable>
  );
}

// Menu Indicator (arrow)
function NavigationMenuIndicator() {
  return <View style={styles.menuIndicator} />;
}

// Styles
const styles = StyleSheet.create({
  menuRoot: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f9fafb",
  },
  menuList: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  menuItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuItemText: {
    fontSize: 14,
  },
  menuTrigger: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  menuTriggerText: {
    fontSize: 14,
    marginRight: 4,
  },
  menuContent: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuLink: {
    padding: 8,
  },
  menuLinkText: {
    fontSize: 14,
  },
  menuIndicator: {
    width: 10,
    height: 10,
    backgroundColor: "#d1d5db",
    transform: [{ rotate: "45deg" }],
    position: "absolute",
    top: -5,
    left: "50%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  submenu: {
    backgroundColor: "#fff",
    borderRadius: 6,
    maxHeight: 300,
    minWidth: 200,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
};

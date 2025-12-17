import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  Animated,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";

const { width, height } = Dimensions.get("window");

type DrawerProps = {
  visible: boolean;
  onClose: () => void;
  direction?: "left" | "right" | "top" | "bottom";
  children: React.ReactNode;
};

export function Drawer({
  visible,
  onClose,
  direction = "right",
  children,
}: DrawerProps) {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const getTransformStyle = () => {
    switch (direction) {
      case "left":
        return { transform: [{ translateX: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [-width, 0] }) }] };
      case "right":
        return { transform: [{ translateX: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [width, 0] }) }] };
      case "top":
        return { transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [-height, 0] }) }] };
      case "bottom":
        return { transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [height, 0] }) }] };
    }
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Animated.View style={[styles.drawer, getTransformStyle()]}>
          {children}
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

export function DrawerHeader({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function DrawerFooter({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

export function DrawerContent({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={[styles.content, style]}>{children}</View>;
};

export function DrawerTitle({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={[styles.title, style]}>{children}</View>;
};

export function DrawerDescription({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={[styles.description, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-start",
  },
  drawer: {
    backgroundColor: "white",
    maxHeight: "80%",
    width: "80%",
    alignSelf: "flex-end",
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  footer: {
    padding: 16,
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});

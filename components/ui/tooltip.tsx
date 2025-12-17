import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  Animated,
  Easing,
} from "react-native";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  delayDuration?: number; // in ms
  style?: any;
  contentStyle?: any;
}

function Tooltip({ children, content, delayDuration = 0, style, contentStyle }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [opacity] = useState(new Animated.Value(0));

  const showTooltip = () => {
    setTimeout(() => {
      setVisible(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }, delayDuration);
  };

  const hideTooltip = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 150,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  return (
    <Pressable
      onPressIn={showTooltip}
      onPressOut={hideTooltip}
      style={style}
    >
      {children}
      {visible && (
        <Modal transparent animationType="none">
          <View style={styles.overlay}>
            <Animated.View style={[styles.tooltip, contentStyle, { opacity }]}>
              <Text style={styles.tooltipText}>{content}</Text>
            </Animated.View>
          </View>
        </Modal>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  tooltip: {
    backgroundColor: "#2563eb", // primary
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    maxWidth: "80%",
    alignItems: "center",
  },
  tooltipText: {
    color: "#ffffff",
    fontSize: 12,
    textAlign: "center",
  },
});

export { Tooltip };

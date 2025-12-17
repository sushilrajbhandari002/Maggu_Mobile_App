import React, { useState, useRef, useEffect } from "react";
import { View, Pressable, Animated, StyleSheet } from "react-native";

interface CollapsibleProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface CollapsibleTriggerProps {
  children: React.ReactNode;
  onPress?: () => void;
}

interface CollapsibleContentProps {
  children: React.ReactNode;
  style?: object;
}

export function Collapsible({ children, open = false, onOpenChange }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(open);
  const animatedHeight = useRef(new Animated.Value(open ? 1 : 0)).current;

  const toggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);

    Animated.timing(animatedHeight, {
      toValue: newState ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, { isOpen, toggle, animatedHeight });
      })}
    </View>
  );
}

export function CollapsibleTrigger({
  children,
  onPress,
  isOpen,
  toggle,
}: CollapsibleTriggerProps & { isOpen?: boolean; toggle?: () => void }) {
  const handlePress = () => {
    toggle?.();
    onPress?.();
  };

  return <Pressable onPress={handlePress}>{children}</Pressable>;
}

export function CollapsibleContent({
  children,
  style,
  animatedHeight,
}: CollapsibleContentProps & { animatedHeight?: Animated.Value }) {
  const heightInterpolate = animatedHeight?.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1000], // max height, adjust or measure dynamically if needed
  });

  return (
    <Animated.View style={[{ overflow: "hidden", height: heightInterpolate }, style]}>
      {children}
    </Animated.View>
  );
}

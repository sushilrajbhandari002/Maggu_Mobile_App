import React from "react";
import { View, ViewProps, StyleSheet, Animated } from "react-native";

interface SkeletonProps extends ViewProps {
  className?: string; // optional, can be used with tailwind-rn if installed
}

export const Skeleton = ({ style, ...props }: SkeletonProps) => {
  // Animated opacity for pulse effect
  const opacity = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      {...props}
      style={[styles.skeleton, style, { opacity }]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#e0e0e0", // corresponds to bg-accent
    borderRadius: 4,
  },
});

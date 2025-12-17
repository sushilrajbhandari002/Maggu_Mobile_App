import React, { useRef, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { ArrowLeft, ArrowRight } from "lucide-react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface CarouselProps {
  children: React.ReactNode[];
  itemWidth?: number;
  itemSpacing?: number;
}

export function Carousel({
  children,
  itemWidth = SCREEN_WIDTH * 0.8,
  itemSpacing = 16,
}: CarouselProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
    onMomentumEnd: (event) => {
      const index = Math.round(event.contentOffset.x / (itemWidth + itemSpacing));
      setCurrentIndex(index);
    },
  });

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: index * (itemWidth + itemSpacing),
        animated: true,
      });
    }
  };

  const scrollPrev = () => {
    if (currentIndex > 0) scrollToIndex(currentIndex - 1);
  };

  const scrollNext = () => {
    if (currentIndex < children.length - 1) scrollToIndex(currentIndex + 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.navButton, { left: 0 }]}
        onPress={scrollPrev}
        disabled={currentIndex === 0}
      >
        <ArrowLeft color={currentIndex === 0 ? "#aaa" : "#000"} />
      </TouchableOpacity>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth + itemSpacing}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        contentContainerStyle={{ paddingHorizontal: itemSpacing / 2 }}
      >
        {children.map((child, i) => {
          const style = useAnimatedStyle(() => {
            const scale = interpolate(
              translateX.value,
              [
                (i - 1) * (itemWidth + itemSpacing),
                i * (itemWidth + itemSpacing),
                (i + 1) * (itemWidth + itemSpacing),
              ],
              [0.9, 1, 0.9],
              Extrapolate.CLAMP
            );
            return { transform: [{ scale }] };
          });

          return (
            <Animated.View
              key={i}
              style={[
                { width: itemWidth, marginHorizontal: itemSpacing / 2 },
                style,
              ]}
            >
              {child}
            </Animated.View>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        style={[styles.navButton, { right: 0 }]}
        onPress={scrollNext}
        disabled={currentIndex === children.length - 1}
      >
        <ArrowRight
          color={currentIndex === children.length - 1 ? "#aaa" : "#000"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  navButton: {
    position: "absolute",
    top: "50%",
    zIndex: 10,
    transform: [{ translateY: -16 }],
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 16,
  },
});

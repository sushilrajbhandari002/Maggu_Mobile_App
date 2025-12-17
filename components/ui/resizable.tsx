import * as React from "react";
import { View, PanResponder, StyleSheet } from "react-native";
import { GripVerticalIcon } from "lucide-react-native";

interface ResizablePanelGroupProps {
  children: React.ReactNode[];
  style?: object;
}

interface ResizablePanelProps {
  children: React.ReactNode;
  size?: number; // flex proportion
  style?: object;
}

interface ResizableHandleProps {
  onDrag?: (delta: number) => void;
  style?: object;
}

// PanelGroup manages vertical panels
function ResizablePanelGroup({ children, style }: ResizablePanelGroupProps) {
  const [sizes, setSizes] = React.useState<number[]>(
    React.Children.map(children, () => 1) || []
  );

  const handleResize = (index: number, delta: number) => {
    const total = sizes.reduce((a, b) => a + b, 0);
    const newSizes = [...sizes];
    newSizes[index] = Math.max(0.1, newSizes[index] + delta);
    newSizes[index + 1] = Math.max(0.1, newSizes[index + 1] - delta);
    setSizes(newSizes);
  };

  return (
    <View style={[styles.group, style]}>
      {React.Children.map(children, (child, index) => (
        <>
          {React.isValidElement(child) &&
            React.cloneElement(child as React.ReactElement<any>, {
              flex: sizes[index],
            })}
          {index < children.length - 1 && (
            <ResizableHandle
              onDrag={(delta) => handleResize(index, delta)}
            />
          )}
        </>
      ))}
    </View>
  );
}

// Individual Panel
function ResizablePanel({ children, flex = 1, style }: ResizablePanelProps & { flex?: number }) {
  return (
    <View style={[{ flex }, styles.panel, style]}>
      {children}
    </View>
  );
}

// Resizable Handle
function ResizableHandle({ onDrag, style }: ResizableHandleProps) {
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        onDrag && onDrag(gestureState.dy / 100); // scale delta for flex
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  return (
    <View
      {...panResponder.panHandlers}
      style={[styles.handle, style]}
    >
      <GripVerticalIcon size={16} />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  group: {
    flex: 1,
    flexDirection: "column",
  },
  panel: {
    backgroundColor: "#f3f4f6",
    overflow: "hidden",
  },
  handle: {
    height: 12,
    backgroundColor: "#d1d5db",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };

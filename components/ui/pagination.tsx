import * as React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react-native";

// Pagination container
function Pagination({ style, children }: { style?: object; children: React.ReactNode }) {
  return <View style={[styles.pagination, style]}>{children}</View>;
}

// Pagination list (content)
function PaginationContent({ style, children }: { style?: object; children: React.ReactNode }) {
  return <View style={[styles.content, style]}>{children}</View>;
}

// Pagination item wrapper
function PaginationItem({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={style}>{children}</View>;
}

// Pagination link button
type PaginationLinkProps = {
  isActive?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
};

function PaginationLink({ isActive, onPress, children, style }: PaginationLinkProps & { style?: object }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.link,
        isActive && styles.activeLink,
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

// Previous button
function PaginationPrevious({ onPress }: { onPress?: () => void }) {
  return (
    <PaginationLink onPress={onPress}>
      <ChevronLeftIcon size={16} />
      <Text style={styles.label}>Previous</Text>
    </PaginationLink>
  );
}

// Next button
function PaginationNext({ onPress }: { onPress?: () => void }) {
  return (
    <PaginationLink onPress={onPress}>
      <Text style={styles.label}>Next</Text>
      <ChevronRightIcon size={16} />
    </PaginationLink>
  );
}

// Ellipsis
function PaginationEllipsis() {
  return (
    <View style={styles.ellipsis}>
      <MoreHorizontalIcon size={16} />
      <Text style={styles.srOnly}>More pages</Text>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 8,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4, // spacing between items
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#f3f4f6",
  },
  activeLink: {
    borderWidth: 1,
    borderColor: "#3b82f6",
    backgroundColor: "#e0f2fe",
  },
  label: {
    fontSize: 14,
    marginHorizontal: 4,
  },
  ellipsis: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
  },
});

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};

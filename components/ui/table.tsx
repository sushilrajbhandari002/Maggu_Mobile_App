import React from "react";
import { View, Text, ScrollView, StyleSheet, ViewProps, TextProps } from "react-native";
import { cn } from "./utils"; // optional utility for combining styles

// Table container
function Table({ children, style, ...props }: ViewProps) {
  return (
    <ScrollView
      horizontal
      style={[{ width: "100%" }, style]}
      {...props}
    >
      <View>{children}</View>
    </ScrollView>
  );
}

// Table header
function TableHeader({ children, style, ...props }: ViewProps) {
  return (
    <View style={[styles.header, style]} {...props}>
      {children}
    </View>
  );
}

// Table body
function TableBody({ children, style, ...props }: ViewProps) {
  return (
    <View style={[styles.body, style]} {...props}>
      {children}
    </View>
  );
}

// Table footer
function TableFooter({ children, style, ...props }: ViewProps) {
  return (
    <View style={[styles.footer, style]} {...props}>
      {children}
    </View>
  );
}

// Table row
function TableRow({ children, style, ...props }: ViewProps) {
  return (
    <View style={[styles.row, style]} {...props}>
      {children}
    </View>
  );
}

// Table head (cell in header)
function TableHead({ children, style, ...props }: TextProps) {
  return (
    <Text style={[styles.headCell, style]} {...props}>
      {children}
    </Text>
  );
}

// Table cell
function TableCell({ children, style, ...props }: TextProps) {
  return (
    <Text style={[styles.cell, style]} {...props}>
      {children}
    </Text>
  );
}

// Table caption
function TableCaption({ children, style, ...props }: TextProps) {
  return (
    <Text style={[styles.caption, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
  },
  body: {},
  footer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#d1d5db",
    backgroundColor: "#f3f4f6",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headCell: {
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  cell: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  caption: {
    marginTop: 8,
    fontSize: 12,
    color: "#6b7280",
  },
});

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};

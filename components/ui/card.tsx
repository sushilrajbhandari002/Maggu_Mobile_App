import React from "react";
import { View, Text, StyleSheet, ViewProps, TextProps } from "react-native";

type CardProps = ViewProps & { children?: React.ReactNode };
type CardTextProps = TextProps & { children?: React.ReactNode };

// Utility for combining styles
const cn = (...styles: any[]) => styles.filter(Boolean);

export const Card: React.FC<CardProps> = ({ style, ...props }) => {
  return <View style={cn(styles.card, style)} {...props} />;
};

export const CardHeader: React.FC<CardProps> = ({ style, ...props }) => {
  return <View style={cn(styles.cardHeader, style)} {...props} />;
};

export const CardTitle: React.FC<CardTextProps> = ({ style, ...props }) => {
  return <Text style={cn(styles.cardTitle, style)} {...props} />;
};

export const CardDescription: React.FC<CardTextProps> = ({ style, ...props }) => {
  return <Text style={cn(styles.cardDescription, style)} {...props} />;
};

export const CardAction: React.FC<CardProps> = ({ style, ...props }) => {
  return <View style={cn(styles.cardAction, style)} {...props} />;
};

export const CardContent: React.FC<CardProps> = ({ style, ...props }) => {
  return <View style={cn(styles.cardContent, style)} {...props} />;
};

export const CardFooter: React.FC<CardProps> = ({ style, ...props }) => {
  return <View style={cn(styles.cardFooter, style)} {...props} />;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff", // replace with your theme's card bg color
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb", // example border color
    flexDirection: "column",
    gap: 12, // spacing between children (React Native 0.70+ supports `gap`)
  },
  cardHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardDescription: {
    fontSize: 14,
    color: "#6b7280", // muted text color
  },
  cardAction: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 12,
  },
});

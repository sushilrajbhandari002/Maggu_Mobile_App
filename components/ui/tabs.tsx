import React, { useState, ReactNode } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ViewProps, TextProps } from "react-native";
import { cn } from "./utils";

interface TabsProps extends ViewProps {
  children: ReactNode;
  defaultValue?: string;
}

interface TabsTriggerProps extends TextProps {
  value: string;
}

interface TabsContentProps extends ViewProps {
  value: string;
  children: ReactNode;
}

function Tabs({ children, defaultValue, style, ...props }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  // Pass active tab state to children via context
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <View style={[styles.tabs, style]} {...props}>
        {children}
      </View>
    </TabsContext.Provider>
  );
}

const TabsContext = React.createContext<{
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}>({});

function TabsList({ children, style, ...props }: ViewProps) {
  return (
    <View style={[styles.tabsList, style]} {...props}>
      {children}
    </View>
  );
}

function TabsTrigger({ value, children, style, ...props }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);

  const isActive = activeTab === value;

  return (
    <TouchableOpacity
      onPress={() => setActiveTab && setActiveTab(value)}
      style={[styles.tabTrigger, isActive && styles.tabTriggerActive, style]}
      {...props}
    >
      <Text style={[styles.tabTriggerText, isActive && styles.tabTriggerTextActive]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

function TabsContent({ value, children, style, ...props }: TabsContentProps) {
  const { activeTab } = React.useContext(TabsContext);

  if (activeTab !== value) return null;

  return (
    <View style={[styles.tabsContent, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "column",
    gap: 8,
  },
  tabsList: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 3,
  },
  tabTrigger: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  tabTriggerActive: {
    backgroundColor: "#fff",
  },
  tabTriggerText: {
    color: "#6b7280",
    fontSize: 14,
    fontWeight: "500",
  },
  tabTriggerTextActive: {
    color: "#111827",
  },
  tabsContent: {
    flex: 1,
  },
});

export { Tabs, TabsList, TabsTrigger, TabsContent };

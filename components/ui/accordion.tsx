import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { ChevronDown } from 'lucide-react-native';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionProps {
  children: React.ReactNode;
  multiple?: boolean; // allow multiple open sections
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

export function Accordion({ children }: AccordionProps) {
  return <View style={styles.accordion}>{children}</View>;
}

export function AccordionItem({ title, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={toggle} style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <ChevronDown
          size={20}
          style={{
            transform: [{ rotate: isOpen ? '180deg' : '0deg' }],
          }}
        />
      </TouchableOpacity>
      <Collapsible collapsed={!isOpen}>
        <View style={styles.content}>{children}</View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  accordion: {
    width: '100%',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB', // tailwind gray-200
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827', // tailwind gray-900
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
});

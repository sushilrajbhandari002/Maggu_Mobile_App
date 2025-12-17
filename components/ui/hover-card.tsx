import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Portal, Card, Provider } from "react-native-paper";

interface HoverCardProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
}

export default function HoverCard({ trigger, content }: HoverCardProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Provider>
      <View>
        {/* Trigger */}
        <Pressable onPress={() => setVisible(!visible)}>{trigger}</Pressable>

        {/* Content Popup */}
        <Portal>
          {visible && (
            <Card style={styles.card}>
              <Card.Content>{content}</Card.Content>
            </Card>
          )}
        </Portal>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    top: 40, // adjust based on trigger position
    left: 0,
    right: 0,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 8,
  },
});

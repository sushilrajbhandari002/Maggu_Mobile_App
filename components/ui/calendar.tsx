import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar as RNCalendar, DateData } from "react-native-calendars";
import { MaterialIcons } from "@expo/vector-icons";

type CalendarProps = {
  onDayPress?: (day: DateData) => void;
  markedDates?: Record<string, any>;
  style?: object;
  theme?: object;
};

export const Calendar: React.FC<CalendarProps> = ({
  onDayPress,
  markedDates,
  style,
  theme,
}) => {
  return (
    <View style={[styles.container, style]}>
      <RNCalendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        theme={{
          backgroundColor: "#fff",
          calendarBackground: "#fff",
          textSectionTitleColor: "#999999",
          selectedDayBackgroundColor: "#4f46e5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#4f46e5",
          dayTextColor: "#111827",
          textDisabledColor: "#d1d5db",
          dotColor: "#4f46e5",
          selectedDotColor: "#ffffff",
          arrowColor: "#4f46e5",
          monthTextColor: "#111827",
          textDayFontWeight: "400",
          textMonthFontWeight: "600",
          textDayHeaderFontWeight: "500",
          ...theme,
        }}
        renderArrow={(direction) =>
          direction === "left" ? (
            <MaterialIcons name="chevron-left" size={24} color="#4f46e5" />
          ) : (
            <MaterialIcons name="chevron-right" size={24} color="#4f46e5" />
          )
        }
        enableSwipeMonths
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

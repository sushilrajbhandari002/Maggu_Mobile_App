import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { Users, Bell, CheckSquare, FileText, Calendar as CalendarIcon } from 'lucide-react-native';
import { User } from '../../app/index';

interface TeacherOverviewSectionProps {
  user: User;
}

export function TeacherOverviewSection({ user }: TeacherOverviewSectionProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const mockStats = [
    { label: 'Total Classes', value: '5', icon: Users, color: '#dbeafe', iconColor: '#3b82f6' },
    { label: 'Total Students', value: '142', icon: Users, color: '#dcfce7', iconColor: '#16a34a' },
    { label: 'Pending Attendance', value: '3', icon: CheckSquare, color: '#ffedd5', iconColor: '#ea580c' },
    { label: 'Materials Uploaded', value: '28', icon: FileText, color: '#f3e8ff', iconColor: '#8b5cf6' },
  ];

  const mockUpcomingClasses = [
    { time: '8:00 AM', class: 'Class 10-A', subject: 'Mathematics', room: 'Room 201' },
    { time: '9:00 AM', class: 'Class 10-B', subject: 'Mathematics', room: 'Room 202' },
    { time: '10:30 AM', class: 'Class 9-A', subject: 'Mathematics', room: 'Room 201' },
    { time: '11:30 AM', class: 'Class 9-B', subject: 'Mathematics', room: 'Room 203' },
  ];

  const mockNotices = [
    { id: 1, title: 'Staff Meeting - December 15th', content: 'Monthly staff meeting scheduled at 3 PM.', date: '2025-12-10', priority: 'High' },
    { id: 2, title: 'Exam Schedule Released', content: 'Half yearly examination schedule released.', date: '2025-12-09', priority: 'Medium' },
    { id: 3, title: 'Professional Development Workshop', content: 'Workshop on modern teaching methodologies on December 20th.', date: '2025-12-08', priority: 'Medium' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 16 }}>
      {/* Stats Grid */}
      <View style={styles.grid}>
        {mockStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} style={[styles.card, { backgroundColor: stat.color }]}>
              <View style={styles.cardRow}>
                <Icon width={36} height={36} color={stat.iconColor} />
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              </View>
            </Card>
          );
        })}
      </View>

      {/* Today's Schedule */}
      <Card style={styles.card}>
        <View style={styles.sectionHeader}>
          <CalendarIcon width={20} height={20} color="#4f46e5" />
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
        </View>
        {mockUpcomingClasses.map((cls, idx) => (
          <View key={idx} style={styles.scheduleItem}>
            <View>
              <Text style={styles.scheduleTime}>{cls.time}</Text>
              <Text style={styles.scheduleSubject}>{cls.subject}</Text>
              <Text style={styles.scheduleClass}>{cls.class}</Text>
            </View>
            <Text style={styles.scheduleRoom}>{cls.room}</Text>
          </View>
        ))}
      </Card>

      {/* Notices */}
      <Card style={styles.card}>
        <View style={styles.sectionHeader}>
          <Bell width={20} height={20} color="#4f46e5" />
          <Text style={styles.sectionTitle}>Recent Notices</Text>
        </View>
        {mockNotices.map((notice) => (
          <View key={notice.id} style={styles.noticeItem}>
            <View style={styles.noticeHeader}>
              <Text style={styles.noticeTitle}>{notice.title}</Text>
              <Text style={[styles.noticePriority, notice.priority === 'High' ? styles.high : styles.medium]}>
                {notice.priority}
              </Text>
            </View>
            <Text style={styles.noticeContent}>{notice.content}</Text>
            <Text style={styles.noticeDate}>{new Date(notice.date).toLocaleDateString()}</Text>
          </View>
        ))}
      </Card>

      {/* Calendar */}
      <Card style={styles.card}>
        <View style={styles.sectionHeader}>
          <CalendarIcon width={20} height={20} color="#4f46e5" />
          <Text style={styles.sectionTitle}>Calendar</Text>
        </View>
        <RNCalendar
          current={selectedDate.toISOString().split('T')[0]}
          onDayPress={(day) => setSelectedDate(new Date(day.dateString))}
          markingType="simple"
          style={styles.calendar}
        />
        <View style={{ marginTop: 12 }}>
          <Text style={styles.subTitle}>Upcoming Important Dates</Text>
          <View style={[styles.dateItem, { backgroundColor: '#fee2e2' }]}><Text style={{ color: '#b91c1c' }}>Dec 15 - Staff Meeting</Text></View>
          <View style={[styles.dateItem, { backgroundColor: '#dbeafe' }]}><Text style={{ color: '#1e40af' }}>Dec 18 - Parent-Teacher Meeting</Text></View>
          <View style={[styles.dateItem, { backgroundColor: '#dcfce7' }]}><Text style={{ color: '#166534' }}>Dec 20 - Professional Development Workshop</Text></View>
          <View style={[styles.dateItem, { backgroundColor: '#ffedd5' }]}><Text style={{ color: '#c2410c' }}>Dec 25 - Winter Break Starts</Text></View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9fafb' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 12 },
  card: { marginBottom: 12, padding: 12 },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
  statLabel: { fontSize: 12, color: '#6b7280' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginLeft: 6 },
  scheduleItem: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#e0e7ff', borderRadius: 6, padding: 8, marginVertical: 4 },
  scheduleTime: { fontSize: 12, color: '#4f46e5', fontWeight: 'bold' },
  scheduleSubject: { fontSize: 14, fontWeight: 'bold', color: '#111827' },
  scheduleClass: { fontSize: 12, color: '#6b7280' },
  scheduleRoom: { fontSize: 12, color: '#4f46e5', fontWeight: 'bold' },
  noticeItem: { backgroundColor: '#f3f4f6', padding: 8, borderRadius: 6, marginBottom: 6 },
  noticeHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  noticeTitle: { fontWeight: 'bold', color: '#111827' },
  noticePriority: { fontSize: 10, paddingHorizontal: 4, paddingVertical: 2, borderRadius: 4 },
  high: { backgroundColor: '#fee2e2', color: '#b91c1c' },
  medium: { backgroundColor: '#fef3c7', color: '#b45309' },
  noticeContent: { fontSize: 12, color: '#6b7280', marginBottom: 2 },
  noticeDate: { fontSize: 10, color: '#9ca3af' },
  calendar: { borderRadius: 8, borderWidth: 1, borderColor: '#d1d5db' },
  subTitle: { fontWeight: 'bold', fontSize: 14, marginBottom: 4, color: '#111827' },
  dateItem: { padding: 6, borderRadius: 4, marginBottom: 4 },
});

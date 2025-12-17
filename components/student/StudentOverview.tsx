import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Bell, Calendar as CalendarIcon, Clock } from 'lucide-react-native';
import { Calendar } from 'react-native-calendars';
import { User } from '../../app/index';

interface StudentOverviewProps {
  user: User;
}

// Mock data
const notices = [
  { id: 1, title: 'School Annual Day', description: 'Annual day celebration on December 25th. All students must attend.', date: '2025-12-10', type: 'important' },
  { id: 2, title: 'Mid-term Exam Schedule', description: 'Mid-term exams will start from January 5th, 2026.', date: '2025-12-08', type: 'exam' },
  { id: 3, title: 'Library Books Return', description: 'Return all library books by December 20th.', date: '2025-12-12', type: 'general' }
];

const events = [
  { id: 1, title: 'Science Exhibition', date: '2025-12-18', time: '10:00 AM', location: 'School Auditorium' },
  { id: 2, title: 'Sports Day', date: '2025-12-22', time: '8:00 AM', location: 'School Ground' },
  { id: 3, title: 'Parent-Teacher Meeting', date: '2025-12-15', time: '2:00 PM', location: 'Respective Classrooms' }
];

const routine = [
  { day: 'Monday', periods: [
    { time: '8:00-8:45', subject: 'Mathematics', teacher: 'Mr. Sharma' },
    { time: '8:45-9:30', subject: 'English', teacher: 'Ms. Patel' },
    { time: '9:30-10:15', subject: 'Science', teacher: 'Dr. Kumar' },
    { time: '10:15-10:30', subject: 'Break', teacher: '-' },
    { time: '10:30-11:15', subject: 'Social Studies', teacher: 'Mrs. Singh' },
    { time: '11:15-12:00', subject: 'Hindi', teacher: 'Mr. Verma' }
  ]},
  { day: 'Tuesday', periods: [
    { time: '8:00-8:45', subject: 'Science', teacher: 'Dr. Kumar' },
    { time: '8:45-9:30', subject: 'Mathematics', teacher: 'Mr. Sharma' },
    { time: '9:30-10:15', subject: 'English', teacher: 'Ms. Patel' },
    { time: '10:15-10:30', subject: 'Break', teacher: '-' },
    { time: '10:30-11:15', subject: 'Computer', teacher: 'Mr. Joshi' },
    { time: '11:15-12:00', subject: 'Physical Education', teacher: 'Coach Rao' }
  ]}
];

export function StudentOverview({ user }: StudentOverviewProps) {
  return (
    <ScrollView style={{ flex: 1, padding: 12 }}>

      {/* Notices */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Bell width={24} height={24} color="#16a34a" />
          <Text style={styles.sectionTitle}>Notices</Text>
        </View>
        {notices.map((notice) => (
          <View key={notice.id} style={[
            styles.noticeCard,
            notice.type === 'important' ? { borderLeftColor: '#dc2626', backgroundColor: '#fee2e2' } :
            notice.type === 'exam' ? { borderLeftColor: '#f97316', backgroundColor: '#ffedd5' } :
            { borderLeftColor: '#3b82f6', backgroundColor: '#dbeafe' }
          ]}>
            <Text style={styles.noticeTitle}>{notice.title}</Text>
            <Text style={styles.noticeDesc}>{notice.description}</Text>
            <Text style={styles.noticeDate}>{new Date(notice.date).toLocaleDateString()}</Text>
          </View>
        ))}
      </View>

      {/* Events */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <CalendarIcon width={24} height={24} color="#16a34a" />
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
        </View>
        {events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <View style={styles.eventInfo}>
              <Text style={styles.eventText}>📅 {new Date(event.date).toLocaleDateString()}</Text>
              <Text style={styles.eventText}>⏰ {event.time}</Text>
            </View>
            <Text style={styles.eventText}>{event.location}</Text>
          </View>
        ))}
      </View>

      {/* Calendar */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <CalendarIcon width={24} height={24} color="#16a34a" />
          <Text style={styles.sectionTitle}>Calendar</Text>
        </View>
        <Calendar
          // react-native-calendars props
          markingType={'simple'}
          style={{ borderRadius: 8 }}
        />
      </View>

      {/* Class Routine */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Clock width={24} height={24} color="#16a34a" />
          <Text style={styles.sectionTitle}>Class Routine</Text>
        </View>
        {routine.map((day) => (
          <View key={day.day} style={styles.routineDay}>
            <View style={styles.routineDayHeader}>
              <Text style={styles.routineDayTitle}>{day.day}</Text>
            </View>
            {day.periods.map((period, idx) => (
              <View key={idx} style={[styles.periodCard, period.subject === 'Break' && { backgroundColor: '#f3f4f6' }]}>
                <View>
                  <Text style={styles.periodSubject}>{period.subject}</Text>
                  <Text style={styles.periodTeacher}>{period.teacher}</Text>
                </View>
                <Text style={styles.periodTime}>{period.time}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 8, color: '#111827' },
  noticeCard: { padding: 8, borderLeftWidth: 4, borderRadius: 6, marginBottom: 8 },
  noticeTitle: { fontWeight: 'bold', color: '#111827', marginBottom: 2 },
  noticeDesc: { color: '#4b5563', fontSize: 12, marginBottom: 2 },
  noticeDate: { color: '#6b7280', fontSize: 10 },
  eventCard: { padding: 8, backgroundColor: '#d1fae5', borderRadius: 6, marginBottom: 8 },
  eventTitle: { fontWeight: 'bold', color: '#111827', marginBottom: 2 },
  eventInfo: { flexDirection: 'row', gap: 12, marginBottom: 2 },
  eventText: { fontSize: 12, color: '#4b5563', marginRight: 8 },
  routineDay: { marginBottom: 12, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 6 },
  routineDayHeader: { backgroundColor: '#16a34a', padding: 6 },
  routineDayTitle: { color: '#fff', fontWeight: 'bold' },
  periodCard: { flexDirection: 'row', justifyContent: 'space-between', padding: 8, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  periodSubject: { fontWeight: 'bold', color: '#111827' },
  periodTeacher: { fontSize: 12, color: '#6b7280' },
  periodTime: { fontSize: 12, color: '#4b5563' }
});

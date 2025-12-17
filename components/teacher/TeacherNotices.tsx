import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { Calendar, FileText, Bell, Activity } from 'lucide-react-native';

const mockNotices = [
  {
    id: 1,
    title: 'Annual Sports Day',
    content: 'Annual Sports Day will be held on December 15, 2025. All teachers are requested to coordinate with their respective classes.',
    date: '2025-11-20',
    type: 'event',
  },
  {
    id: 2,
    title: 'Parent-Teacher Meeting',
    content: 'Parent-Teacher meeting scheduled for November 30, 2025. Please prepare progress reports for all students.',
    date: '2025-11-18',
    type: 'notice',
  },
  {
    id: 3,
    title: 'Mid-Term Examination Schedule',
    content: 'Mid-term examinations will commence from December 1, 2025. Please ensure all syllabus is covered.',
    date: '2025-11-15',
    type: 'exam',
  },
];

const mockRoutine = [
  { day: 'Monday', periods: ['Math (10A)', 'Physics (9B)', 'Free', 'Math (8C)', 'Chemistry (10A)'] },
  { day: 'Tuesday', periods: ['Physics (10A)', 'Math (9B)', 'Free', 'Physics (8C)', 'Math (10A)'] },
  { day: 'Wednesday', periods: ['Math (10A)', 'Free', 'Physics (9B)', 'Math (8C)', 'Free'] },
  { day: 'Thursday', periods: ['Free', 'Math (9B)', 'Physics (10A)', 'Free', 'Math (8C)'] },
  { day: 'Friday', periods: ['Physics (9B)', 'Math (10A)', 'Free', 'Physics (8C)', 'Math (9B)'] },
];

const mockActivities = [
  { id: 1, title: 'Science Exhibition', date: '2025-12-10', description: 'Annual science project exhibition' },
  { id: 2, title: 'Cultural Program', date: '2025-12-20', description: 'Year-end cultural celebration' },
  { id: 3, title: 'Workshop: Digital Teaching', date: '2025-11-28', description: 'Training on modern teaching methods' },
];

export function TeacherNotices() {
  const [activeTab, setActiveTab] = useState<'notices' | 'routine' | 'activities'>('notices');

  return (
    <ScrollView style={styles.container}>
      {/* Tab Buttons */}
      <View style={styles.tabRow}>
        <Button
          mode={activeTab === 'notices' ? 'contained' : 'outlined'}
          onPress={() => setActiveTab('notices')}
          style={styles.tabButton}
        >
          Notices
        </Button>
        <Button
          mode={activeTab === 'routine' ? 'contained' : 'outlined'}
          onPress={() => setActiveTab('routine')}
          style={styles.tabButton}
        >
          Routine
        </Button>
        <Button
          mode={activeTab === 'activities' ? 'contained' : 'outlined'}
          onPress={() => setActiveTab('activities')}
          style={styles.tabButton}
        >
          Activities
        </Button>
      </View>

      {/* Notices Tab */}
      {activeTab === 'notices' && (
        <View style={{ marginTop: 12 }}>
          {mockNotices.map((notice) => (
            <Card key={notice.id} style={styles.card}>
              <View style={styles.cardRow}>
                <View style={[styles.iconContainer, {
                  backgroundColor:
                    notice.type === 'event' ? '#d1fae5' :
                    notice.type === 'exam' ? '#ffedd5' : '#dbeafe'
                }]}>
                  {notice.type === 'event' ? (
                    <Calendar width={24} height={24} color="#059669" />
                  ) : notice.type === 'exam' ? (
                    <FileText width={24} height={24} color="#ea580c" />
                  ) : (
                    <Bell width={24} height={24} color="#2563eb" />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{notice.title}</Text>
                  <Text style={styles.content}>{notice.content}</Text>
                  <Text style={styles.date}>{new Date(notice.date).toLocaleDateString()}</Text>
                </View>
              </View>
            </Card>
          ))}
        </View>
      )}

      {/* Routine Tab */}
      {activeTab === 'routine' && (
        <View style={{ marginTop: 12 }}>
          <Card style={styles.card}>
            <Text style={styles.title}>Weekly Class Routine</Text>
            {mockRoutine.map((day, idx) => (
              <View key={idx} style={{ marginBottom: 12 }}>
                <Text style={styles.day}>{day.day}</Text>
                <View style={styles.periodRow}>
                  {day.periods.map((period, pIdx) => (
                    <View key={pIdx} style={[
                      styles.periodBox,
                      { backgroundColor: period === 'Free' ? '#f3f4f6' : '#e0e7ff' }
                    ]}>
                      <Text style={{ fontSize: 12, color: period === 'Free' ? '#6b7280' : '#3730a3', textAlign: 'center' }}>{period}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </Card>
        </View>
      )}

      {/* Activities Tab */}
      {activeTab === 'activities' && (
        <View style={{ marginTop: 12 }}>
          {mockActivities.map((activity) => (
            <Card key={activity.id} style={styles.card}>
              <View style={styles.cardRow}>
                <View style={[styles.iconContainer, { backgroundColor: '#ede9fe' }]}>
                  <Activity width={24} height={24} color="#7c3aed" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{activity.title}</Text>
                  <Text style={styles.content}>{activity.description}</Text>
                  <Text style={styles.date}>{new Date(activity.date).toLocaleDateString()}</Text>
                </View>
              </View>
            </Card>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  card: {
    marginBottom: 12,
    padding: 12,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  content: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
  },
  day: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  periodRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  periodBox: {
    flex: 1,
    padding: 6,
    borderRadius: 6,
    marginBottom: 4,
  },
});

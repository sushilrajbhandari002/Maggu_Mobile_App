import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Bell, Calendar, Activity } from 'lucide-react-native';
import { User } from '../../app/index';

interface StudentNoticesProps {
  user: User;
}

const mockNotices = [
  {
    id: 1,
    title: 'Annual Sports Day',
    content: 'Annual Sports Day will be held on December 15, 2025. All students are required to participate.',
    date: '2025-11-20',
    type: 'event'
  },
  {
    id: 2,
    title: 'Parent-Teacher Meeting',
    content: 'Parent-Teacher meeting scheduled for November 30, 2025. Please inform your parents.',
    date: '2025-11-18',
    type: 'notice'
  },
  {
    id: 3,
    title: 'Mid-Term Examination',
    content: 'Mid-term examinations will commence from December 1, 2025. Please prepare accordingly.',
    date: '2025-11-15',
    type: 'exam'
  }
];

const mockEvents = [
  { id: 1, title: 'Science Exhibition', date: '2025-12-10', time: '10:00 AM' },
  { id: 2, title: 'Cultural Program', date: '2025-12-20', time: '2:00 PM' },
  { id: 3, title: 'Winter Break Starts', date: '2025-12-25', time: 'All Day' }
];

const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);

export function StudentNotices({ user }: StudentNoticesProps) {
  const [activeTab, setActiveTab] = useState<'notices' | 'events' | 'calendar'>('notices');

  const renderNotices = () => (
    <ScrollView>
      {mockNotices.map(notice => (
        <View key={notice.id} style={styles.card}>
          <View style={[styles.iconContainer, 
            notice.type === 'event' ? { backgroundColor: '#e9d5ff' } :
            notice.type === 'exam' ? { backgroundColor: '#ffedd5' } :
            { backgroundColor: '#dbeafe' }
          ]}>
            <Bell width={24} height={24} color={
              notice.type === 'event' ? '#7c3aed' :
              notice.type === 'exam' ? '#ea580c' : '#2563eb'
            } />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{notice.title}</Text>
            <Text style={styles.text}>{notice.content}</Text>
            <Text style={styles.date}>{new Date(notice.date).toLocaleDateString()}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderEvents = () => (
    <ScrollView>
      {mockEvents.map(event => (
        <View key={event.id} style={styles.card}>
          <View style={[styles.iconContainer, { backgroundColor: '#dcfce7' }]}>
            <Activity width={24} height={24} color="#16a34a" />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.text}>{new Date(event.date).toLocaleDateString()} • {event.time}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderCalendar = () => (
    <ScrollView>
      <View style={[styles.card, { padding: 12 }]}>
        <View style={styles.calendarHeader}>
          <Text style={styles.title}>November 2025</Text>
          <Calendar width={24} height={24} color="#4b5563" />
        </View>
        <View style={styles.weekDays}>
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day => (
            <Text key={day} style={styles.weekDay}>{day}</Text>
          ))}
        </View>
        <View style={styles.calendarGrid}>
          {calendarDays.map(day => (
            <View key={day} style={[
              styles.dayContainer,
              day === 23 ? { backgroundColor: '#16a34a' } :
              [15,20,30].includes(day) ? { backgroundColor: '#dcfce7' } : {}
            ]}>
              <Text style={[
                styles.dayText,
                day === 23 ? { color: '#fff' } :
                [15,20,30].includes(day) ? { color: '#166534' } : {}
              ]}>{day}</Text>
            </View>
          ))}
        </View>
        <View style={styles.legend}>
          <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: '#16a34a' }]} /><Text style={styles.legendText}>Today</Text></View>
          <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: '#dcfce7', borderWidth: 1, borderColor: '#4ade80' }]} /><Text style={styles.legendText}>Events</Text></View>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity style={[styles.tabButton, activeTab==='notices' && styles.activeTab]} onPress={() => setActiveTab('notices')}>
          <Text style={styles.tabText}>Notices</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab==='events' && styles.activeTab]} onPress={() => setActiveTab('events')}>
          <Text style={styles.tabText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab==='calendar' && styles.activeTab]} onPress={() => setActiveTab('calendar')}>
          <Text style={styles.tabText}>Calendar</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={{ flex: 1 }}>
        {activeTab === 'notices' && renderNotices()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'calendar' && renderCalendar()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 8 },
  tabButton: { paddingVertical: 8, paddingHorizontal: 16, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: '#16a34a' },
  tabText: { fontWeight: 'bold', color: '#111827' },
  card: { flexDirection: 'row', padding: 12, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: '#e5e7eb' },
  iconContainer: { padding: 8, borderRadius: 6, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  content: { flex: 1 },
  title: { fontWeight: 'bold', fontSize: 14, marginBottom: 2, color: '#111827' },
  text: { fontSize: 12, color: '#4b5563', marginBottom: 2 },
  date: { fontSize: 10, color: '#6b7280' },
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  weekDays: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 4 },
  weekDay: { width: 32, textAlign: 'center', fontSize: 10, color: '#6b7280' },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayContainer: { width: 32, height: 32, margin: 2, justifyContent: 'center', alignItems: 'center', borderRadius: 4 },
  dayText: { fontSize: 10, color: '#111827' },
  legend: { flexDirection: 'row', marginTop: 8, gap: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  legendDot: { width: 10, height: 10, borderRadius: 5, marginRight: 4 },
  legendText: { fontSize: 12, color: '#6b7280' }
});

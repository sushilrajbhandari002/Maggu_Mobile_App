import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { Users, Bell, BookOpen, TrendingUp, Calendar as CalendarIcon } from 'lucide-react-native';
import { User } from '../../app/index';

interface TeacherOverviewProps {
  user: User;
}

export function TeacherOverview({ user }: TeacherOverviewProps) {
  return (
    <ScrollView style={styles.container}>
      {/* Quick Stats */}
      <View style={styles.statsGrid}>
        <Card style={styles.card}>
          <View style={styles.cardRow}>
            <View>
              <Text style={styles.label}>Total Classes</Text>
              <Text style={styles.value}>{user.assignedClasses?.length || 3}</Text>
            </View>
            <Users width={36} height={36} color="#4f46e5" />
          </View>
        </Card>

        <Card style={styles.card}>
          <View style={styles.cardRow}>
            <View>
              <Text style={styles.label}>Total Students</Text>
              <Text style={styles.value}>120</Text>
            </View>
            <Users width={36} height={36} color="#16a34a" />
          </View>
        </Card>

        <Card style={styles.card}>
          <View style={styles.cardRow}>
            <View>
              <Text style={styles.label}>Pending Requests</Text>
              <Text style={styles.value}>5</Text>
            </View>
            <Bell width={36} height={36} color="#ea580c" />
          </View>
        </Card>

        <Card style={styles.card}>
          <View style={styles.cardRow}>
            <View>
              <Text style={styles.label}>Materials Uploaded</Text>
              <Text style={styles.value}>24</Text>
            </View>
            <BookOpen width={36} height={36} color="#2563eb" />
          </View>
        </Card>
      </View>

      {/* Calendar */}
      <Card style={styles.card}>
        <View style={styles.sectionHeader}>
          <CalendarIcon width={20} height={20} color="#4f46e5" />
          <Text style={styles.sectionTitle}>Calendar</Text>
        </View>
        <RNCalendar
          current={new Date().toISOString().split('T')[0]}
          markingType={'simple'}
          style={styles.calendar}
        />
      </Card>

      {/* Recent Activities */}
      <Card style={styles.card}>
        <View style={styles.sectionHeader}>
          <TrendingUp width={20} height={20} color="#4f46e5" />
          <Text style={styles.sectionTitle}>Recent Activities</Text>
        </View>

        <View style={styles.activityItem}>
          <View style={[styles.activityBadge, { backgroundColor: '#d1fae5', borderColor: '#059669' }]} />
          <View style={{ flex: 1 }}>
            <Text style={styles.activityText}>Attendance marked for Class 10-A</Text>
            <Text style={styles.activityDate}>Today at 9:30 AM</Text>
          </View>
        </View>

        <View style={styles.activityItem}>
          <View style={[styles.activityBadge, { backgroundColor: '#dbeafe', borderColor: '#3b82f6' }]} />
          <View style={{ flex: 1 }}>
            <Text style={styles.activityText}>Study material uploaded - Mathematics Chapter 5</Text>
            <Text style={styles.activityDate}>Yesterday at 3:45 PM</Text>
          </View>
        </View>

        <View style={styles.activityItem}>
          <View style={[styles.activityBadge, { backgroundColor: '#ffedd5', borderColor: '#ea580c' }]} />
          <View style={{ flex: 1 }}>
            <Text style={styles.activityText}>Exam marks entered for Mid-term Exam</Text>
            <Text style={styles.activityDate}>2 days ago</Text>
          </View>
        </View>
      </Card>

      {/* Today's Schedule */}
      <Card style={styles.card}>
        <View style={styles.sectionHeader}>
          <CalendarIcon width={20} height={20} color="#4f46e5" />
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
        </View>

        <View style={styles.scheduleItem}>
          <View>
            <Text style={styles.scheduleText}>Class 10-A - Mathematics</Text>
            <Text style={styles.scheduleSubtext}>Algebra and Equations</Text>
          </View>
          <Text style={styles.scheduleTime}>8:00 - 8:45 AM</Text>
        </View>

        <View style={styles.scheduleItem}>
          <View>
            <Text style={styles.scheduleText}>Class 9-B - Mathematics</Text>
            <Text style={styles.scheduleSubtext}>Geometry Basics</Text>
          </View>
          <Text style={styles.scheduleTime}>9:30 - 10:15 AM</Text>
        </View>

        <View style={styles.scheduleItem}>
          <View>
            <Text style={styles.scheduleText}>Class 10-B - Mathematics</Text>
            <Text style={styles.scheduleSubtext}>Statistics</Text>
          </View>
          <Text style={styles.scheduleTime}>11:15 - 12:00 PM</Text>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    marginBottom: 12,
    padding: 12,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#6b7280',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 6,
  },
  calendar: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  activityItem: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'center',
  },
  activityBadge: {
    width: 6,
    height: 40,
    borderRadius: 2,
    borderWidth: 2,
    marginRight: 8,
  },
  activityText: {
    fontSize: 14,
    color: '#111827',
  },
  activityDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: '#e0e7ff',
    borderRadius: 6,
    marginVertical: 4,
  },
  scheduleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  scheduleSubtext: {
    fontSize: 12,
    color: '#6b7280',
  },
  scheduleTime: {
    fontSize: 12,
    color: '#4f46e5',
  },
});

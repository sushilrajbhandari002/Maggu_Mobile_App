import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Users, BookOpen } from 'lucide-react-native';
import { User } from '../../app/index';

interface TeacherClassesProps {
  user: User;
}

// Mock class data
const mockClassData = {
  'Class 10A': { students: 35, subjects: ['Mathematics', 'Physics', 'Chemistry'] },
  'Class 9B': { students: 32, subjects: ['Mathematics', 'Physics'] },
  'Class 8C': { students: 30, subjects: ['Mathematics'] }
};

export function TeacherClasses({ user }: TeacherClassesProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Users size={20} color="#111827" style={{ marginRight: 6 }} />
        <Text style={styles.headerText}>Assigned Classes & Students</Text>
      </View>

      {/* Class Cards */}
      {user.assignedClasses?.map(className => {
        const classInfo = mockClassData[className as keyof typeof mockClassData];
        return (
          <View key={className} style={styles.card}>
            {/* Class Name and Class Teacher Badge */}
            <View style={styles.cardHeader}>
              <Text style={styles.className}>{className}</Text>
              {user.classTeacherOf === className && (
                <View style={styles.classTeacherBadge}>
                  <Text style={styles.classTeacherText}>Class Teacher</Text>
                </View>
              )}
            </View>

            {/* Total Students */}
            <Text style={styles.totalStudents}>Total Students: {classInfo?.students || 0}</Text>

            {/* Subjects */}
            <View style={styles.subjectsContainer}>
              {classInfo?.subjects.map(subject => (
                <View key={subject} style={styles.subjectBadge}>
                  <BookOpen size={14} color="#374151" style={{ marginRight: 4 }} />
                  <Text style={styles.subjectText}>{subject}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  card: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  className: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  classTeacherBadge: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  classTeacherText: {
    fontSize: 12,
    color: '#4338ca',
  },
  totalStudents: {
    color: '#6b7280',
    marginBottom: 8,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subjectBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginRight: 6,
    marginBottom: 6,
  },
  subjectText: {
    fontSize: 12,
    color: '#374151',
  },
});

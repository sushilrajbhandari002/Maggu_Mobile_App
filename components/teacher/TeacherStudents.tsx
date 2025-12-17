import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Button, TextInput, Menu, Divider } from 'react-native-paper';
import { User } from '../../app/index';

interface TeacherStudentsProps {
  user: User;
}

const mockStudentDetails = [
  {
    id: 's1',
    name: 'Alice Johnson',
    rollNumber: '101',
    class: 'Class 10A',
    attendance: '92%',
    attendanceHistory: [
      { date: '2025-11-22', status: 'Present' },
      { date: '2025-11-21', status: 'Present' },
      { date: '2025-11-20', status: 'Absent' },
      { date: '2025-11-19', status: 'Present' },
      { date: '2025-11-18', status: 'Present' }
    ]
  },
  {
    id: 's2',
    name: 'Bob Wilson',
    rollNumber: '102',
    class: 'Class 10A',
    attendance: '88%',
    attendanceHistory: [
      { date: '2025-11-22', status: 'Present' },
      { date: '2025-11-21', status: 'Absent' },
      { date: '2025-11-20', status: 'Present' },
      { date: '2025-11-19', status: 'Present' },
      { date: '2025-11-18', status: 'Absent' }
    ]
  }
];

export function TeacherStudents({ user }: TeacherStudentsProps) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);
  const [classMenuVisible, setClassMenuVisible] = useState(false);

  const filteredStudents = mockStudentDetails.filter((student) =>
    (!selectedClass || student.class === selectedClass) &&
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <Card style={styles.card}>
        <Card.Title title="Student Details & Attendance" />
        <Card.Content>
          {/* Class Select */}
          <View style={{ marginBottom: 12 }}>
            <Menu
              visible={classMenuVisible}
              onDismiss={() => setClassMenuVisible(false)}
              anchor={
                <Button mode="outlined" onPress={() => setClassMenuVisible(true)}>
                  {selectedClass || 'Select Class'}
                </Button>
              }
            >
              {user.assignedClasses?.map((cls) => (
                <Menu.Item
                  key={cls}
                  title={cls}
                  onPress={() => {
                    setSelectedClass(cls);
                    setClassMenuVisible(false);
                  }}
                />
              ))}
            </Menu>
          </View>

          {/* Search */}
          <TextInput
            placeholder="Search student..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            mode="outlined"
            style={{ marginBottom: 12 }}
          />

          {/* Students List */}
          {selectedClass && filteredStudents.map((student) => (
            <TouchableOpacity
              key={student.id}
              style={styles.studentCard}
              onPress={() =>
                setExpandedStudentId(expandedStudentId === student.id ? null : student.id)
              }
            >
              <View style={styles.studentHeader}>
                <View>
                  <Text style={styles.studentName}>{student.name}</Text>
                  <Text style={styles.studentRoll}>Roll: {student.rollNumber}</Text>
                </View>
                <View style={styles.attendanceBadge}>
                  <Text style={styles.attendanceText}>{student.attendance}</Text>
                </View>
              </View>

              {expandedStudentId === student.id && (
                <View style={{ marginTop: 12, borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 8 }}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 6 }}>Recent Attendance</Text>
                  {student.attendanceHistory.map((record, idx) => (
                    <View key={idx} style={styles.attendanceRow}>
                      <Text>{record.date}</Text>
                      <Text style={[
                        styles.attendanceStatus,
                        record.status === 'Present' ? styles.present : styles.absent
                      ]}>
                        {record.status}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          ))}

          {selectedClass && filteredStudents.length === 0 && (
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#6B7280' }}>
              No students found.
            </Text>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9FAFB' },
  card: { marginBottom: 16 },
  studentCard: { padding: 12, backgroundColor: '#F3F4F6', borderRadius: 8, marginBottom: 12 },
  studentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  studentName: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  studentRoll: { fontSize: 12, color: '#6B7280' },
  attendanceBadge: { backgroundColor: '#D1FAE5', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  attendanceText: { fontSize: 12, color: '#059669' },
  attendanceRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 },
  attendanceStatus: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 12, fontSize: 12 },
  present: { backgroundColor: '#DCFCE7', color: '#15803D' },
  absent: { backgroundColor: '#FEE2E2', color: '#B91C1C' },
});

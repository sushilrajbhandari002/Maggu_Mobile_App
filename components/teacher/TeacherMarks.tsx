import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Alert } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { User } from '../../app/index';

interface TeacherMarksProps {
  user: User;
}

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
const exams = ['First Terminal', 'Mid Terminal', 'Final Terminal'];

const mockStudents = [
  { id: 's1', name: 'Alice Johnson', rollNumber: '101', marks: '' },
  { id: 's2', name: 'Bob Wilson', rollNumber: '102', marks: '' },
  { id: 's3', name: 'Charlie Brown', rollNumber: '103', marks: '' },
  { id: 's4', name: 'Diana Prince', rollNumber: '104', marks: '' },
  { id: 's5', name: 'Ethan Hunt', rollNumber: '105', marks: '' }
];

export function TeacherMarks({ user }: TeacherMarksProps) {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [students, setStudents] = useState(mockStudents);

  const handleMarksChange = (id: string, value: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, marks: value } : s));
  };

  const handleSubmit = () => {
    if (!selectedClass || !selectedSubject || !selectedExam) {
      Alert.alert('Error', 'Please select class, subject, and exam');
      return;
    }

    const filledMarks = students.filter(s => s.marks !== '').length;
    if (filledMarks === 0) {
      Alert.alert('Error', 'Please enter marks for at least one student');
      return;
    }

    Alert.alert('Success', `Marks submitted for ${filledMarks} students`);
    setStudents(mockStudents);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.heading}>Enter Exam Marks</Text>

        {/* Dropdowns */}
        <ScrollView horizontal style={styles.dropdownRow}>
          {user.assignedClasses?.map(cls => (
            <Button
              key={cls}
              mode={selectedClass === cls ? 'contained' : 'outlined'}
              onPress={() => setSelectedClass(cls)}
              style={styles.dropdownButton}
            >
              {cls}
            </Button>
          ))}
        </ScrollView>

        <ScrollView horizontal style={styles.dropdownRow}>
          {subjects.map(sub => (
            <Button
              key={sub}
              mode={selectedSubject === sub ? 'contained' : 'outlined'}
              onPress={() => setSelectedSubject(sub)}
              style={styles.dropdownButton}
            >
              {sub}
            </Button>
          ))}
        </ScrollView>

        <ScrollView horizontal style={styles.dropdownRow}>
          {exams.map(exam => (
            <Button
              key={exam}
              mode={selectedExam === exam ? 'contained' : 'outlined'}
              onPress={() => setSelectedExam(exam)}
              style={styles.dropdownButton}
            >
              {exam}
            </Button>
          ))}
        </ScrollView>

        {/* Students Marks */}
        {selectedClass && selectedSubject && selectedExam && (
          <View style={{ marginTop: 16 }}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Roll No</Text>
              <Text style={styles.tableHeaderText}>Name</Text>
              <Text style={styles.tableHeaderText}>Marks (100)</Text>
            </View>

            {students.map(student => (
              <View key={student.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{student.rollNumber}</Text>
                <Text style={styles.tableCell}>{student.name}</Text>
                <TextInput
                  style={[styles.tableCell, styles.input]}
                  value={student.marks}
                  onChangeText={(val) => handleMarksChange(student.id, val)}
                  keyboardType="numeric"
                  placeholder="0-100"
                />
              </View>
            ))}

            <Button mode="contained" onPress={handleSubmit} style={{ marginTop: 12 }}>
              Submit Marks
            </Button>
          </View>
        )}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dropdownRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dropdownButton: {
    marginRight: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderRadius: 6,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    padding: 8,
    marginTop: 4,
    borderRadius: 6,
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
    padding: 4,
    textAlign: 'right',
  },
});

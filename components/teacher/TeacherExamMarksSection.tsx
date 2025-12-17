import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { User } from '../../app/index';
import { Card, Button } from 'react-native-paper';
import Modal from 'react-native-modal';

interface TeacherExamMarksSectionProps {
  user: User;
}

const mockClasses = ['Class 10-A', 'Class 10-B', 'Class 9-A', 'Class 9-B'];
const mockExams = ['Half Yearly 2025', 'First Term 2025', 'Unit Test 2', 'Unit Test 1'];
const mockSubjects = ['Mathematics', 'English', 'Science', 'Social Studies', 'Hindi', 'Computer'];

const mockStudentsForMarks = [
  { id: 1, name: 'Aditya Sharma', rollNo: '101' },
  { id: 2, name: 'Priya Patel', rollNo: '102' },
  { id: 3, name: 'Rahul Kumar', rollNo: '103' },
  { id: 4, name: 'Sneha Singh', rollNo: '104' },
  { id: 5, name: 'Arjun Verma', rollNo: '105' },
  { id: 6, name: 'Ananya Gupta', rollNo: '106' },
  { id: 7, name: 'Vikram Joshi', rollNo: '107' },
  { id: 8, name: 'Kavya Thakur', rollNo: '108' }
];

const mockExistingMarks = [
  {
    exam: 'Half Yearly 2025',
    class: 'Class 10-A',
    subject: 'Mathematics',
    totalMarks: 100,
    students: [
      { rollNo: '101', name: 'Aditya Sharma', marks: 92 },
      { rollNo: '102', name: 'Priya Patel', marks: 88 },
      { rollNo: '103', name: 'Rahul Kumar', marks: 75 }
    ]
  }
];

export function TeacherExamMarksSection({ user }: TeacherExamMarksSectionProps) {
  const [view, setView] = useState<'enter' | 'existing'>('enter');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [marks, setMarks] = useState<Record<number, string>>({});
  const [viewingMarks, setViewingMarks] = useState<any | null>(null);

  const handleMarkChange = (studentId: number, value: string) => {
    setMarks(prev => ({ ...prev, [studentId]: value }));
  };

  const submitMarks = () => {
    if (!selectedClass || !selectedExam || !selectedSubject || !totalMarks) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    const allMarksEntered = mockStudentsForMarks.every(student => marks[student.id]);
    if (!allMarksEntered) {
      Alert.alert('Error', 'Please enter marks for all students');
      return;
    }
    Alert.alert('Success', 'Marks submitted successfully!');
    setSelectedClass('');
    setSelectedExam('');
    setSelectedSubject('');
    setTotalMarks('');
    setMarks({});
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      {/* View Toggle */}
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <Button mode={view === 'enter' ? 'contained' : 'outlined'} onPress={() => setView('enter')} style={{ marginRight: 8 }}>
          Enter Marks
        </Button>
        <Button mode={view === 'existing' ? 'contained' : 'outlined'} onPress={() => setView('existing')}>
          View Marks
        </Button>
      </View>

      {/* Enter Marks */}
      {view === 'enter' && (
        <Card style={{ marginBottom: 12, padding: 12 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Enter Exam Marks</Text>

          {/* Class, Exam, Subject, Total */}
          <View style={{ marginBottom: 12 }}>
            <Text>Class *</Text>
            <ScrollView horizontal>
              {mockClasses.map(cls => (
                <TouchableOpacity key={cls} onPress={() => setSelectedClass(cls)} style={{
                  padding: 6, backgroundColor: selectedClass === cls ? '#4f46e5' : '#f3f4f6',
                  marginRight: 6, borderRadius: 6
                }}>
                  <Text style={{ color: selectedClass === cls ? '#fff' : '#111827' }}>{cls}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={{ marginTop: 8 }}>Exam *</Text>
            <ScrollView horizontal>
              {mockExams.map(exam => (
                <TouchableOpacity key={exam} onPress={() => setSelectedExam(exam)} style={{
                  padding: 6, backgroundColor: selectedExam === exam ? '#4f46e5' : '#f3f4f6',
                  marginRight: 6, borderRadius: 6
                }}>
                  <Text style={{ color: selectedExam === exam ? '#fff' : '#111827' }}>{exam}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={{ marginTop: 8 }}>Subject *</Text>
            <ScrollView horizontal>
              {mockSubjects.map(sub => (
                <TouchableOpacity key={sub} onPress={() => setSelectedSubject(sub)} style={{
                  padding: 6, backgroundColor: selectedSubject === sub ? '#4f46e5' : '#f3f4f6',
                  marginRight: 6, borderRadius: 6
                }}>
                  <Text style={{ color: selectedSubject === sub ? '#fff' : '#111827' }}>{sub}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={{ marginTop: 8 }}>Total Marks *</Text>
            <TextInput
              value={totalMarks}
              onChangeText={setTotalMarks}
              keyboardType="numeric"
              style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 6, padding: 6, marginTop: 4 }}
              placeholder="e.g. 100"
            />
          </View>

          {/* Student Marks */}
          {selectedClass && selectedExam && selectedSubject && totalMarks ? (
            <View>
              {mockStudentsForMarks.map(student => (
                <View key={student.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text>{student.name}</Text>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Roll No: {student.rollNo}</Text>
                  </View>
                  <TextInput
                    value={marks[student.id] || ''}
                    onChangeText={(val) => handleMarkChange(student.id, val)}
                    keyboardType="numeric"
                    placeholder="Marks"
                    style={{ width: 60, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 6, padding: 4, marginRight: 4 }}
                  />
                  <Text>/ {totalMarks}</Text>
                </View>
              ))}
              <Button mode="contained" onPress={submitMarks}>Submit Marks</Button>
            </View>
          ) : null}
        </Card>
      )}

      {/* Existing Marks */}
      {view === 'existing' && (
        <View>
          {mockExistingMarks.map((mark, idx) => (
            <Card key={idx} style={{ marginBottom: 12, padding: 12 }}>
              <Text style={{ fontWeight: 'bold' }}>{mark.exam}</Text>
              <Text>{mark.class} • {mark.subject}</Text>
              <Text>Total Marks: {mark.totalMarks}</Text>
              <Button mode="outlined" onPress={() => setViewingMarks(mark)}>View</Button>
            </Card>
          ))}
        </View>
      )}

      {/* Modal for viewing marks */}
      <Modal isVisible={!!viewingMarks} onBackdropPress={() => setViewingMarks(null)}>
        <Card style={{ padding: 12 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{viewingMarks?.exam}</Text>
          <Text>{viewingMarks?.class} • {viewingMarks?.subject} • Total: {viewingMarks?.totalMarks}</Text>
          <ScrollView style={{ maxHeight: 300, marginTop: 8 }}>
            {viewingMarks?.students.map((s: any, idx: number) => (
              <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text>{s.name} ({s.rollNo})</Text>
                <Text>{s.marks} / {viewingMarks.totalMarks}</Text>
              </View>
            ))}
          </ScrollView>
          <Button onPress={() => setViewingMarks(null)} style={{ marginTop: 8 }}>Close</Button>
        </Card>
      </Modal>
    </ScrollView>
  );
}

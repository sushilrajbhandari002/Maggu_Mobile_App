import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Users, BookOpen, ChevronRight } from 'lucide-react-native';
import { User } from '../../app/index';

interface TeacherClassesSectionProps {
  user: User;
}

const mockAssignedClasses = [
  { id: 1, name: 'Class 10-A', subject: 'Mathematics', students: 35, schedule: 'Mon, Wed, Fri - 8:00 AM' },
  { id: 2, name: 'Class 10-B', subject: 'Mathematics', students: 32, schedule: 'Mon, Wed, Fri - 9:00 AM' },
  { id: 3, name: 'Class 9-A', subject: 'Mathematics', students: 38, schedule: 'Tue, Thu - 10:30 AM' },
  { id: 4, name: 'Class 9-B', subject: 'Mathematics', students: 37, schedule: 'Tue, Thu - 11:30 AM' }
];

const mockStudents = [
  { id: 1, name: 'Aditya Sharma', rollNo: '101', class: 'Class 10-A', attendance: 95, lastExam: 92, status: 'Excellent' },
  { id: 2, name: 'Priya Patel', rollNo: '102', class: 'Class 10-A', attendance: 98, lastExam: 88, status: 'Good' },
  { id: 3, name: 'Rahul Kumar', rollNo: '103', class: 'Class 10-A', attendance: 88, lastExam: 75, status: 'Average' },
  { id: 4, name: 'Sneha Singh', rollNo: '104', class: 'Class 10-A', attendance: 92, lastExam: 85, status: 'Good' },
  { id: 5, name: 'Arjun Verma', rollNo: '105', class: 'Class 10-A', attendance: 85, lastExam: 70, status: 'Needs Attention' },
  { id: 6, name: 'Ananya Gupta', rollNo: '106', class: 'Class 10-A', attendance: 100, lastExam: 95, status: 'Excellent' },
  { id: 7, name: 'Vikram Joshi', rollNo: '107', class: 'Class 10-A', attendance: 90, lastExam: 80, status: 'Good' },
  { id: 8, name: 'Kavya Thakur', rollNo: '108', class: 'Class 10-A', attendance: 94, lastExam: 87, status: 'Good' }
];

export function TeacherClassesSection({ user }: TeacherClassesSectionProps) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [view, setView] = useState<'classes' | 'students'>('classes');

  const filteredStudents = selectedClass 
    ? mockStudents.filter(s => s.class === selectedClass)
    : mockStudents;

  return (
    <ScrollView style={{ padding: 16, gap: 12 }}>
      {/* View Toggle */}
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 8,
            backgroundColor: view === 'classes' ? '#4f46e5' : '#f3f4f6'
          }}
          onPress={() => setView('classes')}
        >
          <BookOpen size={16} color={view === 'classes' ? '#fff' : '#111827'} style={{ marginRight: 6 }} />
          <Text style={{ color: view === 'classes' ? '#fff' : '#111827', fontWeight: '500' }}>Assigned Classes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 8,
            backgroundColor: view === 'students' ? '#4f46e5' : '#f3f4f6'
          }}
          onPress={() => setView('students')}
        >
          <Users size={16} color={view === 'students' ? '#fff' : '#111827'} style={{ marginRight: 6 }} />
          <Text style={{ color: view === 'students' ? '#fff' : '#111827', fontWeight: '500' }}>Students</Text>
        </TouchableOpacity>
      </View>

      {/* Classes View */}
      {view === 'classes' && (
        <View style={{ gap: 12 }}>
          {mockAssignedClasses.map(cls => (
            <View key={cls.id} style={{ backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#e5e7eb' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 2 }}>{cls.name}</Text>
                  <Text style={{ fontSize: 14, color: '#4f46e5', marginBottom: 4 }}>{cls.subject}</Text>
                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Users size={14} color="#6b7280" />
                      <Text style={{ fontSize: 12, color: '#6b7280' }}>{cls.students} Students</Text>
                    </View>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>{cls.schedule}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => { setSelectedClass(cls.name); setView('students'); }}>
                  <ChevronRight size={20} color="#111827" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Students View */}
      {view === 'students' && (
        <View style={{ gap: 12 }}>
          {/* Class Filter */}
          {!selectedClass && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
              {mockAssignedClasses.map(cls => (
                <TouchableOpacity
                  key={cls.id}
                  onPress={() => setSelectedClass(cls.name)}
                  style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: '#f3f4f6' }}
                >
                  <Text style={{ fontSize: 12, color: '#111827' }}>{cls.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* Students List */}
          {filteredStudents.map(student => (
            <View key={student.id} style={{ backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#e5e7eb' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>{student.name}</Text>
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>Roll No: {student.rollNo} • {student.class}</Text>
                </View>
                <View style={{
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 6,
                  backgroundColor:
                    student.status === 'Excellent' ? '#dcfce7' :
                    student.status === 'Good' ? '#dbeafe' :
                    student.status === 'Average' ? '#fef3c7' : '#fee2e2'
                }}>
                  <Text style={{
                    fontSize: 10,
                    color:
                      student.status === 'Excellent' ? '#15803d' :
                      student.status === 'Good' ? '#1e40af' :
                      student.status === 'ca?"Average"' ? '#b45309' : '#b91c1c'
                  }}>{student.status}</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', gap: 8 }}>
                <View style={{ flex: 1, backgroundColor: '#dcfce7', borderRadius: 8, padding: 6, alignItems: 'center' }}>
                  <Text style={{ fontSize: 10, color: '#6b7280' }}>Attendance</Text>
                  <Text style={{ fontSize: 14, color: '#15803d', fontWeight: '600' }}>{student.attendance}%</Text>
                </View>
                <View style={{ flex: 1, backgroundColor: '#dbeafe', borderRadius: 8, padding: 6, alignItems: 'center' }}>
                  <Text style={{ fontSize: 10, color: '#6b7280' }}>Last Exam</Text>
                  <Text style={{ fontSize: 14, color: '#1e40af', fontWeight: '600' }}>{student.lastExam}%</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

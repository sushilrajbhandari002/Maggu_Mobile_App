import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { CheckSquare, Clock, Users, Eye, Check, X } from 'lucide-react-native';
import { User } from '../../app/index';

// Mock Data
const mockClasses = ['Class 10-A', 'Class 10-B', 'Class 9-A', 'Class 9-B'];

const mockStudentsForAttendance = [
  { id: 1, name: 'Aditya Sharma', rollNo: '101', status: 'present' },
  { id: 2, name: 'Priya Patel', rollNo: '102', status: 'present' },
  { id: 3, name: 'Rahul Kumar', rollNo: '103', status: 'absent' },
  { id: 4, name: 'Sneha Singh', rollNo: '104', status: 'present' },
];

const mockPendingRequests = [
  {
    id: 1,
    studentName: 'Rahul Kumar',
    rollNo: '103',
    class: 'Class 10-A',
    date: '2025-12-12',
    time: '8:15 AM',
    location: '27.7172° N, 85.3240° E',
    reason: 'Was present but forgot to mark',
  },
];

const mockStudentAttendanceRecords = [
  {
    studentName: 'Aditya Sharma',
    rollNo: '101',
    class: 'Class 10-A',
    records: [
      { date: '2025-12-12', status: 'Present' },
      { date: '2025-12-11', status: 'Present' },
      { date: '2025-12-10', status: 'Present' },
      { date: '2025-12-09', status: 'Absent' },
    ],
    totalPresent: 18,
    totalAbsent: 2,
    percentage: 90,
  },
];

// Component
export function TeacherAttendanceSection({ user }: { user: User }) {
  const [view, setView] = useState<'mark' | 'pending' | 'details'>('mark');
  const [selectedClass, setSelectedClass] = useState(mockClasses[0]);
  const [attendance, setAttendance] = useState<Record<number, 'present' | 'absent'>>(
    mockStudentsForAttendance.reduce(
      (acc, student) => ({ ...acc, [student.id]: student.status as 'present' | 'absent' }),
      {}
    )
  );
  const [viewingStudent, setViewingStudent] = useState<typeof mockStudentAttendanceRecords[0] | null>(null);

  const toggleAttendance = (id: number) => {
    setAttendance(prev => ({
      ...prev,
      [id]: prev[id] === 'present' ? 'absent' : 'present',
    }));
  };

  const submitAttendance = () => {
    alert('Attendance marked successfully!');
  };

  const handleRequest = (requestId: number, action: 'approve' | 'reject') => {
    alert(`Request ${action}d successfully!`);
  };

  // Render Buttons for Tab
  const renderTabButton = (label: string, key: 'mark' | 'pending' | 'details', badge?: number) => (
    <TouchableOpacity
      onPress={() => setView(key)}
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: view === key ? '#4f46e5' : '#e5e7eb',
        marginHorizontal: 4,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: view === key ? '#fff' : '#000', fontWeight: '600' }}>{label}</Text>
      {badge ? (
        <View
          style={{
            marginLeft: 6,
            backgroundColor: '#ef4444',
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 12 }}>{badge}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ padding: 16, flex: 1 }}>
      {/* Tab Buttons */}
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        {renderTabButton('Mark Attendance', 'mark')}
        {renderTabButton('Pending', 'pending', mockPendingRequests.length)}
        {renderTabButton('Student Details', 'details')}
      </View>

      {/* Mark Attendance View */}
      {view === 'mark' && (
        <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <Text style={{ fontWeight: '600', fontSize: 18, marginBottom: 12 }}>Class: {selectedClass}</Text>
          <Text style={{ marginBottom: 12 }}>
            Date: {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </Text>

          {mockStudentsForAttendance.map(student => {
            const isPresent = attendance[student.id] === 'present';
            return (
              <View
                key={student.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 12,
                  backgroundColor: isPresent ? '#d1fae5' : '#fee2e2',
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              >
                <View>
                  <Text style={{ fontWeight: '500' }}>{student.name}</Text>
                  <Text style={{ color: '#6b7280' }}>Roll No: {student.rollNo}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => setAttendance(prev => ({ ...prev, [student.id]: 'present' }))}
                    style={{
                      backgroundColor: isPresent ? '#16a34a' : '#fff',
                      borderWidth: isPresent ? 0 : 1,
                      borderColor: '#d1d5db',
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 8,
                      marginRight: 4,
                    }}
                  >
                    <Text style={{ color: isPresent ? '#fff' : '#000' }}>Present</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setAttendance(prev => ({ ...prev, [student.id]: 'absent' }))}
                    style={{
                      backgroundColor: !isPresent ? '#dc2626' : '#fff',
                      borderWidth: !isPresent ? 0 : 1,
                      borderColor: '#d1d5db',
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ color: !isPresent ? '#fff' : '#000' }}>Absent</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          <TouchableOpacity
            onPress={submitAttendance}
            style={{ marginTop: 12, backgroundColor: '#4f46e5', padding: 12, borderRadius: 8 }}
          >
            <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>Submit Attendance</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Pending Requests View */}
      {view === 'pending' && (
        <View style={{ marginBottom: 16 }}>
          {mockPendingRequests.length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#6b7280', marginVertical: 20 }}>No pending attendance requests</Text>
          ) : (
            mockPendingRequests.map(req => (
              <View
                key={req.id}
                style={{
                  padding: 12,
                  backgroundColor: '#fef3c7',
                  borderRadius: 12,
                  marginBottom: 12,
                }}
              >
                <Text style={{ fontWeight: '600' }}>{req.studentName}</Text>
                <Text style={{ color: '#6b7280', marginBottom: 4 }}>Roll: {req.rollNo} • {req.class}</Text>
                <Text style={{ color: '#6b7280', marginBottom: 4 }}>Date: {req.date} Time: {req.time}</Text>
                <Text style={{ color: '#6b7280', marginBottom: 4 }}>Reason: {req.reason}</Text>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                  <TouchableOpacity
                    onPress={() => handleRequest(req.id, 'approve')}
                    style={{ flex: 1, backgroundColor: '#16a34a', padding: 8, borderRadius: 6, marginRight: 4 }}
                  >
                    <Text style={{ color: '#fff', textAlign: 'center' }}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleRequest(req.id, 'reject')}
                    style={{ flex: 1, borderWidth: 1, borderColor: '#dc2626', padding: 8, borderRadius: 6 }}
                  >
                    <Text style={{ color: '#dc2626', textAlign: 'center' }}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      )}

      {/* Student Details View */}
      {view === 'details' && (
        <View>
          {mockStudentAttendanceRecords.map((student, idx) => (
            <View
              key={idx}
              style={{
                padding: 12,
                backgroundColor: '#fff',
                borderRadius: 12,
                marginBottom: 12,
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <View>
                  <Text style={{ fontWeight: '600' }}>{student.studentName}</Text>
                  <Text style={{ color: '#6b7280' }}>Roll: {student.rollNo} • {student.class}</Text>
                </View>
                <TouchableOpacity onPress={() => setViewingStudent(student)}>
                  <Text style={{ color: '#4f46e5', fontWeight: '600' }}>View</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ alignItems: 'center', backgroundColor: '#d1fae5', padding: 8, borderRadius: 8 }}>
                  <Text style={{ color: '#15803d' }}>{student.totalPresent}</Text>
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>Present</Text>
                </View>
                <View style={{ alignItems: 'center', backgroundColor: '#fee2e2', padding: 8, borderRadius: 8 }}>
                  <Text style={{ color: '#b91c1c' }}>{student.totalAbsent}</Text>
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>Absent</Text>
                </View>
                <View style={{ alignItems: 'center', backgroundColor: '#dbeafe', padding: 8, borderRadius: 8 }}>
                  <Text style={{ color: '#1d4ed8' }}>{student.percentage}%</Text>
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>Percentage</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

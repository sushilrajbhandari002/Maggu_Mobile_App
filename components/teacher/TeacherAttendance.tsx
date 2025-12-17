import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { User } from '../../app/index';
import { CheckSquare, Clock, Check, X } from 'lucide-react-native';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface TeacherAttendanceProps {
  user: User;
}

const mockStudents = [
  { id: 's1', name: 'Alice Johnson', rollNumber: '101', present: false },
  { id: 's2', name: 'Bob Wilson', rollNumber: '102', present: false },
  { id: 's3', name: 'Charlie Brown', rollNumber: '103', present: false },
  { id: 's4', name: 'Diana Prince', rollNumber: '104', present: false },
  { id: 's5', name: 'Ethan Hunt', rollNumber: '105', present: false },
];

const mockPendingAttendance = [
  {
    id: 'p1',
    studentName: 'Alice Johnson',
    rollNumber: '101',
    date: '2025-11-23',
    time: '08:15 AM',
    location: '27.7172°N, 85.3240°E',
    selfieUrl: 'https://via.placeholder.com/100',
  },
  {
    id: 'p2',
    studentName: 'Bob Wilson',
    rollNumber: '102',
    date: '2025-11-23',
    time: '08:20 AM',
    location: '27.7172°N, 85.3240°E',
    selfieUrl: 'https://via.placeholder.com/100',
  },
];

export function TeacherAttendance({ user }: TeacherAttendanceProps) {
  const [students, setStudents] = useState(mockStudents);
  const [pendingRequests, setPendingRequests] = useState(mockPendingAttendance);
  const [tab, setTab] = useState<'mark' | 'pending'>('mark');

  const toggleAttendance = (id: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, present: !s.present } : s));
  };

  const handleSubmitAttendance = () => {
    const presentCount = students.filter(s => s.present).length;
    alert(`Attendance submitted: ${presentCount}/${students.length} present`);
  };

  const handleApprove = (id: string) => {
    setPendingRequests(pendingRequests.filter(r => r.id !== id));
    alert('Attendance request approved');
  };

  const handleReject = (id: string) => {
    setPendingRequests(pendingRequests.filter(r => r.id !== id));
    alert('Attendance request rejected');
  };

  if (!user.classTeacherOf) {
    return (
      <Card style={{ padding: 16 }}>
        <Text style={{ textAlign: 'center', color: '#6b7280' }}>
          You need to be a class teacher to mark attendance
        </Text>
      </Card>
    );
  }

  return (
    <ScrollView style={{ padding: 16, flex: 1 }}>
      {/* Tabs */}
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TouchableOpacity
          style={{ flex: 1, padding: 12, backgroundColor: tab === 'mark' ? '#4f46e5' : '#e5e7eb', borderRadius: 8, marginRight: 4 }}
          onPress={() => setTab('mark')}
        >
          <Text style={{ color: tab === 'mark' ? '#fff' : '#000', textAlign: 'center' }}>Mark Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, padding: 12, backgroundColor: tab === 'pending' ? '#4f46e5' : '#e5e7eb', borderRadius: 8, marginLeft: 4 }}
          onPress={() => setTab('pending')}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: tab === 'pending' ? '#fff' : '#000' }}>Pending Requests</Text>
            {pendingRequests.length > 0 && (
              <Badge style={{ marginLeft: 6 }}>{pendingRequests.length}</Badge>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {tab === 'mark' ? (
        <Card style={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckSquare size={24} color="#16a34a" />
              <Text style={{ marginLeft: 8, fontSize: 16, fontWeight: '600' }}>
                Mark Attendance - {user.classTeacherOf}
              </Text>
            </View>
            <Text style={{ color: '#6b7280' }}>{new Date().toLocaleDateString()}</Text>
          </View>

          {students.map(student => (
            <View key={student.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: '#f9fafb', borderRadius: 8, marginBottom: 8 }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => toggleAttendance(student.id)}>
                <View style={{
                  width: 20, height: 20, borderRadius: 4, borderWidth: 1,
                  borderColor: '#d1d5db', backgroundColor: student.present ? '#16a34a' : '#fff',
                  justifyContent: 'center', alignItems: 'center', marginRight: 8
                }}>
                  {student.present && <Check size={16} color="#fff" />}
                </View>
                <View>
                  <Text style={{ fontWeight: '500' }}>{student.name}</Text>
                  <Text style={{ color: '#6b7280' }}>Roll: {student.rollNumber}</Text>
                </View>
              </TouchableOpacity>
              <Text style={{
                paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12,
                color: student.present ? '#15803d' : '#b91c1c',
                backgroundColor: student.present ? '#d1fae5' : '#fee2e2',
                fontSize: 12
              }}>
                {student.present ? 'Present' : 'Absent'}
              </Text>
            </View>
          ))}

          <TouchableOpacity onPress={handleSubmitAttendance} style={{ marginTop: 12, padding: 12, backgroundColor: '#4f46e5', borderRadius: 8 }}>
            <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>Submit Attendance</Text>
          </TouchableOpacity>
        </Card>
      ) : (
        <View>
          {pendingRequests.length === 0 ? (
            <Card style={{ padding: 16 }}>
              <Text style={{ textAlign: 'center', color: '#6b7280' }}>No pending attendance requests</Text>
            </Card>
          ) : (
            pendingRequests.map(request => (
              <Card key={request.id} style={{ padding: 12, marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <Image source={{ uri: request.selfieUrl }} style={{ width: 60, height: 60, borderRadius: 8, marginRight: 12 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: '600', marginBottom: 2 }}>{request.studentName}</Text>
                    <Text style={{ color: '#6b7280', marginBottom: 4 }}>Roll: {request.rollNumber}</Text>
                    <View style={{ flexDirection: 'row', gap: 12, marginBottom: 4 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
                        <Clock size={16} color="#6b7280" />
                        <Text style={{ color: '#6b7280', marginLeft: 4 }}>{request.time}</Text>
                      </View>
                      <Text style={{ color: '#6b7280' }}>{request.date}</Text>
                    </View>
                    <Text style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Location: {request.location}</Text>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      <TouchableOpacity onPress={() => handleApprove(request.id)} style={{ flex: 1, backgroundColor: '#16a34a', padding: 8, borderRadius: 6 }}>
                        <Text style={{ color: '#fff', textAlign: 'center' }}>Approve</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleReject(request.id)} style={{ flex: 1, borderWidth: 1, borderColor: '#6b7280', padding: 8, borderRadius: 6 }}>
                        <Text style={{ textAlign: 'center', color: '#6b7280' }}>Reject</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Card>
            ))
          )}
        </View>
      )}
    </ScrollView>
  );
}

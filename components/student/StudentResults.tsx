import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Award, TrendingUp } from 'lucide-react-native';
import { User } from '../../app/index';
import { Card } from '../ui/card'; // Simple RN Card component
import { Picker } from '@react-native-picker/picker';

interface StudentResultsProps {
  user: User;
}

const exams = ['First Terminal', 'Mid Terminal', 'Final Terminal'];

const mockResults = {
  'First Terminal': [
    { subject: 'Mathematics', marks: 85, total: 100, grade: 'A' },
    { subject: 'Physics', marks: 78, total: 100, grade: 'B+' },
    { subject: 'Chemistry', marks: 92, total: 100, grade: 'A+' },
    { subject: 'Biology', marks: 88, total: 100, grade: 'A' },
    { subject: 'English', marks: 82, total: 100, grade: 'A' },
  ],
  'Mid Terminal': [
    { subject: 'Mathematics', marks: 90, total: 100, grade: 'A+' },
    { subject: 'Physics', marks: 82, total: 100, grade: 'A' },
    { subject: 'Chemistry', marks: 88, total: 100, grade: 'A' },
    { subject: 'Biology', marks: 85, total: 100, grade: 'A' },
    { subject: 'English', marks: 87, total: 100, grade: 'A' },
  ],
  'Final Terminal': [],
};

export function StudentResults({ user }: StudentResultsProps) {
  const [selectedExam, setSelectedExam] = useState('Mid Terminal');

  const results = mockResults[selectedExam as keyof typeof mockResults];
  const totalMarks = results.reduce((sum, r) => sum + r.marks, 0);
  const totalPossible = results.reduce((sum, r) => sum + r.total, 0);
  const percentage = totalPossible > 0 ? ((totalMarks / totalPossible) * 100).toFixed(2) : '0';

  return (
    <ScrollView style={{ padding: 16 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <Award size={24} color="#16a34a" />
        <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 8 }}>Exam Results</Text>
      </View>

      {/* Picker for Exam Selection */}
      <Card style={{ padding: 12, marginBottom: 16 }}>
        <Picker selectedValue={selectedExam} onValueChange={(itemValue) => setSelectedExam(itemValue)}>
          {exams.map((exam) => (
            <Picker.Item key={exam} label={exam} value={exam} />
          ))}
        </Picker>
      </Card>

      {results.length > 0 ? (
        <>
          {/* Summary Card */}
          <Card style={{ padding: 16, marginBottom: 16, backgroundColor: '#d1fae5' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ color: '#4b5563', marginBottom: 4 }}>Overall Percentage</Text>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>{percentage}%</Text>
              </View>
              <View style={{ padding: 12, backgroundColor: '#fff', borderRadius: 8 }}>
                <TrendingUp size={28} color="#16a34a" />
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
              <Text>Total: {totalMarks}/{totalPossible}</Text>
              <Text style={{ color: '#16a34a' }}>
                {Number(percentage) >= 90 ? 'Excellent!' :
                 Number(percentage) >= 75 ? 'Good Job!' :
                 Number(percentage) >= 60 ? 'Keep Improving!' : 'Need More Effort'}
              </Text>
            </View>
          </Card>

          {/* Subject-wise Results */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Subject-wise Performance</Text>
            {results.map((result, idx) => (
              <Card key={idx} style={{ padding: 12, marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text style={{ fontWeight: '600' }}>{result.subject}</Text>
                  <Text
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                      fontSize: 12,
                      color: result.grade.includes('A') ? '#15803d' :
                             result.grade.includes('B') ? '#1d4ed8' : '#b45309',
                      backgroundColor: result.grade.includes('A') ? '#d1fae5' :
                                   result.grade.includes('B') ? '#dbeafe' : '#fef3c7',
                    }}
                  >
                    Grade: {result.grade}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: '#e5e7eb', marginRight: 8 }}>
                    <View
                      style={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor:
                          result.marks >= 90 ? '#16a34a' :
                          result.marks >= 75 ? '#1d4ed8' :
                          result.marks >= 60 ? '#ca8a04' : '#dc2626',
                        width: `${(result.marks / result.total) * 100}%`,
                      }}
                    />
                  </View>
                  <Text>{result.marks}/{result.total}</Text>
                </View>
              </Card>
            ))}
          </View>
        </>
      ) : (
        <View style={{ padding: 16, alignItems: 'center' }}>
          <Text style={{ color: '#6b7280' }}>Results not published yet</Text>
        </View>
      )}
    </ScrollView>
  );
}

import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Card } from '../ui/card'; // Your Card component
import { Trophy, TrendingUp, BookOpen } from 'lucide-react-native';
import { User } from '../../app/index';

interface StudentAcademicsSectionProps {
  user: User;
}

const mockExamResults = [
  {
    exam: 'Half Yearly Examination 2025',
    date: '2025-11-15',
    results: [
      { subject: 'Mathematics', fullMarks: 100, obtained: 92, grade: 'A+' },
      { subject: 'English', fullMarks: 100, obtained: 88, grade: 'A+' },
      { subject: 'Science', fullMarks: 100, obtained: 85, grade: 'A' },
      { subject: 'Social Studies', fullMarks: 100, obtained: 90, grade: 'A+' },
      { subject: 'Hindi', fullMarks: 100, obtained: 82, grade: 'A' },
      { subject: 'Computer', fullMarks: 50, obtained: 45, grade: 'A+' },
    ],
    totalObtained: 482,
    totalMarks: 550,
    percentage: 87.6,
    rank: 3,
  },
  {
    exam: 'First Term Examination 2025',
    date: '2025-09-20',
    results: [
      { subject: 'Mathematics', fullMarks: 100, obtained: 88, grade: 'A+' },
      { subject: 'English', fullMarks: 100, obtained: 85, grade: 'A' },
      { subject: 'Science', fullMarks: 100, obtained: 90, grade: 'A+' },
      { subject: 'Social Studies', fullMarks: 100, obtained: 87, grade: 'A+' },
      { subject: 'Hindi', fullMarks: 100, obtained: 80, grade: 'A' },
      { subject: 'Computer', fullMarks: 50, obtained: 42, grade: 'A' },
    ],
    totalObtained: 472,
    totalMarks: 550,
    percentage: 85.8,
    rank: 5,
  },
];

const mockSubjectPerformance = [
  {
    subject: 'Mathematics',
    average: 90,
    trend: 'up',
    exams: [
      { name: 'Half Yearly', marks: 92, outOf: 100 },
      { name: 'First Term', marks: 88, outOf: 100 },
      { name: 'Unit Test 2', marks: 85, outOf: 50 },
      { name: 'Unit Test 1', marks: 42, outOf: 50 },
    ],
  },
  {
    subject: 'English',
    average: 86.5,
    trend: 'up',
    exams: [
      { name: 'Half Yearly', marks: 88, outOf: 100 },
      { name: 'First Term', marks: 85, outOf: 100 },
      { name: 'Unit Test 2', marks: 40, outOf: 50 },
      { name: 'Unit Test 1', marks: 38, outOf: 50 },
    ],
  },
  // Add other subjects similarly...
];

export function StudentAcademicsSection({ user }: StudentAcademicsSectionProps) {
  const [selectedExam, setSelectedExam] = useState(mockExamResults[0].exam);
  const [selectedSubject, setSelectedSubject] = useState(mockSubjectPerformance[0].subject);

  const currentExam = mockExamResults.find((e) => e.exam === selectedExam);
  const currentSubject = mockSubjectPerformance.find((s) => s.subject === selectedSubject);

  return (
    <ScrollView style={styles.container}>
      {/* Exam Results */}
      <Card style={styles.card}>
        <View style={styles.header}>
          <Trophy width={20} height={20} color="#16a34a" />
          <Text style={styles.headerText}>Exam Results</Text>
        </View>

        {/* Exam Picker */}
        <Picker
          selectedValue={selectedExam}
          onValueChange={(itemValue) => setSelectedExam(itemValue)}
          style={styles.picker}
        >
          {mockExamResults.map((exam) => (
            <Picker.Item key={exam.exam} label={exam.exam} value={exam.exam} />
          ))}
        </Picker>

        {currentExam && (
          <View>
            {/* Overall Performance */}
            <View style={styles.overallPerf}>
              <View style={styles.row}>
                <View>
                  <Text style={styles.label}>Total Marks</Text>
                  <Text style={styles.value}>
                    {currentExam.totalObtained}/{currentExam.totalMarks}
                  </Text>
                </View>
                <View>
                  <Text style={styles.label}>Percentage</Text>
                  <Text style={[styles.value, { color: '#16a34a' }]}>{currentExam.percentage}%</Text>
                </View>
              </View>
              <View style={styles.rankRow}>
                <Text style={styles.label}>Class Rank</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Trophy width={16} height={16} color="#16a34a" />
                  <Text style={{ color: '#16a34a' }}>Rank {currentExam.rank}</Text>
                </View>
              </View>
            </View>

            {/* Subject-wise Marks */}
            <View style={{ marginTop: 10 }}>
              {currentExam.results.map((res, idx) => (
                <View key={idx} style={styles.subjectRow}>
                  <View style={styles.subjectHeader}>
                    <Text>{res.subject}</Text>
                    <View style={styles.gradeBadge}>
                      <Text style={styles.gradeText}>{res.grade}</Text>
                    </View>
                  </View>
                  <View style={styles.progressBarBackground}>
                    <View
                      style={[
                        styles.progressBarFill,
                        { width: `${(res.obtained / res.fullMarks) * 100}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressLabel}>
                    {res.obtained}/{res.fullMarks}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Card>

      {/* Subject-wise Performance */}
      <Card style={styles.card}>
        <View style={styles.header}>
          <TrendingUp width={20} height={20} color="#16a34a" />
          <Text style={styles.headerText}>Subject-wise Performance</Text>
        </View>

        {/* Subject Picker */}
        <Picker
          selectedValue={selectedSubject}
          onValueChange={(val) => setSelectedSubject(val)}
          style={styles.picker}
        >
          {mockSubjectPerformance.map((subj) => (
            <Picker.Item key={subj.subject} label={subj.subject} value={subj.subject} />
          ))}
        </Picker>

        {currentSubject && (
          <View>
            {/* Average Score */}
            <View style={styles.overallPerf}>
              <View style={styles.row}>
                <Text style={styles.label}>Average Score</Text>
                <Text style={[styles.value, { color: '#2563eb' }]}>{currentSubject.average}%</Text>
              </View>
              <View
                style={[
                  styles.trendBadge,
                  { backgroundColor: currentSubject.trend === 'up' ? '#d1fae5' : '#fee2e2' },
                ]}
              >
                <TrendingUp
                  width={16}
                  height={16}
                  color={currentSubject.trend === 'up' ? '#16a34a' : '#dc2626'}
                  style={currentSubject.trend === 'down' ? { transform: [{ rotate: '180deg' }] } : {}}
                />
                <Text
                  style={{
                    color: currentSubject.trend === 'up' ? '#16a34a' : '#dc2626',
                    marginLeft: 4,
                  }}
                >
                  {currentSubject.trend === 'up' ? 'Improving' : 'Needs Attention'}
                </Text>
              </View>
            </View>

            {/* Performance Timeline */}
            {currentSubject.exams.map((exam, idx) => {
              const percent = (exam.marks / exam.outOf) * 100;
              return (
                <View key={idx} style={styles.subjectRow}>
                  <View style={styles.subjectHeader}>
                    <Text>{exam.name}</Text>
                    <Text>
                      {exam.marks}/{exam.outOf}
                    </Text>
                  </View>
                  <View style={styles.progressBarBackground}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {
                          width: `${percent}%`,
                          backgroundColor:
                            percent >= 90
                              ? '#16a34a'
                              : percent >= 75
                              ? '#2563eb'
                              : percent >= 60
                              ? '#facc15'
                              : '#dc2626',
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressLabel}>{percent.toFixed(0)}%</Text>
                </View>
              );
            })}
          </View>
        )}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { padding: 10, marginBottom: 12, borderRadius: 8 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 6 },
  headerText: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  picker: { marginVertical: 8 },
  overallPerf: {
    padding: 10,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    marginBottom: 10,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontSize: 12, color: '#4b5563' },
  value: { fontSize: 20, fontWeight: 'bold' },
  rankRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  subjectRow: { marginBottom: 8 },
  subjectHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  gradeBadge: { paddingHorizontal: 6, paddingVertical: 2, backgroundColor: '#d1fae5', borderRadius: 4 },
  gradeText: { color: '#16a34a', fontWeight: 'bold' },
  progressBarBackground: { height: 6, backgroundColor: '#e5e7eb', borderRadius: 3 },
  progressBarFill: { height: 6, borderRadius: 3 },
  progressLabel: { fontSize: 10, color: '#4b5563', marginTop: 2 },
  trendBadge: { flexDirection: 'row', alignItems: 'center', padding: 4, borderRadius: 12, marginTop: 6 },
});

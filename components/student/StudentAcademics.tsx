import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card } from '../ui/card'; // Keep your custom Card component
import { Trophy, TrendingUp, BookOpen } from 'lucide-react-native';
import { User } from '../../app/index';

interface StudentAcademicsProps {
  user: User;
}

const examResults = [
  {
    exam: 'Mid-term Exam 2025',
    date: '2025-11-15',
    subjects: [
      { name: 'Mathematics', marks: 85, totalMarks: 100, grade: 'A' },
      { name: 'English', marks: 78, totalMarks: 100, grade: 'B+' },
      { name: 'Science', marks: 92, totalMarks: 100, grade: 'A+' },
      { name: 'Social Studies', marks: 80, totalMarks: 100, grade: 'A-' },
      { name: 'Hindi', marks: 75, totalMarks: 100, grade: 'B+' },
    ],
    totalMarks: 410,
    totalPossible: 500,
    percentage: 82,
    rank: 5,
  },
  {
    exam: 'First Term Exam 2025',
    date: '2025-09-20',
    subjects: [
      { name: 'Mathematics', marks: 80, totalMarks: 100, grade: 'A-' },
      { name: 'English', marks: 82, totalMarks: 100, grade: 'A' },
      { name: 'Science', marks: 88, totalMarks: 100, grade: 'A' },
      { name: 'Social Studies', marks: 76, totalMarks: 100, grade: 'B+' },
      { name: 'Hindi', marks: 79, totalMarks: 100, grade: 'B+' },
    ],
    totalMarks: 405,
    totalPossible: 500,
    percentage: 81,
    rank: 7,
  },
];

const subjectPerformance = [
  { subject: 'Mathematics', currentMarks: 85, previousMarks: 80, average: 82.5, trend: 'up', color: '#3b82f6' }, // blue
  { subject: 'English', currentMarks: 78, previousMarks: 82, average: 80, trend: 'down', color: '#a855f7' }, // purple
  { subject: 'Science', currentMarks: 92, previousMarks: 88, average: 90, trend: 'up', color: '#22c55e' }, // green
  { subject: 'Social Studies', currentMarks: 80, previousMarks: 76, average: 78, trend: 'up', color: '#f97316' }, // orange
  { subject: 'Hindi', currentMarks: 75, previousMarks: 79, average: 77, trend: 'down', color: '#ef4444' }, // red
];

export function StudentAcademics({ user }: StudentAcademicsProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Exam Results */}
      <Card style={styles.card}>
        <View style={styles.header}>
          <Trophy width={20} height={20} color="#16a34a" />
          <Text style={styles.headerText}>Exam Results</Text>
        </View>

        {examResults.map((exam, idx) => (
          <View key={idx} style={styles.examContainer}>
            {/* Exam Header */}
            <View style={styles.examHeader}>
              <View>
                <Text style={styles.examTitle}>{exam.exam}</Text>
                <Text style={styles.examDate}>{new Date(exam.date).toLocaleDateString()}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.examPercentage}>{exam.percentage}%</Text>
                <Text style={styles.examRank}>Rank: #{exam.rank}</Text>
              </View>
            </View>

            {/* Subject-wise Marks */}
            {exam.subjects.map((sub, subIdx) => (
              <View key={subIdx} style={styles.subjectRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <BookOpen width={16} height={16} color="#374151" />
                  <Text style={styles.subjectName}>{sub.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text>{sub.marks}/{sub.totalMarks}</Text>
                  <View style={[
                    styles.gradeBadge,
                    sub.grade.startsWith('A') ? { backgroundColor: '#d1fae5' } : sub.grade.startsWith('B') ? { backgroundColor: '#dbeafe' } : { backgroundColor: '#ffedd5' }
                  ]}>
                    <Text style={[
                      sub.grade.startsWith('A') ? { color: '#065f46' } : sub.grade.startsWith('B') ? { color: '#1d4ed8' } : { color: '#c2410c' }
                    ]}>{sub.grade}</Text>
                  </View>
                </View>
              </View>
            ))}

            <View style={styles.totalRow}>
              <Text>Total</Text>
              <Text>{exam.totalMarks}/{exam.totalPossible}</Text>
            </View>
          </View>
        ))}
      </Card>

      {/* Subject-wise Performance */}
      <Card style={styles.card}>
        <View style={styles.header}>
          <TrendingUp width={20} height={20} color="#16a34a" />
          <Text style={styles.headerText}>Subject-wise Performance</Text>
        </View>

        {subjectPerformance.map((sub, idx) => (
          <View key={idx} style={styles.subjectPerfContainer}>
            <View style={styles.subjectPerfHeader}>
              <Text style={styles.subjectTitle}>{sub.subject}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <TrendingUp
                  width={16}
                  height={16}
                  color={sub.trend === 'up' ? '#16a34a' : '#ef4444'}
                  style={sub.trend === 'down' ? { transform: [{ rotate: '180deg' }] } : {}}
                />
                <Text style={{ color: sub.trend === 'up' ? '#16a34a' : '#ef4444', fontSize: 12 }}>
                  {sub.trend === 'up' ? '+' : '-'}
                  {Math.abs(sub.currentMarks - sub.previousMarks)} marks
                </Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={{ marginVertical: 4 }}>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${sub.currentMarks}%`, backgroundColor: sub.color }]} />
              </View>
              <View style={styles.progressLabels}>
                <Text style={styles.progressLabel}>Current Performance</Text>
                <Text style={styles.progressLabel}>{sub.currentMarks}%</Text>
              </View>
            </View>

            {/* Stats */}
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Current</Text>
                <Text style={styles.statValue}>{sub.currentMarks}%</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Previous</Text>
                <Text style={styles.statValue}>{sub.previousMarks}%</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Average</Text>
                <Text style={styles.statValue}>{sub.average}%</Text>
              </View>
            </View>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { padding: 10, marginBottom: 12, borderRadius: 8 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 6 },
  headerText: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  examContainer: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, marginBottom: 10 },
  examHeader: { backgroundColor: '#16a34a', padding: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  examTitle: { color: '#ffffff', fontWeight: 'bold', fontSize: 14 },
  examDate: { color: '#d1fae5', fontSize: 12 },
  examPercentage: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  examRank: { color: '#d1fae5', fontSize: 12 },
  subjectRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 6, backgroundColor: '#f9fafb', marginVertical: 2, borderRadius: 4 },
  subjectName: { color: '#111827' },
  gradeBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 6, backgroundColor: '#d1fae5', borderTopWidth: 2, borderTopColor: '#16a34a', marginTop: 6 },
  subjectPerfContainer: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 8, marginBottom: 10 },
  subjectPerfHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  subjectTitle: { fontWeight: 'bold', color: '#111827' },
  progressBarBg: { height: 6, backgroundColor: '#e5e7eb', borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: 6, borderRadius: 3 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', fontSize: 12, marginTop: 2 },
  progressLabel: { fontSize: 10, color: '#4b5563' },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  statBox: { flex: 1, backgroundColor: '#f9fafb', padding: 6, marginHorizontal: 2, borderRadius: 4, alignItems: 'center' },
  statLabel: { fontSize: 10, color: '#6b7280' },
  statValue: { color: '#111827', fontWeight: 'bold' },
});

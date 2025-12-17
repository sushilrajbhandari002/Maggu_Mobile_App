import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import { BookOpen, Download, FileText } from 'lucide-react-native';
import { User } from '../../app/index';
import { Button } from '../ui/button';

interface StudentMaterialsProps {
  user: User;
}

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];

const mockMaterials = [
  { id: 1, subject: 'Mathematics', title: 'Chapter 5 - Algebra Notes', uploadedBy: 'John Doe', date: '2025-11-20', type: 'PDF' },
  { id: 2, subject: 'Physics', title: "Newton's Laws of Motion", uploadedBy: 'Sarah Smith', date: '2025-11-18', type: 'PDF' },
  { id: 3, subject: 'Mathematics', title: 'Quadratic Equations Practice', uploadedBy: 'John Doe', date: '2025-11-15', type: 'DOC' },
  { id: 4, subject: 'Chemistry', title: 'Periodic Table Reference', uploadedBy: 'John Doe', date: '2025-11-12', type: 'PDF' },
];

export function StudentMaterials({ user }: StudentMaterialsProps) {
  const [selectedSubject, setSelectedSubject] = useState('all');

  const filteredMaterials = selectedSubject === 'all'
    ? mockMaterials
    : mockMaterials.filter(m => m.subject === selectedSubject);

  const handleDownload = (material: typeof mockMaterials[0]) => {
    Toast.show({ type: 'success', text1: `Downloading ${material.title}` });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <BookOpen width={20} height={20} color="#111827" />
          <Text style={styles.headerText}>Study Materials</Text>
        </View>

        {/* Subject Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedSubject}
            onValueChange={(value) => setSelectedSubject(value)}
            style={styles.picker}
          >
            <Picker.Item label="All Subjects" value="all" />
            {subjects.map((subj) => (
              <Picker.Item key={subj} label={subj} value={subj} />
            ))}
          </Picker>
        </View>

        {/* Materials List */}
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map((material) => (
            <View key={material.id} style={styles.materialCard}>
              <View style={styles.iconContainer}>
                <FileText width={20} height={20} color="#2563eb" />
              </View>
              <View style={styles.materialContent}>
                <Text style={styles.materialTitle}>{material.title}</Text>
                <View style={styles.tagRow}>
                  <View style={styles.subjectTag}>
                    <Text style={styles.tagText}>{material.subject}</Text>
                  </View>
                  <View style={styles.typeTag}>
                    <Text style={styles.tagText}>{material.type}</Text>
                  </View>
                </View>
                <Text style={styles.uploadedBy}>Uploaded by: {material.uploadedBy}</Text>
                <Text style={styles.date}>{new Date(material.date).toLocaleDateString()}</Text>
              </View>
              <Button onPress={() => handleDownload(material)} style={styles.downloadBtn}>
                <Download width={16} height={16} color="#fff" />
              </Button>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={{ color: '#6b7280' }}>No materials available for this subject</Text>
          </View>
        )}
      </View>

      <Toast position="bottom" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 12 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  headerText: { fontSize: 16, fontWeight: 'bold', marginLeft: 6, color: '#111827' },
  pickerContainer: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 6, marginBottom: 12 },
  picker: { height: 40 },
  materialCard: { flexDirection: 'row', alignItems: 'flex-start', padding: 10, backgroundColor: '#f9fafb', borderRadius: 8, marginBottom: 8 },
  iconContainer: { padding: 6, backgroundColor: '#dbeafe', borderRadius: 6, marginRight: 8 },
  materialContent: { flex: 1 },
  materialTitle: { fontSize: 14, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  tagRow: { flexDirection: 'row', gap: 4, marginBottom: 4 },
  subjectTag: { backgroundColor: '#d1fae5', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  typeTag: { backgroundColor: '#e5e7eb', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  tagText: { fontSize: 10, color: '#111827' },
  uploadedBy: { fontSize: 12, color: '#4b5563', marginBottom: 2 },
  date: { fontSize: 10, color: '#6b7280' },
  downloadBtn: { backgroundColor: '#16a34a', padding: 8, borderRadius: 6 },
  emptyState: { padding: 20, alignItems: 'center' },
});

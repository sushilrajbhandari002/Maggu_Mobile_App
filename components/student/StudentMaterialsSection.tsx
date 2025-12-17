import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import { FolderOpen, Download, Eye, FileText, File, X } from 'lucide-react-native';
import { User } from '../../app/index';
import { Button } from '../ui/button';

interface StudentMaterialsSectionProps {
  user: User;
}

const mockClasses = ['Class 10', 'Class 9', 'Class 8', 'Class 7', 'Class 6'];
const mockSubjects = ['Mathematics', 'English', 'Science', 'Social Studies', 'Hindi', 'Computer'];

const mockMaterials = [
  {
    id: 1,
    title: 'Quadratic Equations - Chapter Notes',
    subject: 'Mathematics',
    class: 'Class 10',
    type: 'PDF',
    size: '2.5 MB',
    uploadedBy: 'Mr. Sharma',
    uploadedOn: '2025-12-10',
    url: '#'
  },
  {
    id: 2,
    title: 'Periodic Table and Chemical Bonding',
    subject: 'Science',
    class: 'Class 10',
    type: 'PDF',
    size: '3.2 MB',
    uploadedBy: 'Dr. Kumar',
    uploadedOn: '2025-12-09',
    url: '#'
  },
  // ... add other materials here
];

export function StudentMaterialsSection({ user }: StudentMaterialsSectionProps) {
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [viewingFile, setViewingFile] = useState<typeof mockMaterials[0] | null>(null);

  const filteredMaterials = mockMaterials.filter(material => {
    const classMatch = material.class === selectedClass;
    const subjectMatch = selectedSubject === 'All Subjects' || material.subject === selectedSubject;
    return classMatch && subjectMatch;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText width={40} height={40} color="#dc2626" />;
      case 'DOCX':
        return <FileText width={40} height={40} color="#2563eb" />;
      case 'PPTX':
        return <FileText width={40} height={40} color="#f97316" />;
      default:
        return <File width={40} height={40} color="#4b5563" />;
    }
  };

  const viewFile = (material: typeof mockMaterials[0]) => setViewingFile(material);

  const downloadFile = (material: typeof mockMaterials[0]) => {
    Toast.show({ type: 'success', text1: `Downloading ${material.title}` });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Filters */}
      <View style={styles.filterRow}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Class</Text>
          <Picker
            selectedValue={selectedClass}
            onValueChange={(value) => setSelectedClass(value)}
            style={styles.picker}
          >
            {mockClasses.map(cls => <Picker.Item key={cls} label={cls} value={cls} />)}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Subject</Text>
          <Picker
            selectedValue={selectedSubject}
            onValueChange={(value) => setSelectedSubject(value)}
            style={styles.picker}
          >
            <Picker.Item label="All Subjects" value="All Subjects" />
            {mockSubjects.map(subj => <Picker.Item key={subj} label={subj} value={subj} />)}
          </Picker>
        </View>
      </View>

      {/* Materials List */}
      {filteredMaterials.length === 0 ? (
        <View style={styles.emptyState}>
          <FolderOpen width={60} height={60} color="#9ca3af" />
          <Text style={styles.emptyText}>No materials found for selected filters</Text>
        </View>
      ) : (
        filteredMaterials.map(material => (
          <View key={material.id} style={styles.materialCard}>
            <View style={styles.icon}>{getFileIcon(material.type)}</View>
            <View style={styles.materialInfo}>
              <Text style={styles.title}>{material.title}</Text>
              <Text style={styles.subtitle}>
                {material.subject} • {material.class} • {material.type}
              </Text>
              <Text style={styles.details}>
                Uploaded by {material.uploadedBy} • {new Date(material.uploadedOn).toLocaleDateString()} • Size: {material.size}
              </Text>
            </View>
            <View style={styles.actions}>
              <Button onPress={() => viewFile(material)} style={styles.actionBtn}>
                <Eye width={16} height={16} color="#fff" />
              </Button>
              <Button onPress={() => downloadFile(material)} style={styles.actionBtn}>
                <Download width={16} height={16} color="#fff" />
              </Button>
            </View>
          </View>
        ))
      )}

      {/* File Viewer Modal */}
      <Modal visible={!!viewingFile} transparent animationType="slide" onRequestClose={() => setViewingFile(null)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{viewingFile?.title}</Text>
              <TouchableOpacity onPress={() => setViewingFile(null)}>
                <X width={20} height={20} color="#111827" />
              </TouchableOpacity>
            </View>
            {viewingFile && (
              <View style={styles.modalBody}>
                <View style={styles.fileMeta}>
                  <Text style={styles.metaText}>{viewingFile.subject} • {viewingFile.class} • {viewingFile.uploadedBy}</Text>
                  <Text style={styles.metaText}>{new Date(viewingFile.uploadedOn).toLocaleDateString()} • {viewingFile.size}</Text>
                </View>
                <View style={styles.filePreview}>
                  {getFileIcon(viewingFile.type)}
                  <Text style={styles.previewText}>File preview not available in demo mode</Text>
                </View>
                <Button onPress={() => downloadFile(viewingFile)} style={styles.downloadBtn}>
                  <Download width={16} height={16} color="#fff" />
                  <Text style={{ color: '#fff', marginLeft: 4 }}>Download File</Text>
                </Button>
              </View>
            )}
          </View>
        </View>
      </Modal>

      <Toast position="bottom" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  filterRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  pickerContainer: { flex: 1, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 6 },
  label: { fontSize: 12, color: '#6b7280', padding: 4 },
  picker: { height: 40 },
  materialCard: { flexDirection: 'row', padding: 10, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: '#e5e7eb' },
  icon: { justifyContent: 'center', marginRight: 8 },
  materialInfo: { flex: 1 },
  title: { fontSize: 14, fontWeight: 'bold', marginBottom: 2, color: '#111827' },
  subtitle: { fontSize: 12, color: '#4b5563', marginBottom: 2 },
  details: { fontSize: 10, color: '#6b7280' },
  actions: { justifyContent: 'space-between' },
  actionBtn: { backgroundColor: '#16a34a', padding: 6, borderRadius: 6, marginBottom: 4 },
  emptyState: { padding: 20, alignItems: 'center' },
  emptyText: { color: '#6b7280', marginTop: 8 },
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '90%', backgroundColor: '#fff', borderRadius: 8, padding: 12 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  modalTitle: { fontWeight: 'bold', fontSize: 16, flex: 1 },
  modalBody: { alignItems: 'center' },
  fileMeta: { marginBottom: 12 },
  metaText: { fontSize: 12, color: '#6b7280' },
  filePreview: { backgroundColor: '#f3f4f6', padding: 20, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  previewText: { marginTop: 8, fontSize: 12, color: '#6b7280', textAlign: 'center' },
  downloadBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#16a34a', padding: 8, borderRadius: 6 }
});

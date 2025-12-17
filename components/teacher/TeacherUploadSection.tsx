import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card, Button, TextInput, Menu } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { User } from '../../app/index';

interface TeacherUploadSectionProps {
  user: User;
}

const mockClasses = ['Class 10', 'Class 9', 'Class 8', 'Class 7', 'Class 6'];
const mockSubjects = ['Mathematics', 'English', 'Science', 'Social Studies', 'Hindi', 'Computer'];

const mockUploadedMaterials = [
  {
    id: 1,
    title: 'Quadratic Equations - Chapter Notes',
    subject: 'Mathematics',
    class: 'Class 10',
    type: 'PDF',
    size: '2.5 MB',
    uploadedOn: '2025-12-10',
    downloads: 45,
  },
  {
    id: 2,
    title: 'Trigonometry - Practice Questions',
    subject: 'Mathematics',
    class: 'Class 10',
    type: 'PDF',
    size: '1.2 MB',
    uploadedOn: '2025-12-04',
    downloads: 38,
  },
];

export function TeacherUploadSection({ user }: TeacherUploadSectionProps) {
  const [view, setView] = useState<'upload' | 'existing'>('upload');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [classMenuVisible, setClassMenuVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [subjectMenuVisible, setSubjectMenuVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint'],
      });
      if (res.type === 'success') {
        if (res.size && res.size > 50 * 1024 * 1024) {
          alert('File size should be less than 50MB');
          return;
        }
        setFileName(res.name);
        alert('File selected successfully!');
      }
    } catch (err) {
      console.error('DocumentPicker Error:', err);
    }
  };

  const handleUpload = () => {
    if (!selectedClass || !selectedSubject || !title || !fileName) {
      alert('Please fill all required fields');
      return;
    }

    // Mock upload
    alert('Study material uploaded successfully!');

    // Reset form
    setSelectedClass(null);
    setSelectedSubject(null);
    setTitle('');
    setDescription('');
    setFileName(null);
  };

  const deleteMaterial = (id: number) => {
    alert('Material deleted successfully!');
  };

  return (
    <ScrollView style={styles.container}>
      {/* View Toggle */}
      <View style={styles.toggleContainer}>
        <Button
          mode={view === 'upload' ? 'contained' : 'outlined'}
          onPress={() => setView('upload')}
          style={{ flex: 1, marginRight: 4 }}
        >
          Upload Materials
        </Button>
        <Button
          mode={view === 'existing' ? 'contained' : 'outlined'}
          onPress={() => setView('existing')}
          style={{ flex: 1, marginLeft: 4 }}
        >
          My Materials ({mockUploadedMaterials.length})
        </Button>
      </View>

      {/* Upload View */}
      {view === 'upload' && (
        <Card style={styles.card}>
          <Card.Title title="Upload Study Materials" />
          <Card.Content>
            {/* Class Selection */}
            <Menu
              visible={classMenuVisible}
              onDismiss={() => setClassMenuVisible(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setClassMenuVisible(true)}
                  style={{ marginBottom: 12 }}
                >
                  {selectedClass || 'Select Class'}
                </Button>
              }
            >
              {mockClasses.map((cls) => (
                <Menu.Item
                  key={cls}
                  title={cls}
                  onPress={() => {
                    setSelectedClass(cls);
                    setClassMenuVisible(false);
                  }}
                />
              ))}
            </Menu>

            {/* Subject Selection */}
            <Menu
              visible={subjectMenuVisible}
              onDismiss={() => setSubjectMenuVisible(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setSubjectMenuVisible(true)}
                  style={{ marginBottom: 12 }}
                >
                  {selectedSubject || 'Select Subject'}
                </Button>
              }
            >
              {mockSubjects.map((subj) => (
                <Menu.Item
                  key={subj}
                  title={subj}
                  onPress={() => {
                    setSelectedSubject(subj);
                    setSubjectMenuVisible(false);
                  }}
                />
              ))}
            </Menu>

            {/* Title */}
            <TextInput
              label="Title"
              value={title}
              onChangeText={setTitle}
              placeholder="e.g., Chapter 5 - Quadratic Equations"
              mode="outlined"
              style={{ marginBottom: 12 }}
            />

            {/* Description */}
            <TextInput
              label="Description (Optional)"
              value={description}
              onChangeText={setDescription}
              placeholder="Brief description of the material..."
              mode="outlined"
              multiline
              numberOfLines={3}
              style={{ marginBottom: 12 }}
            />

            {/* File Upload */}
            <Button mode="outlined" onPress={pickFile} style={{ marginBottom: 12 }}>
              {fileName || 'Upload File (PDF/DOC/PPT)'}
            </Button>

            {/* Upload Button */}
            <Button mode="contained" onPress={handleUpload}>
              Upload Material
            </Button>
          </Card.Content>
        </Card>
      )}

      {/* Existing Materials View */}
      {view === 'existing' && (
        <Card style={styles.card}>
          <Card.Title title="My Uploaded Materials" />
          <Card.Content>
            {mockUploadedMaterials.length === 0 ? (
              <View style={{ padding: 16, alignItems: 'center' }}>
                <Text>No materials uploaded yet</Text>
              </View>
            ) : (
              mockUploadedMaterials.map((material) => (
                <Card key={material.id} style={{ marginBottom: 12 }}>
                  <Card.Content>
                    <Text style={{ fontWeight: 'bold' }}>{material.title}</Text>
                    <Text>
                      {material.subject} | {material.class} | {material.type} | {material.size}
                    </Text>
                    <Text>
                      Uploaded: {new Date(material.uploadedOn).toLocaleDateString()} | Downloads: {material.downloads}
                    </Text>
                  </Card.Content>
                  <Card.Actions>
                    <Button onPress={() => alert('View Material')}>View</Button>
                    <Button onPress={() => deleteMaterial(material.id)} buttonColor="#dc2626">
                      Delete
                    </Button>
                  </Card.Actions>
                </Card>
              ))
            )}
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9FAFB' },
  card: { marginBottom: 16 },
  toggleContainer: { flexDirection: 'row', marginBottom: 16 },
});

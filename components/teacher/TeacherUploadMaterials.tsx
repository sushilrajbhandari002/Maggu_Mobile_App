import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card, TextInput, Button, Menu, Divider } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { User } from '../../app/index';

interface TeacherUploadMaterialsProps {
  user: User;
}

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];

export function TeacherUploadMaterials({ user }: TeacherUploadMaterialsProps) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [classMenuVisible, setClassMenuVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [subjectMenuVisible, setSubjectMenuVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx],
      });
      setFileName(res.name);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error(err);
      }
    }
  };

  const handleSubmit = () => {
    if (!selectedClass || !selectedSubject || !title || !fileName) {
      alert('Please fill all required fields');
      return;
    }

    // Simulate upload
    alert('Study material uploaded successfully');

    setSelectedClass(null);
    setSelectedSubject(null);
    setTitle('');
    setDescription('');
    setFileName(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Upload Notes & Study Materials" />
        <Card.Content>
          {/* Class Select */}
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
            {user.assignedClasses?.map((cls) => (
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

          {/* Subject Select */}
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
            {subjects.map((subj) => (
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
            placeholder="e.g., Chapter 5 - Algebra Notes"
            mode="outlined"
            style={{ marginBottom: 12 }}
          />

          {/* Description */}
          <TextInput
            label="Description (Optional)"
            value={description}
            onChangeText={setDescription}
            placeholder="Brief description of the material"
            mode="outlined"
            multiline
            numberOfLines={3}
            style={{ marginBottom: 12 }}
          />

          {/* File Upload */}
          <Button
            mode="outlined"
            icon="file-upload"
            onPress={pickFile}
            style={{ marginBottom: 12 }}
          >
            {fileName || 'Upload File (PDF/DOC)'}
          </Button>

          {/* Submit */}
          <Button mode="contained" onPress={handleSubmit}>
            Upload Material
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9FAFB' },
  card: { marginBottom: 16 },
});

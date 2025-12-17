import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Button, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { UserCircle, Edit2, Save, X } from 'lucide-react-native';
import { User } from '../../app/index';

interface TeacherProfileProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

export function TeacherProfile({ user, onUpdateUser }: TeacherProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone || '',
    address: user.address || '',
    image: user.image || ''
  });

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    onUpdateUser(updatedUser);
    setIsEditing(false);
    // Optional: show toast/alert for success
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setFormData({ ...formData, image: result.assets[0].uri });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
          {!isEditing ? (
            <Button
              mode="outlined"
              icon={() => <Edit2 width={16} height={16} />}
              onPress={() => setIsEditing(true)}
            >
              Edit
            </Button>
          ) : (
            <View style={styles.editButtons}>
              <Button
                mode="contained"
                icon={() => <Save width={16} height={16} />}
                onPress={handleSave}
                style={{ marginRight: 8 }}
              >
                Save
              </Button>
              <Button
                mode="outlined"
                icon={() => <X width={16} height={16} />}
                onPress={() => {
                  setIsEditing(false);
                  setFormData({
                    name: user.name,
                    phone: user.phone || '',
                    address: user.address || '',
                    image: user.image || ''
                  });
                }}
              >
                Cancel
              </Button>
            </View>
          )}
        </View>

        {/* Profile Image */}
        <View style={styles.imageContainer}>
          {formData.image ? (
            <Image source={{ uri: formData.image }} style={styles.profileImage} />
          ) : (
            <UserCircle width={80} height={80} color="#4f46e5" />
          )}
          {isEditing && (
            <Button mode="outlined" onPress={pickImage} style={{ marginTop: 8 }}>
              Upload Photo
            </Button>
          )}
        </View>

        {/* Profile Info */}
        <View style={styles.infoContainer}>
          <TextInput
            label="Name"
            value={formData.name}
            disabled={!isEditing}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={user.email}
            disabled
            style={styles.input}
          />
          <TextInput
            label="Phone Number"
            value={formData.phone}
            disabled={!isEditing}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
            style={styles.input}
          />
          <TextInput
            label="Address"
            value={formData.address}
            disabled={!isEditing}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
            multiline
            numberOfLines={3}
            style={styles.input}
          />
          {user.classTeacherOf && (
            <Text style={styles.label}>Class Teacher Of: <Text style={styles.value}>{user.classTeacherOf}</Text></Text>
          )}
          {user.assignedClasses?.length > 0 && (
            <View style={{ marginTop: 8 }}>
              <Text style={styles.label}>Assigned Classes:</Text>
              <View style={styles.classesContainer}>
                {user.assignedClasses.map((cls) => (
                  <View key={cls} style={styles.classBadge}>
                    <Text style={styles.classText}>{cls}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9fafb' },
  card: { padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  editButtons: { flexDirection: 'row' },
  imageContainer: { alignItems: 'center', marginBottom: 16 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  infoContainer: { marginTop: 8 },
  input: { marginBottom: 12 },
  label: { fontSize: 14, color: '#374151', fontWeight: 'bold', marginTop: 8 },
  value: { fontWeight: 'normal', color: '#111827' },
  classesContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  classBadge: { backgroundColor: '#e0e7ff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginRight: 6, marginBottom: 6 },
  classText: { color: '#4f46e5', fontSize: 12 },
});

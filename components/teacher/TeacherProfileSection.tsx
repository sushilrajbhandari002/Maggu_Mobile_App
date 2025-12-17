import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Button, Avatar, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { User } from '../../app/index';

interface TeacherProfileSectionProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

export function TeacherProfileSection({ user, onUpdateUser }: TeacherProfileSectionProps) {
  const [profileImage, setProfileImage] = useState<string | null>(user.image || null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      
      {/* Profile Picture */}
      <Card style={styles.card}>
        <Card.Title title="Profile Picture" />
        <Card.Content style={{ alignItems: 'center' }}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Avatar.Text size={100} label={getInitials(user.name)} />
          )}
          <Button
            mode="outlined"
            icon="camera"
            onPress={pickImage}
            style={{ marginTop: 12 }}
          >
            Change Profile Picture
          </Button>
        </Card.Content>
        <Text style={styles.infoText}>Supported formats: JPG, PNG, GIF (Max 5MB)</Text>
      </Card>

      {/* Personal Information */}
      <Card style={styles.card}>
        <Card.Title title="Personal Information" />
        <Card.Content>
          <InfoRow label="Full Name" value={user.name} />
          <InfoRow label="Teacher ID" value={user.teacherId} />
          <InfoRow label="Email" value={`${user.username}@sushilschool.edu`} />
          <InfoRow label="Phone" value="+91 98765 11111" />
          <InfoRow label="Date of Birth" value="15th March, 1985" />
          <InfoRow label="Address" value="456 Teacher Lane, Kathmandu, Nepal" />
        </Card.Content>
      </Card>

      {/* Professional Information */}
      <Card style={styles.card}>
        <Card.Title title="Professional Information" />
        <Card.Content>
          <InfoRow label="Subject" value="Mathematics" />
          <InfoRow label="Qualification" value="M.Sc. Mathematics, B.Ed." />
          <InfoRow label="Joining Date" value="1st June, 2015" />
          <InfoRow label="Experience" value="10 Years" />
          {user.classTeacherOf && <InfoRow label="Class Teacher Of" value={user.classTeacherOf} />}
        </Card.Content>
      </Card>

      {/* Teaching Statistics */}
      <Card style={styles.card}>
        <Card.Title title="Teaching Statistics" />
        <Card.Content style={styles.statsContainer}>
          <StatCard label="Classes" value="5" color="#DBEAFE" textColor="#3B82F6" />
          <StatCard label="Students" value="142" color="#DCFCE7" textColor="#16A34A" />
          <StatCard label="Materials" value="28" color="#EDE9FE" textColor="#7C3AED" />
          <StatCard label="Avg. Attendance" value="95%" color="#FFEDD5" textColor="#F97316" />
        </Card.Content>
      </Card>

    </ScrollView>
  );
}

// Helper Components
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const StatCard = ({ label, value, color, textColor }: { label: string; value: string; color: string; textColor: string }) => (
  <View style={[styles.statCard, { backgroundColor: color }]}>
    <Text style={[styles.statValue, { color: textColor }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9FAFB' },
  card: { marginBottom: 16 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  infoText: { fontSize: 12, color: '#6B7280', textAlign: 'center', marginTop: 4 },
  infoRow: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  label: { fontSize: 12, color: '#6B7280' },
  value: { fontSize: 14, color: '#111827', fontWeight: 'bold' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statCard: { width: '48%', padding: 12, borderRadius: 8, marginBottom: 8, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: '#374151' },
});

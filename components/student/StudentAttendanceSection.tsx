import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';
import * as Location from 'expo-location';
import Toast from 'react-native-toast-message';
import { CheckCircle, X, Calendar as CalendarIcon, Camera as CameraIcon, MapPin } from 'lucide-react-native';
import { User } from '../../app/index'; // Adjust your path
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface StudentAttendanceSectionProps {
  user: User;
}

const mockAttendanceData = [
  { month: 'December 2025', present: 18, absent: 2, total: 20, percentage: 90 },
  { month: 'November 2025', present: 22, absent: 0, total: 22, percentage: 100 },
  { month: 'October 2025', present: 20, absent: 1, total: 21, percentage: 95 },
];

const mockAttendanceRecords = [
  { date: '2025-12-12', status: 'Present', time: '8:15 AM', location: 'School Campus' },
  { date: '2025-12-11', status: 'Present', time: '8:10 AM', location: 'School Campus' },
  { date: '2025-12-10', status: 'Present', time: '8:20 AM', location: 'School Campus' },
  { date: '2025-12-09', status: 'Absent', time: '-', location: '-' },
  { date: '2025-12-08', status: 'Present', time: '8:05 AM', location: 'School Campus' },
];

export function StudentAttendanceSection({ user }: StudentAttendanceSectionProps) {
  const [showCamera, setShowCamera] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [cameraRef, setCameraRef] = useState<ExpoCamera | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();
  }, []);

  const capturePhoto = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync({ quality: 0.5 });
      setCapturedImage(photo.uri);
      setShowCamera(false);
      Toast.show({ type: 'success', text1: 'Photo captured successfully!' });
    }
  };

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({ type: 'error', text1: 'Location permission denied' });
        setIsLoadingLocation(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      const locStr = `${loc.coords.latitude.toFixed(6)}, ${loc.coords.longitude.toFixed(6)}`;
      setLocation(locStr);
      setIsLoadingLocation(false);
      Toast.show({ type: 'success', text1: 'Location captured successfully!' });
    } catch {
      setIsLoadingLocation(false);
      Toast.show({ type: 'error', text1: 'Failed to get location' });
    }
  };

  const submitAttendance = () => {
    if (!capturedImage || !location) {
      Toast.show({ type: 'error', text1: 'Capture photo and enable location first' });
      return;
    }
    Toast.show({ type: 'success', text1: 'Attendance marked successfully!' });
    setCapturedImage(null);
    setLocation(null);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Mark Attendance */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Mark Today's Attendance</Text>

        {/* Camera Section */}
        {!capturedImage && !showCamera && (
          <Button onPress={() => setShowCamera(true)} style={{ backgroundColor: '#16a34a', marginVertical: 5 }}>
            Open Camera
          </Button>
        )}

        {showCamera && cameraPermission && (
          <View style={{ height: 300, marginVertical: 5 }}>
            <ExpoCamera ref={setCameraRef} style={{ flex: 1 }} type={ExpoCamera.Constants.Type.front} />
            <View style={{ flexDirection: 'row', marginTop: 8, gap: 10 }}>
              <Button onPress={capturePhoto} style={{ flex: 1, backgroundColor: '#16a34a' }}>Capture Photo</Button>
              <Button onPress={() => setShowCamera(false)} style={{ flex: 1 }}>Cancel</Button>
            </View>
          </View>
        )}

        {capturedImage && (
          <View style={{ marginVertical: 5 }}>
            <Image source={{ uri: capturedImage }} style={{ width: '100%', height: 200, borderRadius: 8 }} />
            <Button onPress={() => setCapturedImage(null)} style={{ marginTop: 8 }}>Retake Photo</Button>
          </View>
        )}

        {/* Location Section */}
        <Button
          onPress={getCurrentLocation}
          disabled={isLoadingLocation}
          style={{ marginVertical: 5 }}
        >
          {isLoadingLocation ? 'Getting Location...' : location ? 'Location Captured' : 'Enable Location'}
        </Button>
        {location && (
          <View style={styles.locationRow}>
            <CheckCircle width={16} height={16} color="#16a34a" />
            <Text style={{ marginLeft: 5 }}>{location}</Text>
          </View>
        )}

        {/* Submit Button */}
        <Button onPress={submitAttendance} style={{ backgroundColor: '#16a34a', marginVertical: 5 }} disabled={!capturedImage || !location}>
          Submit Attendance
        </Button>
      </Card>

      {/* Attendance Summary */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>My Attendance</Text>

        {/* Monthly Summary */}
        {mockAttendanceData.map((month, idx) => (
          <View key={idx} style={styles.monthCard}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{month.month}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 5 }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#16a34a', fontSize: 18 }}>{month.present}</Text>
                <Text style={{ fontSize: 12 }}>Present</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#dc2626', fontSize: 18 }}>{month.absent}</Text>
                <Text style={{ fontSize: 12 }}>Absent</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#3b82f6', fontSize: 18 }}>{month.total}</Text>
                <Text style={{ fontSize: 12 }}>Total</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${month.percentage}%` }]} />
            </View>
            <Text style={{ fontSize: 12, color: '#4b5563' }}>{month.percentage}%</Text>
          </View>
        ))}

        {/* Daily Records */}
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Recent Records</Text>
          {mockAttendanceRecords.map((record, idx) => (
            <View
              key={idx}
              style={[
                styles.recordRow,
                record.status === 'Present' ? styles.presentRow : styles.absentRow,
              ]}
            >
              <View>
                <Text>{new Date(record.date).toLocaleDateString()}</Text>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>
                  {record.time} {record.location !== '-' && `• ${record.location}`}
                </Text>
              </View>
              <Text
                style={[
                  styles.statusBadge,
                  record.status === 'Present' ? styles.presentBadge : styles.absentBadge,
                ]}
              >
                {record.status}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      <Toast position="bottom" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { padding: 10, marginBottom: 12, borderRadius: 8 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  monthCard: { padding: 10, backgroundColor: '#f9fafb', borderRadius: 8, marginBottom: 8 },
  progressBar: { height: 6, backgroundColor: '#e5e7eb', borderRadius: 3, marginBottom: 2 },
  progressFill: { height: 6, backgroundColor: '#16a34a', borderRadius: 3 },
  recordRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 8, borderRadius: 6, marginVertical: 3 },
  presentRow: { backgroundColor: '#d1fae5' },
  absentRow: { backgroundColor: '#fee2e2' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, fontSize: 12, fontWeight: 'bold' },
  presentBadge: { backgroundColor: '#16a34a', color: '#fff' },
  absentBadge: { backgroundColor: '#dc2626', color: '#fff' },
});

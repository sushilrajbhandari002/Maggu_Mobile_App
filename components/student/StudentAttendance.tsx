import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CheckSquare, Camera, MapPin, Clock, Calendar } from 'lucide-react-native';
import { User } from '../../app/index';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import Toast from 'react-native-toast-message';

interface StudentAttendanceProps {
  user: User;
}

const mockAttendanceHistory = [
  { date: '2025-11-22', status: 'Present', method: 'Manual' },
  { date: '2025-11-21', status: 'Present', method: 'Selfie' },
  { date: '2025-11-20', status: 'Absent', method: '-' },
  { date: '2025-11-19', status: 'Present', method: 'Manual' },
  { date: '2025-11-18', status: 'Present', method: 'Selfie' },
];

export function StudentAttendance({ user }: StudentAttendanceProps) {
  const [selfieUri, setSelfieUri] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const cameraRef = useRef<Camera | null>(null);

  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  // Capture selfie
  const captureSelfie = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
      setSelfieUri(photo.uri);
      setIsCameraActive(false);
      Toast.show({ type: 'success', text1: 'Selfie captured' });
    }
  };

  // Get location
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({ type: 'error', text1: 'Location permission denied' });
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      const locStr = `${loc.coords.latitude.toFixed(4)}°N, ${loc.coords.longitude.toFixed(4)}°E`;
      setLocation(locStr);
      Toast.show({ type: 'success', text1: 'Location captured' });
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Unable to get location' });
    }
  };

  const handleSubmitAttendance = () => {
    if (!selfieUri || !location) {
      Toast.show({ type: 'error', text1: 'Selfie and location required' });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSelfieUri(null);
      setLocation(null);
      Toast.show({ type: 'success', text1: 'Attendance submitted for approval' });
    }, 1500);
  };

  const attendancePercentage = Math.round(
    (mockAttendanceHistory.filter(a => a.status === 'Present').length / mockAttendanceHistory.length) * 100
  );

  return (
    <ScrollView style={styles.container}>
      {/* Attendance Summary */}
      <Card style={styles.card}>
        <View style={styles.header}>
          <CheckSquare width={20} height={20} color="#16a34a" />
          <Text style={styles.headerText}>My Attendance</Text>
          <Badge style={{ backgroundColor: attendancePercentage >= 75 ? '#16a34a' : '#dc2626' }}>
            {attendancePercentage}%
          </Badge>
        </View>

        {mockAttendanceHistory.map((record, idx) => (
          <View key={idx} style={styles.recordRow}>
            <View style={styles.recordLeft}>
              <Calendar width={16} height={16} color="#4b5563" />
              <Text style={styles.recordText}>{record.date}</Text>
            </View>
            <View style={styles.recordRight}>
              {record.method !== '-' && <Text style={styles.methodText}>{record.method}</Text>}
              <Text style={[
                styles.statusBadge,
                record.status === 'Present' ? styles.present : styles.absent
              ]}>
                {record.status}
              </Text>
            </View>
          </View>
        ))}
      </Card>

      {/* Mark Attendance */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Mark Today's Attendance</Text>

        {/* Camera */}
        <View style={{ marginVertical: 8 }}>
          {!selfieUri ? (
            isCameraActive && hasCameraPermission ? (
              <Camera
                ref={cameraRef}
                style={{ width: '100%', height: 300, borderRadius: 8 }}
                type={Camera.Constants.Type.front}
              />
            ) : (
              <Button onPress={() => setIsCameraActive(true)}>Open Camera</Button>
            )
          ) : (
            <View>
              <Image source={{ uri: selfieUri }} style={{ width: '100%', height: 200, borderRadius: 8 }} />
              <Button onPress={() => setSelfieUri(null)}>Retake Photo</Button>
            </View>
          )}
          {isCameraActive && hasCameraPermission && (
            <Button onPress={captureSelfie} style={{ marginTop: 8 }}>Capture Photo</Button>
          )}
        </View>

        {/* Location */}
        <View style={{ marginVertical: 8 }}>
          {location ? (
            <View style={styles.locationRow}>
              <MapPin width={16} height={16} color="#16a34a" />
              <Text style={{ color: '#16a34a', marginLeft: 4 }}>{location}</Text>
              <Button onPress={() => setLocation(null)}>Change</Button>
            </View>
          ) : (
            <Button onPress={getLocation}>Get Current Location</Button>
          )}
        </View>

        {/* Current Time */}
        <View style={styles.timeRow}>
          <Clock width={16} height={16} color="#4b5563" />
          <Text style={{ marginLeft: 4 }}>Current Time: {new Date().toLocaleTimeString()}</Text>
        </View>

        {/* Submit */}
        <Button
          onPress={handleSubmitAttendance}
          disabled={isSubmitting || !selfieUri || !location}
        >
          {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
        </Button>
      </Card>

      <Toast position="bottom" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { padding: 10, marginBottom: 12, borderRadius: 8 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  headerText: { fontSize: 16, fontWeight: 'bold', flex: 1, marginLeft: 6 },
  recordRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 8, backgroundColor: '#f9fafb', borderRadius: 6, marginVertical: 4 },
  recordLeft: { flexDirection: 'row', alignItems: 'center' },
  recordText: { marginLeft: 4 },
  recordRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  methodText: { fontSize: 10, color: '#6b7280', marginRight: 4 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, fontSize: 12, fontWeight: 'bold' },
  present: { backgroundColor: '#d1fae5', color: '#16a34a' },
  absent: { backgroundColor: '#fee2e2', color: '#dc2626' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 8 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  timeRow: { flexDirection: 'row', alignItems: 'center', padding: 8, backgroundColor: '#f3f4f6', borderRadius: 6, marginVertical: 4 },
});

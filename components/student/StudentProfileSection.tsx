import { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { UserCircle, Camera, Mail, Phone, MapPin, Calendar, Hash, Upload } from 'lucide-react-native';
import { Card } from '../ui/card'; // Create a simple Card component for RN
import { User } from '../../app/index';

interface StudentProfileSectionProps {
  user: User;
}

export function StudentProfileSection({ user }: StudentProfileSectionProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <View style={{ padding: 16, flex: 1, backgroundColor: '#f9fafb' }}>
      {/* Profile Picture */}
      <Card style={{ padding: 16, marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>Profile Picture</Text>
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              width: 128,
              height: 128,
              borderRadius: 64,
              backgroundColor: '#dcfce7',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
            }}
          >
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={{ width: '100%', height: '100%', borderRadius: 64 }} />
            ) : (
              <UserCircle size={64} color="#16a34a" />
            )}
          </View>
          <TouchableOpacity
            onPress={() => alert('Upload Image Functionality Here')}
            style={{
              padding: 12,
              backgroundColor: '#16a34a',
              borderRadius: 8,
              marginBottom: 8,
            }}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>Change Profile Picture</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 12, color: '#6b7280', textAlign: 'center' }}>
            Supported formats: JPG, PNG, GIF (Max 5MB)
          </Text>
        </View>
      </Card>

      {/* Personal Info Example */}
      <Card style={{ padding: 16, marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>Personal Information</Text>
        {[
          { icon: UserCircle, label: 'Full Name', value: user.name },
          { icon: Hash, label: 'Roll Number', value: user.rollNumber },
          { icon: UserCircle, label: 'Class', value: user.class },
          { icon: Mail, label: 'Email', value: `${user.username}@sushilschool.edu` },
          { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
          { icon: Calendar, label: 'Date of Birth', value: '15th January, 2010' },
          { icon: MapPin, label: 'Address', value: '123 Main Street, Kathmandu, Nepal' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <View
              key={idx}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 12,
                backgroundColor: '#f3f4f6',
                borderRadius: 8,
                marginBottom: 8,
              }}
            >
              <Icon size={20} color="#4b5563" />
              <View style={{ marginLeft: 12 }}>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>{item.label}</Text>
                <Text style={{ fontSize: 16, color: '#111827' }}>{item.value}</Text>
              </View>
            </View>
          );
        })}
      </Card>

      {/* You can replicate similar structure for Guardian and Academic Info */}
    </View>
  );
}

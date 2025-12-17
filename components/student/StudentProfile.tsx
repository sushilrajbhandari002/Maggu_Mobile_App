import { View, Text, Image } from 'react-native';
import { UserCircle, Mail, Phone, MapPin, GraduationCap } from 'lucide-react-native';
import { Card } from '../ui/card'; // Make sure you have a Card component for React Native
import { User } from '../../app/index';

interface StudentProfileProps {
  user: User;
}

export function StudentProfile({ user }: StudentProfileProps) {
  return (
    <Card style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 24, flexDirection: 'row', alignItems: 'center' }}>
        <UserCircle size={24} color="#16a34a" />
        {'  '}My Profile
      </Text>

      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            backgroundColor: '#dcfce7',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            marginBottom: 16,
          }}
        >
          {user.image ? (
            <Image
              source={{ uri: user.image }}
              style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
            />
          ) : (
            <UserCircle size={64} color="#16a34a" />
          )}
        </View>
        <Text style={{ fontSize: 18, fontWeight: '500', color: '#111827' }}>{user.name}</Text>
        <Text style={{ fontSize: 14, color: '#6b7280' }}>{user.class}</Text>
      </View>

      {/* Profile Information */}
      <View style={{ marginBottom: 16 }}>
        {[
          { icon: GraduationCap, label: 'Roll Number', value: user.rollNumber },
          { icon: Mail, label: 'Email', value: user.email },
          { icon: Phone, label: 'Phone Number', value: user.phone || 'Not provided' },
          { icon: MapPin, label: 'Address', value: user.address || 'Not provided' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <View
              key={idx}
              style={{
                padding: 12,
                backgroundColor: '#f9fafb',
                borderRadius: 12,
                marginBottom: 12,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Icon size={20} color="#4b5563" />
                <Text style={{ marginLeft: 8, fontSize: 14, color: '#374151' }}>{item.label}</Text>
              </View>
              <Text style={{ marginLeft: 28, fontSize: 16, color: '#111827' }}>{item.value}</Text>
            </View>
          );
        })}
      </View>

      <View
        style={{
          padding: 12,
          backgroundColor: '#e0f2fe',
          borderRadius: 12,
        }}
      >
        <Text style={{ fontSize: 12, color: '#1e3a8a' }}>
          Note: To update your profile information, please contact the school administration.
        </Text>
      </View>
    </Card>
  );
}

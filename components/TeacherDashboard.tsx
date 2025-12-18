import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  LogOut,
  Home,
  Users,
  CheckSquare,
  Upload,
  FileText,
  UserCircle,
  KeyRound,
} from 'lucide-react-native';

import { User } from '../app/index';

import { TeacherOverviewSection } from './teacher/TeacherOverviewSection';
import { TeacherClassesSection } from './teacher/TeacherClassesSection';
import { TeacherAttendanceSection } from './teacher/TeacherAttendanceSection';
import { TeacherUploadSection } from './teacher/TeacherUploadSection';
import { TeacherExamMarksSection } from './teacher/TeacherExamMarksSection';
import { TeacherProfileSection } from './teacher/TeacherProfileSection';

/* =====================
   PROPS
===================== */
interface TeacherDashboardProps {
  user: User;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
  onChangePassword: () => void;
}

type TabType =
  | 'overview'
  | 'classes'
  | 'attendance'
  | 'upload'
  | 'marks'
  | 'profile';

export default function TeacherDashboard({
  user,
  onLogout,
  onUpdateUser,
  onChangePassword,
}: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const navItems = [
    { id: 'overview' as TabType, icon: Home, label: 'Overview' },
    { id: 'classes' as TabType, icon: Users, label: 'Classes' },
    { id: 'attendance' as TabType, icon: CheckSquare, label: 'Attendance' },
    { id: 'upload' as TabType, icon: Upload, label: 'Materials' },
    { id: 'marks' as TabType, icon: FileText, label: 'Marks' },
    { id: 'profile' as TabType, icon: UserCircle, label: 'Profile' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'classes':
        return <TeacherClassesSection user={user} />;
      case 'attendance':
        return <TeacherAttendanceSection user={user} />;
      case 'upload':
        return <TeacherUploadSection user={user} />;
      case 'marks':
        return <TeacherExamMarksSection user={user} />;
      case 'profile':
        return (
          <TeacherProfileSection
            user={user}
            onUpdateUser={onUpdateUser}
          />
        );
      default:
        return <TeacherOverviewSection user={user} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* =====================
          HEADER
      ===================== */}
      <View style={styles.header}>
      <View>
  <Text style={styles.school}>{user.name}</Text>
  <Text style={styles.portal}>Teacher Portal</Text>
</View>


        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onChangePassword}
          >
            <KeyRound color="#fff" size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={onLogout}
          >
            <LogOut color="#fff" size={22} />
          </TouchableOpacity>
        </View>
      </View>

      {/* =====================
          WELCOME
      ===================== */}
      

      {/* =====================
          CONTENT
      ===================== */}
      <ScrollView style={styles.content}>
        {renderContent()}
      </ScrollView>

      {/* =====================
          BOTTOM NAV
      ===================== */}
      <View style={styles.bottomNav}>
        {navItems.map(item => {
          const Icon = item.icon;
          const active = activeTab === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.navItem}
              onPress={() => setActiveTab(item.id)}
            >
              <Icon
                size={20}
                color={active ? '#4f46e5' : '#6b7280'}
              />
              <Text
                style={[
                  styles.navLabel,
                  active && styles.navActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

/* =====================
   STYLES
===================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#4f46e5',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 6,
  },
  school: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  portal: {
    color: '#e0e7ff',
    fontSize: 12,
  },
  welcome: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  welcomeText: {
    color: '#6b7280',
  },
  teacherName: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 4,
  },
  classText: {
    color: '#4f46e5',
    fontSize: 13,
    marginBottom: 8,
  },
  changePasswordBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  changePasswordText: {
    color: '#4f46e5',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
    marginBottom: 64,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
  },
  navActive: {
    color: '#4f46e5',
    fontWeight: '600',
  },
});

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
  CheckSquare,
  BookOpen,
  FolderOpen,
  UserCircle,
  KeyRound,
} from 'lucide-react-native';

import { User } from '../app/index';

import { StudentOverviewSection } from './student/StudentOverviewSection';
import { StudentAttendanceSection } from './student/StudentAttendanceSection';
import { StudentAcademicsSection } from './student/StudentAcademicsSection';
import { StudentMaterialsSection } from './student/StudentMaterialsSection';
import { StudentProfileSection } from './student/StudentProfileSection';

/* =====================
   PROPS
===================== */
interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
  onChangePassword: () => void;
}

type TabType =
  | 'overview'
  | 'attendance'
  | 'academics'
  | 'materials'
  | 'profile';

export default function StudentDashboard({
  user,
  onLogout,
  onChangePassword,
}: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const navItems = [
    { id: 'overview' as TabType, icon: Home, label: 'Overview' },
    { id: 'attendance' as TabType, icon: CheckSquare, label: 'Attendance' },
    { id: 'academics' as TabType, icon: BookOpen, label: 'Academics' },
    { id: 'materials' as TabType, icon: FolderOpen, label: 'Materials' },
    { id: 'profile' as TabType, icon: UserCircle, label: 'Profile' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'attendance':
        return <StudentAttendanceSection user={user} />;
      case 'academics':
        return <StudentAcademicsSection user={user} />;
      case 'materials':
        return <StudentMaterialsSection user={user} />;
      case 'profile':
        return <StudentProfileSection user={user} />;
      default:
        return <StudentOverviewSection user={user} />;
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
          <Text style={styles.portal}>Student Portal</Text>
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
      <View style={styles.welcome}>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.studentName}>{user.name}</Text>

        {user.class && (
          <Text style={styles.classText}>
            {user.class} • Roll No: {user.rollNumber}
          </Text>
        )}

        {/* CHANGE PASSWORD BUTTON */}
        <TouchableOpacity
          style={styles.changePasswordBtn}
          onPress={onChangePassword}
        >
          <KeyRound size={16} color="#16a34a" />
          <Text style={styles.changePasswordText}>
            Change Password
          </Text>
        </TouchableOpacity>
      </View>

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
                size={22}
                color={active ? '#16a34a' : '#6b7280'}
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
    backgroundColor: '#16a34a',
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
    color: '#dcfce7',
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
  studentName: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 4,
  },
  classText: {
    color: '#16a34a',
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
    color: '#16a34a',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
    marginBottom: 60,
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
    fontSize: 11,
    color: '#6b7280',
    marginTop: 4,
  },
  navActive: {
    color: '#16a34a',
    fontWeight: '600',
  },
});

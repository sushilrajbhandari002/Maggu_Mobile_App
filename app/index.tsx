import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import LoginPage from '../components/LoginPage';
import ChangePasswordPage from '@/components/ChangePasswordPage';
import StudentDashboard from '../components/StudentDashboard';
import TeacherDashboard from '../components/TeacherDashboard';

/* USER TYPE */
export type UserRole = 'teacher' | 'student';

export interface User {
  assignedClasses: any;
  id: string;
  name: string;
  email: string;
  role: UserRole;

  // student-only
  class?: string;
  rollNumber?: string;

  // teacher-only
  classTeacherOf?: string;
}

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleLogin = (loggedUser: User) => {
    setUser(loggedUser);
    setShowChangePassword(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowChangePassword(false);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handlePasswordChanged = (updatedUser: User) => {
    // Later → API response will update user
    setUser(updatedUser);
    setShowChangePassword(false);
  };

  /* =====================
     LOGIN
  ===================== */
  if (!user) {
    return (
      <View style={styles.container}>
        <LoginPage onLogin={handleLogin} />
      </View>
    );
  }

  /* =====================
     CHANGE PASSWORD
  ===================== */
  if (showChangePassword) {
    return (
      <ChangePasswordPage
        user={user}
        onPasswordChanged={handlePasswordChanged}
        onLogout={handleLogout}
      />
    );
  }

  /* =====================
     STUDENT DASHBOARD
  ===================== */
  if (user.role === 'student') {
    return (
      <StudentDashboard
        user={user}
        onLogout={handleLogout}
        onChangePassword={() => setShowChangePassword(true)}
      />
    );
  }

  /* =====================
     TEACHER DASHBOARD
  ===================== */
  return (
    <TeacherDashboard
      user={user}
      onLogout={handleLogout}
      onUpdateUser={handleUpdateUser}
      onChangePassword={() => setShowChangePassword(true)}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

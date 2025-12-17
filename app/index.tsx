import { useState } from 'react';
import { View } from 'react-native';

import LoginPage from '../components/LoginPage';
import ChangePasswordPage from '@/components/ChangePasswordPage';
import StudentDashboard from '../components/StudentDashboard';
import TeacherDashboard from '../components/TeacherDashboard';

/* USER TYPE */
export type UserRole = 'teacher' | 'student';

export interface User {
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

  const handleLogin = (loggedUser: User) => {
    setUser(loggedUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (user.role === 'student') {
    return (
      <StudentDashboard
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <TeacherDashboard
      user={user}
      onLogout={handleLogout}
      onUpdateUser={handleUpdateUser}
    />
  );
}

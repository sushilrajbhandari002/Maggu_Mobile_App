import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { GraduationCap, User as UserIcon } from 'lucide-react-native';
import { User as UserType } from '../app/index';

interface LoginPageProps {
  onLogin: (user: UserType) => void;
}

/* MOCK USERS (NO ADMIN) */
const mockUsers = {
  teachers: [
    {
      id: 't1',
      email: 'teacher@gmail.com',
      password: 'teacher123',
      role: 'teacher' as const,
      name: 'Demo Teacher',
    },
  ],
  students: [
    {
      id: 's1',
      email: 'student@gmail.com',
      password: 'student123',
      role: 'student' as const,
      name: 'Demo Student',
    },
  ],
};

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] =
    useState<'teacher' | 'student' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');

    if (!selectedRole) {
      setError('Please select a role');
      return;
    }

    const users =
      selectedRole === 'teacher'
        ? mockUsers.teachers
        : mockUsers.students;

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      onLogin(user);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <GraduationCap
          size={60}
          color="#4f46e5"
          style={{ alignSelf: 'center' }}
        />

        <Text style={styles.title}>Sushil School</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        {!selectedRole ? (
          <>
            <TouchableOpacity
              style={[styles.button, styles.teacher]}
              onPress={() => setSelectedRole('teacher')}
            >
              <UserIcon size={20} color="#fff" />
              <Text style={styles.buttonText}> Login as Teacher</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.student]}
              onPress={() => setSelectedRole('student')}
            >
              <GraduationCap size={20} color="#fff" />
              <Text style={styles.buttonText}> Login as Student</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => setSelectedRole(null)}>
              <Text style={styles.change}>← Change Login Type</Text>
            </TouchableOpacity>

            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            <TextInput
              placeholder="Password"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {error ? (
              <Text style={styles.error}>{error}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleLogin}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
    color: '#4f46e5',
  },
  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  teacher: { backgroundColor: '#4f46e5' },
  student: { backgroundColor: '#16a34a' },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  loginBtn: {
    backgroundColor: '#4f46e5',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  change: {
    textAlign: 'center',
    color: '#4f46e5',
    marginBottom: 10,
  },
});

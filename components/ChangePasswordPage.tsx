import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  KeyRound,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
} from 'lucide-react-native';
import { User } from '../app/index';

interface ChangePasswordPageProps {
  user: User;
  onPasswordChanged: (user: User) => void;
  onLogout: () => void;
}

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  { label: 'At least 8 characters', test: pwd => pwd.length >= 8 },
  { label: 'One uppercase letter', test: pwd => /[A-Z]/.test(pwd) },
  { label: 'One lowercase letter', test: pwd => /[a-z]/.test(pwd) },
  { label: 'One number', test: pwd => /[0-9]/.test(pwd) },
  { label: 'One special character (!@#$%^&*)', test: pwd => /[!@#$%^&*]/.test(pwd) },
];

export default function ChangePasswordPage({
  user,
  onPasswordChanged,
  onLogout,
}: ChangePasswordPageProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validatePassword = (password: string) =>
    passwordRequirements.every(req => req.test(password));

  const handleSubmit = () => {
    setError('');

    if (!currentPassword) {
      setError('Please enter your current password');
      return;
    }

    if (!validatePassword(newPassword)) {
      setError('Password does not meet requirements');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (currentPassword === newPassword) {
      setError('New password must be different');
      return;
    }

    // API call goes here later
    onPasswordChanged(user);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconBox}>
          <KeyRound size={30} color="#4f46e5" />
        </View>

        <Text style={styles.title}>Change Password</Text>
        <Text style={styles.subtitle}>Welcome, {user.name}</Text>
        <Text style={styles.note}>
          For security reasons, please change your password.
        </Text>

        {/* Current Password */}
        <Text style={styles.label}>Current Password</Text>
        <View style={styles.passwordField}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showCurrent}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Enter current password"
          />
          <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
          </TouchableOpacity>
        </View>

        {/* New Password */}
        <Text style={styles.label}>New Password</Text>
        <View style={styles.passwordField}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showNew}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter new password"
          />
          <TouchableOpacity onPress={() => setShowNew(!showNew)}>
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm New Password</Text>
        <View style={styles.passwordField}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showConfirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </TouchableOpacity>
        </View>

        {/* Password Rules */}
        <View style={styles.rulesBox}>
          {passwordRequirements.map((req, index) => {
            const met = newPassword ? req.test(newPassword) : false;
            return (
              <View key={index} style={styles.rule}>
                {met ? (
                  <CheckCircle2 size={16} color="#16a34a" />
                ) : (
                  <XCircle size={16} color="#9ca3af" />
                )}
                <Text style={[styles.ruleText, met && styles.ruleMet]}>
                  {req.label}
                </Text>
              </View>
            );
          })}
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onLogout}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}>
            <Text style={styles.saveText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
  },
  iconBox: {
    alignSelf: 'center',
    backgroundColor: '#e0e7ff',
    padding: 16,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#4f46e5',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 4,
    fontSize: 14,
  },
  note: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 12,
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  passwordField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  rulesBox: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  rule: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ruleText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#374151',
  },
  ruleMet: {
    color: '#16a34a',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#9ca3af',
    borderRadius: 10,
    padding: 12,
  },
  cancelText: {
    textAlign: 'center',
    fontWeight: '600',
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#4f46e5',
    borderRadius: 10,
    padding: 12,
  },
  saveText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});

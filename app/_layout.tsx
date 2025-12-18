import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, StyleSheet, View, Image } from 'react-native';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#4f46e5' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerLeft: () => (
              <View style={styles.logoContainer}>
                <Image
                  source={require('../assets/images/logo.png')} // 👈 put your logo here
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            ),

            headerTitle: () => (
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.headerTitle}
              >
                Sindhuli Community Technical Institute (SCTI)
              </Text>
            ),
          }}
        />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    maxWidth: '75%', // ✅ space reserved for logo + back button
  },

  logoContainer: {
    marginLeft: 8,
  },

  logo: {
    width: 34,
    height: 34,
  },
});

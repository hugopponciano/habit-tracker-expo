import { Stack, router } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '../src/store/useAuthStore';

export default function RootLayout() {
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (token) {
        router.replace('/(tabs)');
      } else {
        router.replace('/login');
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [token]);

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="habit/[id]" options={{ title: 'Detalhes do Hábito' }} />
    </Stack>
  );
}

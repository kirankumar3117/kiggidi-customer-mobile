import '@/global.css'; // Import Tailwind
import '@/src/i18n'; // Initialize i18n
import BottomNav from '@/src/components/BottomNav';
import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

export default function RootLayout() {
  const pathname = usePathname();
  const showBottomNav = ['/', '/orders', '/profile', '/cart'].includes(pathname);

  return (
    <View className="flex-1">
      <StatusBar style="dark" backgroundColor="#F9FAFB" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F9FAFB' },
          animation: 'fade'
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="search" />
      </Stack>
      {showBottomNav && <BottomNav />}
    </View>
  );
}
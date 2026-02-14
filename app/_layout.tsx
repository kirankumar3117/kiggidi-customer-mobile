import '@/global.css'; // Import Tailwind
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#F9FAFB" />
      <Stack 
        screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: '#F9FAFB' },
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
}
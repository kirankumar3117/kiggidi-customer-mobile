import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, KeyRound } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EnterPinScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  
  const [pin, setPin] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  const inputRefs = [
    React.useRef<TextInput>(null),
    React.useRef<TextInput>(null),
    React.useRef<TextInput>(null),
    React.useRef<TextInput>(null),
  ];

  const handlePinChange = (val: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = val;
    setPin(newPin);

    if (val && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleLogin = () => {
    if (pin.join('').length < 4) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Success Login
      router.replace('/');
    }, 1000);
  };

  const handleOtpFallback = () => {
    router.push({ pathname: '/auth/verify-otp', params: { phone, isNewUser: 'false' } });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <View className="px-5 py-4">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
          <View className="w-16 h-16 bg-emerald-100 rounded-full items-center justify-center mb-6">
            <KeyRound size={32} color="#059669" />
          </View>

          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Enter PIN
          </Text>
          <Text className="text-gray-500 mb-8 text-base">
            Welcome back, please enter your 4-digit PIN for {phone ? `+91 ${phone}` : 'your account'}.
          </Text>

          <View className="flex-row justify-between gap-4 mb-8 px-2">
            {pin.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                className="w-16 h-16 border border-gray-300 rounded-xl text-center text-2xl font-bold bg-white focus:border-emerald-600 focus:bg-emerald-50"
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                secureTextEntry
                onChangeText={(val) => handlePinChange(val, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                autoFocus={index === 0}
              />
            ))}
          </View>

          <TouchableOpacity 
            onPress={handleLogin}
            disabled={pin.join('').length < 4 || loading}
            className={`w-full py-4 rounded-xl shadow-md mb-6 ${
               pin.join('').length === 4 ? 'bg-emerald-600 shadow-emerald-200' : 'bg-gray-200 shadow-transparent'
            }`}
          >
            {loading ? <ActivityIndicator color="white" /> : (
              <Text className={`text-center font-bold text-lg ${pin.join('').length === 4 ? 'text-white' : 'text-gray-400'}`}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleOtpFallback} className="py-4">
            <Text className="text-center font-bold flex-row justify-center text-emerald-600 text-base">
              Forgot PIN? Login via OTP instead
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

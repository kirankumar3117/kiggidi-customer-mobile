import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
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

export default function VerifyOtpScreen() {
  const router = useRouter();
  const { phone, isNewUser } = useLocalSearchParams<{ phone: string, isNewUser: string }>();
  
  const [otp, setOtp] = useState(['', '', '', '']); // 4-digit OTP
  const [loading, setLoading] = useState(false);

  const inputRefs = [
    React.useRef<TextInput>(null),
    React.useRef<TextInput>(null),
    React.useRef<TextInput>(null),
    React.useRef<TextInput>(null),
  ];

  const handleOtpChange = (val: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtp = () => {
    if (otp.join('').length < 4) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // MOCK LOGIC: Routing based on user type
      if (isNewUser === 'true') {
        router.push({ pathname: '/auth/register-details', params: { phone } });
      } else {
        // Logged in via fallback
        router.replace('/');
      }
    }, 1500);
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
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Verify Phone
          </Text>
          <Text className="text-gray-500 mb-8 text-base">
            Code is sent to <Text className="font-bold text-gray-900">+91 {phone}</Text>
          </Text>

          <View className="flex-row justify-between gap-4 mb-8 px-2">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                className="w-16 h-16 border border-gray-300 rounded-xl text-center text-2xl font-bold bg-white focus:border-emerald-600 focus:bg-emerald-50"
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(val) => handleOtpChange(val, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                autoFocus={index === 0}
              />
            ))}
          </View>

          <TouchableOpacity 
            onPress={handleVerifyOtp}
            disabled={otp.join('').length < 4 || loading}
            className={`w-full py-4 rounded-xl shadow-md mb-6 ${
              otp.join('').length === 4 ? 'bg-emerald-600 shadow-emerald-200' : 'bg-gray-200 shadow-transparent'
            }`}
          >
            {loading ? <ActivityIndicator color="white" /> : (
              <Text className={`text-center font-bold text-lg ${otp.join('').length === 4 ? 'text-white' : 'text-gray-400'}`}>Verify OTP</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-gray-500">Didn't receive code? </Text>
            <TouchableOpacity>
              <Text className="font-bold text-emerald-600">Resend Again</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

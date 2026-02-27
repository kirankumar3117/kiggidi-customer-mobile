import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
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

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    if (phone.length < 10) return alert('Please enter a valid 10-digit number');
    
    setLoading(true);
    // MOCK LOGIC: If phone ends with '9', treat as NEW USER.
    setTimeout(() => {
      setLoading(false);
      // if (phone.endsWith('9')) {
      //   // New User -> Verify OTP directly
      //   router.push({ pathname: '/auth/verify-otp', params: { phone, isNewUser: 'true' } });
      // } else {
        // Existing User -> Ask for PIN
        router.push({ pathname: '/auth/enter-pin', params: { phone } });
      // }
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView className="flex-1 px-6 pt-12" showsVerticalScrollIndicator={false}>
          <View className="flex-1">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Let's get you started
            </Text>
            <Text className="text-gray-500 mb-8 text-base">
              Enter your mobile number to login or signup.
            </Text>

            <View className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex-row items-center mb-6">
              <Text className="text-gray-900 font-bold text-lg mr-3">+91</Text>
              <View className="h-6 w-[1px] bg-gray-300 mr-3" />
              <TextInput 
                className="flex-1 text-lg font-bold text-gray-900"
                placeholder="98765 43210"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                maxLength={10}
                value={phone}
                onChangeText={setPhone}
                autoFocus
              />
            </View>

            <TouchableOpacity 
              onPress={handleContinue}
              disabled={phone.length < 10 || loading}
              className={`w-full py-4 rounded-xl flex-row justify-center items-center shadow-md ${
                phone.length === 10 ? 'bg-emerald-600 shadow-emerald-200' : 'bg-gray-200 shadow-transparent'
              }`}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Text className={`font-bold text-lg mr-2 ${phone.length === 10 ? 'text-white' : 'text-gray-400'}`}>
                    Continue
                  </Text>
                  {phone.length === 10 && <ArrowRight size={20} color="white" />}
                </>
              )}
            </TouchableOpacity>

            <Text className="text-xs text-center text-gray-400 mt-6 px-10">
              By continuing, you agree to our Terms of Service & Privacy Policy.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
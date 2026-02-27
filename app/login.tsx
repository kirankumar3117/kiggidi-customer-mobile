import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Mail,
    User
} from 'lucide-react-native';
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

// TYPES
type LoginStep = 'PHONE' | 'OTP' | 'DETAILS';

export default function LoginScreen() {
  const router = useRouter();
  
  // STATE MANAGEMENT
  const [step, setStep] = useState<LoginStep>('PHONE');
  const [loading, setLoading] = useState(false);
  
  // FORM DATA
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']); // 4-digit OTP
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // Optional

  // MOCK LOGIC: Simulate finding a user
  const handleSendOtp = () => {
    if (phone.length < 10) return alert('Please enter a valid number');
    
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      setStep('OTP');
    }, 1500);
  };

  const handleVerifyOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // MOCK LOGIC: If phone ends in '9', treat as NEW USER (Signup)
      if (phone.endsWith('9')) {
        setStep('DETAILS');
      } else {
        // EXISTING USER -> Go Home
        router.replace('/');
      }
    }, 1500);
  };

  const handleFinalSignup = () => {
    if (!name) return alert('Name is required');
    // Save user data & redirect
    router.replace('/');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* HEADER */}
        <View className="px-5 py-4">
          <TouchableOpacity onPress={() => step === 'PHONE' ? router.back() : setStep('PHONE')}>
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
          
          {/* ============================================================
             STEP 1: PHONE NUMBER INPUT
             ============================================================ */}
          {step === 'PHONE' && (
            <View className="flex-1">
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                Let's get you started
              </Text>
              <Text className="text-gray-500 mb-8 text-base">
                Enter your mobile number to login or signup.
              </Text>

              {/* Phone Input Box */}
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

              {/* Continue Button */}
              <TouchableOpacity 
                onPress={handleSendOtp}
                disabled={phone.length < 10 || loading}
                className={`w-full py-4 rounded-xl flex-row justify-center items-center shadow-md shadow-emerald-200 ${
                  phone.length === 10 ? 'bg-emerald-600' : 'bg-gray-200'
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

              {/*
              // Divider
              <View className="flex-row items-center my-8">
                <View className="flex-1 h-[1px] bg-gray-100" />
                <Text className="mx-4 text-gray-400 text-xs uppercase">Or login with</Text>
                <View className="flex-1 h-[1px] bg-gray-100" />
              </View>

              // Social Login Options
              <View className="flex-row gap-4 justify-center">
                <TouchableOpacity className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                  <Mail size={24} color="#EA4335" />
                </TouchableOpacity>
                <TouchableOpacity className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                   // Google G logo usually goes here
                   <Text className="text-xl font-bold text-gray-800">G</Text>
                </TouchableOpacity>
              </View>
              */}
            </View>
          )}

          {/* ============================================================
             STEP 2: OTP VERIFICATION
             ============================================================ */}
          {step === 'OTP' && (
            <View>
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                Verify Phone
              </Text>
              <Text className="text-gray-500 mb-8 text-base">
                Code is sent to <Text className="font-bold text-gray-900">+91 {phone}</Text>
              </Text>

              {/* OTP Inputs */}
              <View className="flex-row justify-between gap-4 mb-8 px-2">
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    className="w-16 h-16 border border-gray-300 rounded-xl text-center text-2xl font-bold bg-white focus:border-emerald-600 focus:bg-emerald-50"
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onChangeText={(val) => {
                      const newOtp = [...otp];
                      newOtp[index] = val;
                      setOtp(newOtp);
                      // Auto-focus next logic would go here
                    }}
                  />
                ))}
              </View>

              <TouchableOpacity 
                onPress={handleVerifyOtp}
                className="w-full bg-emerald-600 py-4 rounded-xl shadow-lg shadow-emerald-200 mb-6"
              >
                {loading ? <ActivityIndicator color="white" /> : (
                  <Text className="text-white text-center font-bold text-lg">Verify OTP</Text>
                )}
              </TouchableOpacity>

              <View className="flex-row justify-center">
                <Text className="text-gray-500">Didn't receive code? </Text>
                <TouchableOpacity>
                  <Text className="font-bold text-emerald-600">Resend Again</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* ============================================================
             STEP 3: SIGNUP DETAILS (Only for New Users)
             ============================================================ */}
          {step === 'DETAILS' && (
            <View>
              <View className="w-16 h-16 bg-emerald-100 rounded-full items-center justify-center mb-6">
                <User size={32} color="#059669" />
              </View>

              <Text className="text-3xl font-bold text-gray-900 mb-2">
                One last step
              </Text>
              <Text className="text-gray-500 mb-8 text-base">
                Looks like you're new here. Tell us a bit about yourself.
              </Text>

              {/* Name Input */}
              <Text className="text-gray-900 font-bold mb-2 ml-1">Full Name <Text className="text-red-500">*</Text></Text>
              <TextInput 
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-lg text-gray-900 mb-6 focus:border-emerald-600"
                placeholder="Ex. Kiran Kumar"
                value={name}
                onChangeText={setName}
              />

              {/* Email Input (Optional) */}
              <Text className="text-gray-900 font-bold mb-2 ml-1">Email Address <Text className="text-gray-400 font-normal">(Optional)</Text></Text>
              <TextInput 
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-lg text-gray-900 mb-8 focus:border-emerald-600"
                placeholder="Ex. kiran@example.com"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              <TouchableOpacity 
                onPress={handleFinalSignup}
                className="w-full bg-emerald-600 py-4 rounded-xl shadow-lg shadow-emerald-200 flex-row justify-center items-center"
              >
                <Text className="text-white font-bold text-lg mr-2">Create Account</Text>
                <CheckCircle size={20} color="white" />
              </TouchableOpacity>

            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react-native';
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

export default function SetPinScreen() {
  const router = useRouter();
  const { phone, name, address } = useLocalSearchParams<{ phone: string, name: string, address: string }>();
  
  const [pin, setPin] = useState(['', '', '', '']);
  const [confirmPin, setConfirmPin] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const pinRefs = [
    React.useRef<TextInput>(null),
    React.useRef<TextInput>(null),
    React.useRef<TextInput>(null),
    React.useRef<TextInput>(null),
  ];

  const confirmPinRefs = [
    React.useRef<TextInput>(null),
    React.useRef<TextInput>(null),
    React.useRef<TextInput>(null),
    React.useRef<TextInput>(null),
  ];

  const handlePinChange = (val: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = val;
    setPin(newPin);
    if (error) setError('');

    if (val && index < 3) {
      pinRefs[index + 1].current?.focus();
    } else if (val && index === 3) {
       confirmPinRefs[0].current?.focus();
    }
  };

  const handlePinKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !pin[index] && index > 0) {
      pinRefs[index - 1].current?.focus();
    }
  };

  const handleConfirmPinChange = (val: string, index: number) => {
    const newPin = [...confirmPin];
    newPin[index] = val;
    setConfirmPin(newPin);
    if (error) setError('');

    if (val && index < 3) {
      confirmPinRefs[index + 1].current?.focus();
    }
  };

  const handleConfirmPinKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !confirmPin[index] && index > 0) {
      confirmPinRefs[index - 1].current?.focus();
    } else if (e.nativeEvent.key === 'Backspace' && !confirmPin[0] && index === 0) {
      pinRefs[3].current?.focus();
    }
  };

  const handleCreateAccount = () => {
    const pinStr = pin.join('');
    const confirmPinStr = confirmPin.join('');
    
    if (pinStr.length < 4 || confirmPinStr.length < 4) return;
    if (pinStr !== confirmPinStr) {
      setError('PINs do not match');
      return;
    }
    
    setError('');
    setLoading(true);
    // Submit All user info...
    setTimeout(() => {
      setLoading(false);
      // Success Signup
      router.replace('/');
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
          <View className="w-16 h-16 bg-emerald-100 rounded-full items-center justify-center mb-6">
            <ShieldCheck size={32} color="#059669" />
          </View>

          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Set Security PIN
          </Text>
          <Text className="text-gray-500 mb-8 text-base">
            Create a 4-digit PIN for faster logins in the future.
          </Text>

          <Text className="text-gray-900 font-bold mb-2 pl-1">Enter 4-Digit PIN</Text>
          <View className="flex-row justify-between gap-4 mb-6 px-2">
            {pin.map((digit, index) => (
              <TextInput
                key={`pin-${index}`}
                ref={pinRefs[index]}
                className="w-16 h-16 border border-gray-300 rounded-xl text-center text-2xl font-bold bg-white focus:border-emerald-600 focus:bg-emerald-50"
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                secureTextEntry
                onChangeText={(val) => handlePinChange(val, index)}
                onKeyPress={(e) => handlePinKeyPress(e, index)}
                autoFocus={index === 0}
              />
            ))}
          </View>

          <Text className="text-gray-900 font-bold mb-2 pl-1 mt-2">Confirm PIN</Text>
          <View className="flex-row justify-between gap-4 mb-2 px-2">
            {confirmPin.map((digit, index) => (
              <TextInput
                key={`confirm-${index}`}
                ref={confirmPinRefs[index]}
                className="w-16 h-16 border border-gray-300 rounded-xl text-center text-2xl font-bold bg-white focus:border-emerald-600 focus:bg-emerald-50"
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                secureTextEntry
                onChangeText={(val) => handleConfirmPinChange(val, index)}
                onKeyPress={(e) => handleConfirmPinKeyPress(e, index)}
              />
            ))}
          </View>
          
          {error ? (
              <Text className="text-red-500 text-center mb-4">{error}</Text>
          ) : (
              <View className="mb-8" />
          )}

          <TouchableOpacity 
            onPress={handleCreateAccount}
            disabled={pin.join('').length < 4 || confirmPin.join('').length < 4 || loading}
            className={`w-full py-4 rounded-xl shadow-md mb-6 flex-row justify-center items-center ${
              pin.join('').length === 4 && confirmPin.join('').length === 4 ? 'bg-emerald-600 shadow-emerald-200' : 'bg-gray-200 shadow-transparent'
            }`}
          >
            {loading ? <ActivityIndicator color="white" /> : (
              <>
                <Text className={`font-bold text-lg mr-2 ${pin.join('').length === 4 && confirmPin.join('').length === 4 ? 'text-white' : 'text-gray-400'}`}>Create Account</Text>
                {pin.join('').length === 4 && confirmPin.join('').length === 4 && <CheckCircle size={20} color="white" />}
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

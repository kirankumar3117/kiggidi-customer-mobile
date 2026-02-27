import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight, User } from 'lucide-react-native';
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

export default function RegisterDetailsScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState(''); // Address is mostly optional, as requested
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    if (!name.trim()) return alert('Name is required');
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Route to PIN setup
      router.push({ 
        pathname: '/auth/set-pin', 
        params: { phone, name, address } 
      });
    }, 500);
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
            <User size={32} color="#059669" />
          </View>

          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Basic Details
          </Text>
          <Text className="text-gray-500 mb-8 text-base">
            Tell us a bit about yourself.
          </Text>

          {/* Name Input */}
          <Text className="text-gray-900 font-bold mb-2 ml-1">Full Name <Text className="text-red-500">*</Text></Text>
          <TextInput 
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-lg text-gray-900 mb-6 focus:border-emerald-600"
            placeholder="Ex. Kiran Kumar"
            value={name}
            onChangeText={setName}
            autoFocus
          />

           <Text className="text-gray-900 font-bold mb-2 ml-1">Mail <Text className="text-gray-400 font-normal">(Optional)</Text></Text>
          <TextInput 
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-lg text-gray-900 mb-6 focus:border-emerald-600"
            placeholder="Ex. hello@gmail.com"
            value={email}
            onChangeText={setEmail}
          />

          {/* Address Input (Optional) */}
          <Text className="text-gray-900 font-bold mb-2 ml-1">Address <Text className="text-gray-400 font-normal">(Optional)</Text></Text>
          <TextInput 
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-lg text-gray-900 mb-8 focus:border-emerald-600 h-24"
            placeholder="Enter your address setup deliveries"
            multiline
            textAlignVertical="top"
            value={address}
            onChangeText={setAddress}
          />

          <TouchableOpacity 
            onPress={handleContinue}
            disabled={!name.trim() || loading}
            className={`w-full py-4 rounded-xl shadow-md flex-row justify-center items-center ${
               name.trim() ? 'bg-emerald-600 shadow-emerald-200' : 'bg-gray-200 shadow-transparent'
            }`}
          >
            {loading ? <ActivityIndicator color="white" /> : (
              <>
                <Text className={`font-bold text-lg mr-2 ${name.trim() ? 'text-white' : 'text-gray-400'}`}>Continue</Text>
                {name.trim() ? <ArrowRight size={20} color="white" /> : null}
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

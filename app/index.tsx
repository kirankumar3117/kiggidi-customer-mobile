import { Camera, MapPin, Search, ShoppingBag, User, FileText } from 'lucide-react-native';
import React from 'react';
import { 
  ScrollView, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
        
        {/* 1. HEADER */}
        <View className="px-4 py-3 flex-row items-center justify-between bg-white border-b border-gray-100">
          <View>
            <Text className="text-xs text-gray-500 font-bold uppercase tracking-wider">Delivering To</Text>
            <View className="flex-row items-center mt-0.5">
              <Text className="text-lg font-bold text-gray-900 mr-1">Kanchikacherla</Text>
              <MapPin size={16} color="#059669" />
            </View>
          </View>
          <View className="h-10 w-10 bg-gray-100 rounded-full items-center justify-center">
            <User size={20} color="#374151" />
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          
          {/* 2. SEARCH */}
          <View className="px-4 mt-4">
            <View className="bg-white border border-gray-200 rounded-2xl px-4 py-3 flex-row items-center shadow-sm">
              <Search size={20} color="#9CA3AF" />
              <TextInput 
                placeholder='Search "Milk" or "Rice"...'
                className="flex-1 ml-3 text-base text-gray-900"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* 3. HERO ACTION (The "PM's Choice") */}
          <View className="px-4 mt-6">
            <Text className="text-xl font-bold text-gray-900 mb-4">Quick Actions</Text>
            <View className="flex-row gap-4">
              <TouchableOpacity className="flex-1 bg-primary rounded-3xl p-5 items-center justify-center shadow-lg shadow-emerald-200 active:scale-95 transition-transform">
                <View className="bg-white/20 p-3 rounded-full mb-3">
                  <Camera size={28} color="white" />
                </View>
                <Text className="text-white font-bold text-lg">Upload List</Text>
                <Text className="text-emerald-100 text-xs mt-1">Scan handwritten note</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 bg-white border border-gray-200 rounded-3xl p-5 items-center justify-center shadow-sm active:scale-95 transition-transform">
                <View className="bg-orange-100 p-3 rounded-full mb-3">
                  <FileText size={28} color="#EA580C" />
                </View>
                <Text className="text-gray-900 font-bold text-lg">Type List</Text>
                <Text className="text-gray-500 text-xs mt-1">Manual entry</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 4. CATEGORIES */}
          <View className="px-4 mt-8 pb-10">
            <Text className="text-xl font-bold text-gray-900 mb-4">Shop By Category</Text>
            <View className="flex-row flex-wrap justify-between">
              {['Vegetables', 'Fruits', 'Dairy', 'Snacks', 'Rice', 'Oils'].map((cat, i) => (
                <View key={i} className="w-[30%] mb-4 items-center">
                  <View className="h-20 w-20 bg-white border border-gray-100 rounded-2xl items-center justify-center shadow-sm mb-2">
                    <Text className="text-3xl">🥬</Text>
                  </View>
                  <Text className="text-xs font-medium text-gray-700">{cat}</Text>
                </View>
              ))}
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
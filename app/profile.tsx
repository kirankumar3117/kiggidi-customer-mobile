import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    ChevronRight,
    Headphones,
    Heart,
    LogOut,
    MapPin,
    ShieldCheck,
    ShoppingBag,
    Smartphone,
    User
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ScrollView,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();
  
  // MOCK AUTH STATE (Toggle this to see Guest vs User view)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView className="flex-1">
        
        {/* --- HEADER --- */}
        <View className="px-5 py-4 bg-white border-b border-gray-100 flex-row justify-between items-center">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()} className="p-1">
              <ArrowLeft size={24} color="#111827" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-900">Profile</Text>
          </View>
          
          {/* DEV ONLY: Toggle to test views */}
          <View className="flex-row items-center gap-2 bg-gray-100 px-2 py-1 rounded">
            <Text className="text-[10px] text-gray-500 font-bold">DEV MODE:</Text>
            <Switch 
              value={isLoggedIn} 
              onValueChange={setIsLoggedIn} 
              trackColor={{ false: "#D1D5DB", true: "#10B981" }}
              thumbColor={"#FFFFFF"}
            />
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          
          {/* ============================================================
             SCENARIO A: NOT LOGGED IN (Guest View)
             Focus: "Sell" the login. Explain WHY they need it.
             ============================================================ */}
          {!isLoggedIn ? (
            <View className="p-5 flex-1 items-center justify-center mt-10">
              {/* Illustration Placeholder */}
              <View className="w-32 h-32 bg-emerald-50 rounded-full items-center justify-center mb-6 shadow-sm">
                <ShieldCheck size={64} color="#059669" />
              </View>

              <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
                Unlock the Full Experience
              </Text>
              <Text className="text-gray-500 text-center mb-8 px-4 leading-6">
                Log in to save your delivery address, track your live orders, and get exclusive discounts.
              </Text>

              {/* Primary Action */}
              <TouchableOpacity 
                onPress={() => router.push('/login')} // Navigate to Login
                className="w-full bg-emerald-600 py-4 rounded-xl shadow-lg shadow-emerald-200 active:scale-95 transition-transform"
              >
                <Text className="text-white text-center font-bold text-lg">
                  Login or Signup
                </Text>
              </TouchableOpacity>

              <View className="flex-row items-center mt-6 gap-2">
                 <Text className="text-gray-400 text-xs">By continuing, you agree to our Terms.</Text>
              </View>
            </View>
          ) : (
            
          /* ============================================================
             SCENARIO B: LOGGED IN (User View)
             Focus: Quick Actions & Account Management
             ============================================================ */
            <View className="pb-20">
              
              {/* 1. USER IDENTITY CARD */}
              <View className="bg-white m-4 p-4 rounded-2xl shadow-sm border border-gray-100 flex-row items-center">
                <View className="h-16 w-16 bg-emerald-100 rounded-full items-center justify-center mr-4">
                  <Text className="text-2xl font-bold text-emerald-700">K</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900">Kiran Kumar</Text>
                  <Text className="text-gray-500">+91 98765 43210</Text>
                </View>
                <TouchableOpacity className="bg-gray-50 p-2 rounded-full">
                   <User size={20} color="#059669" />
                </TouchableOpacity>
              </View>

              {/* 2. CORE ACTIONS */}
              <View className="mx-4 mb-2">
                <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                  My Activity
                </Text>
                <View className="bg-white rounded-xl overflow-hidden border border-gray-100">
                  
                  <MenuItem 
                    icon={<ShoppingBag size={20} color="#F59E0B" />} 
                    label="Your Orders" 
                    subLabel="Track, return, or buy things again"
                    onClick={() => router.push('/orders')}
                  />
                  <Divider />
                  
                  <MenuItem 
                    icon={<MapPin size={20} color="#059669" />} 
                    label="Address Book" 
                    subLabel="Manage delivery locations"
                    onClick={() => router.push('/addresses')}
                  />
                  <Divider />

                  <MenuItem 
                    icon={<Heart size={20} color="#EC4899" />} 
                    label="Favorite Shops" 
                    subLabel="Your regular kirana stores"
                    onClick={() => {}} 
                  />
                </View>
              </View>

              {/* 3. SUPPORT & SETTINGS */}
              <View className="mx-4 mt-4">
                <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                  Support
                </Text>
                <View className="bg-white rounded-xl overflow-hidden border border-gray-100">
                  <MenuItem 
                    icon={<Headphones size={20} color="#3B82F6" />} 
                    label="Help Center" 
                    subLabel="Help regarding your recent purchase"
                    onClick={() => {}} 
                  />
                  <Divider />
                  <MenuItem 
                    icon={<Smartphone size={20} color="#6366F1" />} 
                    label="App Language" 
                    subLabel="English (Change)"
                    onClick={() => {}} 
                  />
                </View>
              </View>

              {/* 4. LOGOUT */}
              <TouchableOpacity 
                onPress={() => setIsLoggedIn(false)}
                className="mx-4 mt-8 bg-red-50 border border-red-100 p-4 rounded-xl flex-row items-center justify-center"
              >
                <LogOut size={20} color="#EF4444" className="mr-2" />
                <Text className="text-red-600 font-bold">Log Out</Text>
              </TouchableOpacity>

              <Text className="text-center text-gray-400 text-xs mt-6">
                App Version 1.0.0 (MVS)
              </Text>

            </View>
          )}

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// --- HELPER COMPONENTS FOR CLEANER CODE ---

const MenuItem = ({ icon, label, subLabel, onClick }: any) => (
  <TouchableOpacity 
    onPress={onClick}
    className="flex-row items-center p-4 active:bg-gray-50"
  >
    <View className="w-8">{icon}</View>
    <View className="flex-1 ml-2">
      <Text className="text-gray-900 font-medium text-base">{label}</Text>
      {subLabel && <Text className="text-gray-400 text-xs mt-0.5">{subLabel}</Text>}
    </View>
    <ChevronRight size={18} color="#D1D5DB" />
  </TouchableOpacity>
);

const Divider = () => <View className="h-[1px] bg-gray-100 ml-14" />;
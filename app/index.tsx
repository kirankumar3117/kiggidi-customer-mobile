import BottomNav from '@/src/components/BottomNav';
import { useRouter } from 'expo-router';
import { ArrowRight, MapPin, Search } from 'lucide-react-native';
import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 1. DATA ARRAY (Easy to Scale)
const CATEGORIES = [
  { 
    id: '1', 
    name: 'Groceries', 
    subtitle: 'Rice, Atta, Dals', 
    icon: '🥦', 
    bg: 'bg-emerald-50', 
    border: 'border-emerald-100',
    text: 'text-emerald-900' 
  },
  { 
    id: '2', 
    name: 'Snacks', 
    subtitle: 'Chips, Biscuits', 
    icon: '🍟', 
    bg: 'bg-orange-50', 
    border: 'border-orange-100',
    text: 'text-orange-900'
  },
  { 
    id: '3', 
    name: 'Cool Drinks', 
    subtitle: 'Juices, Sodas', 
    icon: '🥤', 
    bg: 'bg-pink-50', 
    border: 'border-pink-100',
    text: 'text-pink-900'
  },
  { 
    id: '4', 
    name: 'Dairy', 
    subtitle: 'Milk, Curd, Ghee', 
    icon: '🥛', 
    bg: 'bg-blue-50', 
    border: 'border-blue-100',
    text: 'text-blue-900'
  },
  { 
    id: '5', 
    name: 'Vegetables', 
    subtitle: 'Farm Fresh', 
    icon: '🥕', 
    bg: 'bg-green-50', 
    border: 'border-green-100',
    text: 'text-green-900'
  },
  { 
    id: '6', 
    name: 'Cleaning', 
    subtitle: 'Soaps, Detergent', 
    icon: '🧹', 
    bg: 'bg-purple-50', 
    border: 'border-purple-100',
    text: 'text-purple-900'
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
        
        {/* STICKY HEADER SCROLLVIEW */}
        <ScrollView 
          className="flex-1" 
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]} 
        >
          
          {/* INDEX 0: HEADER */}
          <View className="px-4 py-3 flex-row items-center justify-between bg-white mb-2">
            <View>
              <Text className="text-xs text-gray-500 font-bold uppercase tracking-wider">Delivering To</Text>
              <View className="flex-row items-center mt-0.5">
                <Text className="text-lg font-bold text-gray-900 mr-1">Kanchikacherla</Text>
                <MapPin size={16} color="#059669" />
              </View>
            </View>
            {/* <TouchableOpacity onPress={() => router.push('/cart')} className="bg-gray-50 p-2 rounded-full border border-gray-100 relative">
              <ShoppingCart size={22} color="#374151" />
              <View className="absolute -top-1 -right-1 bg-red-500 h-4 w-4 rounded-full items-center justify-center border border-white">
                <Text className="text-[9px] text-white font-bold">2</Text>
              </View>
            </TouchableOpacity> */}
          </View>

          {/* INDEX 1: STICKY SEARCH BAR */}
          <View className="px-4 pb-4 bg-white z-50 shadow-sm shadow-gray-100/50">
            <TouchableOpacity 
              activeOpacity={0.9}
              onPress={() => router.push('/search')}
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex-row items-center"
            >
              <Search size={20} color="#6B7280" />
              <Text className="flex-1 ml-3 text-base text-gray-400">Search for rice, oil, dal...</Text>
            </TouchableOpacity>
          </View>

          {/* INDEX 2: MAIN CONTENT */}
          <View className="px-4 pb-24 pt-2">
            
            {/* CAROUSEL (Discounts) */}
            <View className="mb-8">
              <Text className="text-lg font-bold text-gray-900 mb-3">Discounts Today</Text>
              <View className="h-40 w-full bg-gray-900 rounded-2xl overflow-hidden relative p-5 justify-center shadow-lg shadow-gray-300">
                {/* Abstract Shapes */}
                <View className="absolute right-0 top-0 bottom-0 w-32 bg-gray-800 skew-x-12 opacity-50" />
                <View className="absolute -right-10 -bottom-10 w-40 h-40 bg-gray-700 rounded-full opacity-30" />
                
                <View className="z-10">
                  <View className="bg-yellow-400 self-start px-2 py-1 rounded mb-2">
                    <Text className="text-xs font-bold text-black uppercase">Limited Time</Text>
                  </View>
                  <Text className="text-white text-3xl font-extrabold">50% OFF</Text>
                  <Text className="text-gray-300 font-medium text-base mb-3">On Household Items</Text>
                  
                  <TouchableOpacity className="flex-row items-center">
                    <Text className="text-white font-bold text-sm mr-1">Shop Now</Text>
                    <ArrowRight size={14} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* NEW: DYNAMIC CATEGORY GRID */}
            <View>
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-xl font-bold text-gray-900">Explore by Category</Text>
                <Text className="text-emerald-600 font-bold text-sm">See all</Text>
              </View>
              
              <View className="flex-row flex-wrap justify-between gap-y-4">
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity 
                    key={cat.id}
                    activeOpacity={0.8}
                    // DYNAMIC STYLING based on category color
                    className={`w-[48%] h-40 rounded-3xl p-4 justify-between border ${cat.bg} ${cat.border} relative overflow-hidden`}
                    onPress={() => router.push('/create-list')}
                  >
                    {/* Top Content */}
                    <View>
                      <Text className={`font-bold text-lg ${cat.text}`}>{cat.name}</Text>
                      <Text className="text-xs text-gray-500 font-medium mt-1">{cat.subtitle}</Text>
                    </View>

                    {/* Bottom Action */}
                    <View className="bg-white/60 self-start px-3 py-1 rounded-full">
                      <Text className={`text-[10px] font-bold ${cat.text}`}>SHOP</Text>
                    </View>

                    {/* Artistic Background Icon */}
                    <Text className="absolute -bottom-2 -right-2 text-6xl opacity-90 transform rotate-[-10deg]">
                      {cat.icon}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

          </View>
        </ScrollView>

        {/* BOTTOM NAVIGATION */}
        <BottomNav />
      </SafeAreaView>
    </View>
  );
}
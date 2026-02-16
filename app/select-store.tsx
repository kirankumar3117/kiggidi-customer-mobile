import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    MapPin,
    Star,
    Store,
    TrendingDown,
    Zap
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STORES = [
  { 
    id: '1', 
    name: 'Sri Lakshmi Kirana', 
    totalPrice: 1240, 
    rating: 4.8, 
    distance: '1.2 km', 
    time: '15 mins', 
    address: 'Main Road, Kanchikacherla',
    tag: 'LOWEST PRICE' 
  },
  { 
    id: '2', 
    name: 'Balaji General Store', 
    totalPrice: 1265, 
    rating: 4.2, 
    distance: '0.8 km', 
    time: '10 mins', 
    address: 'Near Bus Stand',
    tag: null 
  },
  { 
    id: '3', 
    name: 'Raju Traders', 
    totalPrice: 1290, 
    rating: 3.9, 
    distance: '2.5 km', 
    time: '25 mins', 
    address: 'Gandhi Bomma Center',
    tag: null 
  },
];

export default function SelectStoreScreen() {
  const router = useRouter();
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  const bestPrice = Math.min(...STORES.map(s => s.totalPrice));

  const handleAutoMap = () => {
    setSelectedStore('AUTO');
    // Removed setTimeout to prevent race conditions during navigation
    router.push('/cart'); 
  };

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView className="flex-1" edges={['top']}>
        
        {/* HEADER */}
        <View className="px-4 py-3 bg-white border-b border-gray-200 flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <View>
             <Text className="text-lg font-bold text-gray-900">Select Store</Text>
             <Text className="text-xs text-gray-500">For 12 Items • Est. ₹{bestPrice} - ₹1300</Text>
          </View>
        </View>

        <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
          
          {/* OPTION 1: AUTO-ASSIGN (Borders only, NO SHADOWS) */}
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Recommended</Text>
          
          <TouchableOpacity 
            onPress={handleAutoMap}
            activeOpacity={0.9}
            // 🚩 FIX: Removed 'shadow-sm'. Added thicker border for contrast.
            className={`bg-white p-5 rounded-2xl border-2 mb-6 flex-row items-center ${
                selectedStore === 'AUTO' ? 'border-emerald-600 bg-emerald-50' : 'border-emerald-100'
            }`}
          >
            <View className="bg-emerald-100 p-3 rounded-full mr-4">
              <Zap size={24} color="#059669" fill="#059669" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-900">Auto-Assign Best Store</Text>
              <Text className="text-gray-500 text-xs mt-1">We found the lowest price for you.</Text>
              
              <View className="flex-row items-center mt-2">
                 <Text className="text-sm font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded mr-2">
                    Total: ₹{bestPrice}
                 </Text>
              </View>
            </View>
            <View>
                <Text className="font-bold text-emerald-600 bg-white px-2 py-1 rounded text-[10px] border border-emerald-100 uppercase tracking-wider">Fastest</Text>
            </View>
          </TouchableOpacity>

          {/* OPTION 2: MANUAL SELECTION (Borders only) */}
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Or Choose Manually</Text>
          
          {STORES.map((store) => (
            <TouchableOpacity 
              key={store.id}
              onPress={() => setSelectedStore(store.id)}
              // 🚩 FIX: Removed all shadow classes. Relying on border colors.
              className={`bg-white mb-3 rounded-xl p-4 border flex-row items-start ${
                selectedStore === store.id ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200'
              }`}
            >
              <View className="h-12 w-12 bg-gray-100 rounded-lg items-center justify-center mr-3">
                 <Store size={20} color="#374151" />
              </View>

              <View className="flex-1">
                 <View className="flex-row justify-between items-start">
                    <View>
                        <Text className="font-bold text-gray-900 text-base">{store.name}</Text>
                        <Text className="text-gray-500 text-xs mt-0.5">{store.address}</Text>
                    </View>
                    
                    <View className="items-end">
                        <Text className="font-black text-gray-900 text-base">₹{store.totalPrice}</Text>
                        {store.tag ? (
                           <View className="flex-row items-center">
                              <TrendingDown size={10} color="#16a34a" className="mr-0.5" />
                              <Text className="text-[9px] font-bold text-green-600">{store.tag}</Text>
                           </View>
                        ) : (
                           <Text className="text-[9px] text-gray-400">Total Bill</Text>
                        )}
                    </View>
                 </View>
                 
                 <View className="flex-row items-center mt-3 justify-between">
                    <View className="flex-row gap-3">
                        <View className="flex-row items-center bg-green-50 px-1.5 py-0.5 rounded border border-green-100">
                           <Text className="text-xs font-bold text-green-700 mr-1">{store.rating}</Text>
                           <Star size={10} color="#15803d" fill="#15803d" />
                        </View>
                        <View className="flex-row items-center">
                            <MapPin size={12} color="#6B7280" className="mr-1" />
                            <Text className="text-xs text-gray-600 font-medium">{store.distance}</Text>
                        </View>
                    </View>
                    <Text className="text-xs text-emerald-600 font-bold">{store.time}</Text>
                 </View>
              </View>
              
              <View className={`h-5 w-5 rounded-full border-2 ml-3 mt-1 items-center justify-center ${
                 selectedStore === store.id ? 'border-emerald-600' : 'border-gray-300'
              }`}>
                 {selectedStore === store.id && <View className="h-2.5 w-2.5 rounded-full bg-emerald-600" />}
              </View>

            </TouchableOpacity>
          ))}
          
        </ScrollView>

        {/* CONFIRM BUTTON */}
        <View className="p-4 bg-white border-t border-gray-200">
             <TouchableOpacity 
                disabled={!selectedStore}
                onPress={() => router.push('/cart')}
                // 🚩 FIX: Removed 'shadow-lg shadow-emerald-200'. 
                // Added 'border-b-4' to mimic depth without rendering cost.
                className={`w-full py-4 rounded-xl items-center border-b-4 ${
                    selectedStore 
                    ? 'bg-emerald-600 border-emerald-800' 
                    : 'bg-gray-200 border-gray-300'
                }`}
             >
                 <Text className={`font-bold text-lg ${selectedStore ? 'text-white' : 'text-gray-400'}`}>
                    {selectedStore === 'AUTO' 
                        ? `Confirm Best Price (₹${bestPrice})` 
                        : 'Confirm Store'
                    }
                 </Text>
             </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
}
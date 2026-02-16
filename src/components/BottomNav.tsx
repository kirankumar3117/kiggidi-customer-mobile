import { useRouter, usePathname } from 'expo-router';
import { Home, ShoppingBag, User, ShoppingCart } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 h-20 flex-row items-start pt-3 justify-around px-2 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
      
      {/* 1. HOME */}
      <TouchableOpacity onPress={() => router.push('/')} className="items-center w-16">
        <Home size={24} color={isActive('/') ? '#059669' : '#9CA3AF'} />
        <Text className={`text-[10px] font-bold mt-1 ${isActive('/') ? 'text-emerald-600' : 'text-gray-400'}`}>
          Home
        </Text>
      </TouchableOpacity>

      {/* 2. ORDERS */}
      <TouchableOpacity onPress={() => router.push('/orders')} className="items-center w-16">
        <ShoppingBag size={24} color={isActive('/orders') ? '#059669' : '#9CA3AF'} />
        <Text className={`text-[10px] font-bold mt-1 ${isActive('/orders') ? 'text-emerald-600' : 'text-gray-400'}`}>
          Orders
        </Text>
      </TouchableOpacity>

      {/* 3. PROFILE */}
      <TouchableOpacity onPress={() => router.push('/profile')} className="items-center w-16">
        <User size={24} color={isActive('/profile') ? '#059669' : '#9CA3AF'} />
        <Text className={`text-[10px] font-bold mt-1 ${isActive('/profile') ? 'text-emerald-600' : 'text-gray-400'}`}>
          Profile
        </Text>
      </TouchableOpacity>

      {/* 4. CART (Right Side Corner) */}
      <TouchableOpacity onPress={() => router.push('/cart')} className="items-center w-16">
        <View className="relative">
          <ShoppingCart size={24} color={isActive('/cart') ? '#059669' : '#374151'} />
          {/* Optional Badge */}
          <View className="absolute -top-1 -right-1 bg-red-500 h-3.5 w-3.5 rounded-full border border-white items-center justify-center">
             <Text className="text-[8px] text-white font-bold">2</Text>
          </View>
        </View>
        <Text className={`text-[10px] font-bold mt-1 ${isActive('/cart') ? 'text-emerald-600' : 'text-gray-800'}`}>
          Cart
        </Text>
      </TouchableOpacity>

    </View>
  );
}
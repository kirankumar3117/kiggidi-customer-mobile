import { useRouter, usePathname } from 'expo-router';
import { Home, ShoppingBag, User, ShoppingCart } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();

  const isActive = (path: string) => pathname === path;

  const handleNavigation = (path: any) => {
    if (!isActive(path)) {
      router.push(path);
    }
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 h-20 flex-row items-start pt-3 justify-around px-2 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
      
      {/* 1. HOME */}
      <TouchableOpacity onPress={() => handleNavigation('/')} className="items-center w-16">
        <Home size={24} color={isActive('/') ? '#059669' : '#9CA3AF'} />
        <Text className={`text-[10px] font-bold mt-1 ${isActive('/') ? 'text-emerald-600' : 'text-gray-400'}`}>
          {t('nav.home')}
        </Text>
      </TouchableOpacity>

      {/* 2. ORDERS */}
      <TouchableOpacity onPress={() => handleNavigation('/orders')} className="items-center w-16">
        <ShoppingBag size={24} color={isActive('/orders') ? '#059669' : '#9CA3AF'} />
        <Text className={`text-[10px] font-bold mt-1 ${isActive('/orders') ? 'text-emerald-600' : 'text-gray-400'}`}>
          {t('nav.orders')}
        </Text>
      </TouchableOpacity>

      {/* 3. PROFILE */}
      <TouchableOpacity onPress={() => handleNavigation('/profile')} className="items-center w-16">
        <User size={24} color={isActive('/profile') ? '#059669' : '#9CA3AF'} />
        <Text className={`text-[10px] font-bold mt-1 ${isActive('/profile') ? 'text-emerald-600' : 'text-gray-400'}`}>
          {t('nav.profile')}
        </Text>
      </TouchableOpacity>

      {/* 4. CART (Right Side Corner) */}
      <TouchableOpacity onPress={() => handleNavigation('/cart')} className="items-center w-16">
        <View className="relative">
          <ShoppingCart size={24} color={isActive('/cart') ? '#059669' : '#374151'} />
          {/* Optional Badge */}
          <View className="absolute -top-1 -right-1 bg-red-500 h-3.5 w-3.5 rounded-full border border-white items-center justify-center">
             <Text className="text-[8px] text-white font-bold">2</Text>
          </View>
        </View>
        <Text className={`text-[10px] font-bold mt-1 ${isActive('/cart') ? 'text-emerald-600' : 'text-gray-800'}`}>
          {t('nav.cart')}
        </Text>
      </TouchableOpacity>

    </View>
  );
}
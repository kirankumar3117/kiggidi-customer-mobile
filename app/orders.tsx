import { useRouter } from 'expo-router';
import {
  CheckCircle,
  MapPin,
  Phone,
  ShoppingBag
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

export default function OrdersScreen() {
  const router = useRouter();

  // MOCK STATE (Toggle to see Empty vs Active Orders)
  const [hasOrders, setHasOrders] = useState(true);

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView className="flex-1">

        {/* --- HEADER --- */}
        <View className="px-5 py-4 bg-white border-b border-gray-100 flex-row justify-between items-center">
          <Text className="text-xl font-bold text-gray-900">My Orders</Text>

          {/* DEV TOGGLE */}
          <View className="flex-row items-center gap-2 bg-gray-100 px-2 py-1 rounded">
            <Text className="text-[10px] text-gray-500 font-bold">HAS ORDERS:</Text>
            <Switch
              value={hasOrders}
              onValueChange={setHasOrders}
              trackColor={{ false: "#D1D5DB", true: "#10B981" }}
              thumbColor={"#FFFFFF"}
            />
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

          {/* ============================================================
             SCENARIO A: NO ORDERS (Empty State)
             Focus: "Start Shopping"
             ============================================================ */}
          {!hasOrders ? (
            <View className="flex-1 items-center justify-center mt-20 px-6">
              <View className="w-40 h-40 bg-gray-100 rounded-full items-center justify-center mb-6">
                <ShoppingBag size={64} color="#9CA3AF" />
              </View>
              <Text className="text-xl font-bold text-gray-900 mb-2">No active orders</Text>
              <Text className="text-gray-500 text-center mb-8">
                You haven't placed any orders yet. Start adding items from your favorite kirana store.
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/')}
                className="bg-emerald-600 px-8 py-3 rounded-xl shadow-lg shadow-emerald-200"
              >
                <Text className="text-white font-bold text-base">Start Shopping</Text>
              </TouchableOpacity>
            </View>
          ) : (

            /* ============================================================
               SCENARIO B: ACTIVE ORDERS LIST
               Focus: OTP & Live Status
               ============================================================ */
            <View className="p-4 pb-20">

              {/* 1. LIVE ORDER CARD (High Priority) */}
              <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">
                Live Orders
              </Text>

              <View className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-sm mb-6 relative overflow-hidden">
                {/* Status Badge */}
                <View className="absolute top-0 right-0 bg-yellow-100 px-3 py-1 rounded-bl-xl">
                  <Text className="text-xs font-bold text-yellow-700">PACKING</Text>
                </View>

                {/* Shop Info */}
                <View className="flex-row items-center mb-4">
                  <View className="h-10 w-10 bg-gray-100 rounded-lg mr-3 items-center justify-center">
                    <Text className="text-xl">🏪</Text>
                  </View>
                  <View>
                    <Text className="text-base font-bold text-gray-900">Sri Lakshmi Kirana</Text>
                    <Text className="text-xs text-gray-500">Kanchikacherla • ₹452.00</Text>
                  </View>
                </View>

                {/* The "Money" Feature: PICKUP OTP */}
                <View className="bg-emerald-50 rounded-xl p-4 flex-row items-center justify-between border border-emerald-100 border-dashed mb-4">
                  <View>
                    <Text className="text-xs font-bold text-emerald-600 uppercase">Pickup OTP</Text>
                    <Text className="text-2xl font-black text-emerald-900 tracking-widest">8492</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-[10px] text-emerald-600 mb-1">Show this at shop</Text>
                    <CheckCircle size={20} color="#059669" />
                  </View>
                </View>

                {/* Items Preview */}
                <Text className="text-xs text-gray-500 mb-2">3 Items: Aashirvaad Atta, Milk, ...</Text>

                {/* Actions */}
                <View className="flex-row gap-3 pt-3 border-t border-gray-100">
                  <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-gray-50 py-2.5 rounded-lg border border-gray-200">
                    <Phone size={16} color="#374151" className="mr-2" />
                    <Text className="text-xs font-bold text-gray-700">Call Shop</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-emerald-600 py-2.5 rounded-lg">
                    <MapPin size={16} color="white" className="mr-2" />
                    <Text className="text-xs font-bold text-white">Navigate</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* 2. PAST ORDERS (History) */}
              <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">
                Past Orders
              </Text>

              {[1, 2, 3].map((order, i) => (
                <View key={i} className="bg-white rounded-xl p-4 border border-gray-100 mb-3 flex-row items-center">
                  <View className="h-12 w-12 bg-gray-50 rounded-lg items-center justify-center mr-3">
                    <CheckCircle size={24} color="#9CA3AF" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-bold text-gray-900">Delivered • Yesterday</Text>
                    <Text className="text-xs text-gray-500 mt-0.5">Sri Lakshmi Kirana</Text>
                    <Text className="text-xs text-gray-900 font-bold mt-1">₹120.00</Text>
                  </View>
                  <TouchableOpacity className="bg-emerald-50 px-3 py-1.5 rounded-lg">
                    <Text className="text-emerald-700 font-bold text-xs">Reorder</Text>
                  </TouchableOpacity>
                </View>
              ))}

            </View>
          )}

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
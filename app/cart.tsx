import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Clock,
    MapPin,
    Minus,
    Plus,
    ShoppingBag,
    Trash2
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// MOCK DATA: What the user has added
const INITIAL_ITEMS = [
  { id: '1', name: 'Amul Taaza Fresh Toned Milk', weight: '500 ml', price: 27, qty: 2, image: 'https://m.media-amazon.com/images/I/51wXkM0ZzXL._AC_UF1000,1000_QL80_.jpg' },
  { id: '2', name: 'Fortune Sunlite Refined Oil', weight: '1 L', price: 130, qty: 1, image: 'https://m.media-amazon.com/images/I/51+8r6mDkL._SY300_SX300_.jpg' },
  { id: '3', name: 'Aashirvaad Shudh Chakki Atta', weight: '10 kg', price: 440, qty: 1, image: 'https://m.media-amazon.com/images/I/71rBdK8N5WL._AC_UF1000,1000_QL80_.jpg' },
];

export default function CartScreen() {
  const router = useRouter();
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [instructions, setInstructions] = useState('');

  // CALCULATIONS
  const itemTotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const platformFee = 5; // Standard small fee
  const grandTotal = itemTotal + platformFee;

  // HANDLER: Update Qty
  const updateQty = (id: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(0, item.qty + delta) };
      }
      return item;
    }).filter(item => item.qty > 0)); // Remove if 0
  };

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView className="flex-1" edges={['top']}>
        
        {/* HEADER */}
        <View className="px-4 py-3 bg-white border-b border-gray-100 flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <View>
            <Text className="text-lg font-bold text-gray-900">Your Cart</Text>
            <Text className="text-xs text-gray-500">{items.length} Items • from Sri Lakshmi Kirana</Text>
          </View>
        </View>

        {items.length === 0 ? (
          // --- EMPTY STATE ---
          <View className="flex-1 items-center justify-center p-8">
            <ShoppingBag size={64} color="#D1D5DB" />
            <Text className="text-xl font-bold text-gray-400 mt-4">Your cart is empty</Text>
            <TouchableOpacity 
              onPress={() => router.back()}
              className="mt-6 bg-emerald-600 px-6 py-3 rounded-xl"
            >
              <Text className="text-white font-bold">Browse Products</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // --- FILLED CART ---
          <>
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
              
              {/* 1. PICKUP LOCATION INFO (Instead of Delivery Address) */}
              <View className="bg-white m-4 p-4 rounded-xl border border-gray-100 shadow-sm">
                <View className="flex-row items-start">
                  <View className="bg-emerald-50 p-2 rounded-lg mr-3">
                    <MapPin size={20} color="#059669" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs font-bold text-emerald-600 uppercase mb-1">Pickup From</Text>
                    <Text className="text-base font-bold text-gray-900">Sri Lakshmi Kirana</Text>
                    <Text className="text-xs text-gray-500 mt-0.5">Main Road, Kanchikacherla • 1.2 km away</Text>
                  </View>
                </View>
                <View className="mt-3 pt-3 border-t border-gray-100 flex-row items-center">
                  <Clock size={14} color="#F59E0B" className="mr-1" />
                  <Text className="text-xs text-gray-500">
                    Ready for pickup in <Text className="font-bold text-gray-900">15 mins</Text>
                  </Text>
                </View>
              </View>

              {/* 2. ITEM LIST */}
              <View className="bg-white px-4 py-2 mb-4 border-y border-gray-100">
                {items.map((item) => (
                  <View key={item.id} className="flex-row items-center py-4 border-b border-gray-50 last:border-0">
                    {/* Image */}
                    <View className="border border-gray-100 rounded-lg p-1 mr-3">
                      <Image 
                        source={{ uri: item.image }} 
                        className="w-12 h-12" 
                        resizeMode="contain"
                      />
                    </View>

                    {/* Info */}
                    <View className="flex-1">
                      <Text className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</Text>
                      <Text className="text-xs text-gray-500 mt-0.5">{item.weight}</Text>
                      <Text className="text-sm font-bold text-gray-900 mt-1">₹{item.price * item.qty}</Text>
                    </View>

                    {/* Counter */}
                    <View className="flex-row items-center bg-emerald-600 rounded-lg h-8">
                      <TouchableOpacity 
                        onPress={() => updateQty(item.id, -1)}
                        className="w-8 items-center justify-center"
                      >
                        {item.qty === 1 ? <Trash2 size={14} color="white" /> : <Minus size={14} color="white" />}
                      </TouchableOpacity>
                      <Text className="text-white font-bold text-xs w-4 text-center">{item.qty}</Text>
                      <TouchableOpacity 
                        onPress={() => updateQty(item.id, 1)}
                        className="w-8 items-center justify-center"
                      >
                        <Plus size={14} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

                {/* Instructions Input */}
                <View className="py-4">
                  <Text className="text-xs font-bold text-gray-500 mb-2 ml-1">Add Note for Shopkeeper</Text>
                  <TextInput 
                    placeholder='"Pack in a box", "I am coming by bike"...'
                    className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900"
                    value={instructions}
                    onChangeText={setInstructions}
                  />
                </View>
              </View>

              {/* 3. BILL DETAILS */}
              <View className="bg-white p-4 mb-32 border-y border-gray-100">
                <Text className="text-base font-bold text-gray-900 mb-4">Bill Details</Text>
                
                <View className="flex-row justify-between mb-2">
                  <Text className="text-gray-500 text-sm">Item Total</Text>
                  <Text className="text-gray-900 text-sm">₹{itemTotal}</Text>
                </View>
                
                <View className="flex-row justify-between mb-2">
                  <Text className="text-gray-500 text-sm">Delivery Fee</Text>
                  <Text className="text-emerald-600 text-sm font-bold">FREE (Pickup)</Text>
                </View>

                <View className="flex-row justify-between mb-4">
                  <Text className="text-gray-500 text-sm underline decoration-dotted">Platform Fee</Text>
                  <Text className="text-gray-900 text-sm">₹{platformFee}</Text>
                </View>

                <View className="h-[1px] bg-gray-200 mb-3" />

                <View className="flex-row justify-between items-center">
                  <Text className="text-lg font-bold text-gray-900">To Pay</Text>
                  <Text className="text-xl font-black text-gray-900">₹{grandTotal}</Text>
                </View>
              </View>

            </ScrollView>

            {/* 4. STICKY PAYMENT FOOTER */}
            <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-8 shadow-lg">
              <View className="flex-row items-center gap-4">
                <View className="bg-white border border-green-200 rounded-lg p-2">
                   <Text className="text-[10px] text-green-700 font-bold uppercase">Cash on Pickup</Text>
                </View>
                
                <TouchableOpacity 
                  onPress={() => router.push('/orders')} // Simulate placing order
                  className="flex-1 bg-emerald-600 rounded-xl py-3.5 flex-row items-center justify-center shadow-lg shadow-emerald-200 active:scale-95 transition-transform"
                >
                  <Text className="text-white font-bold text-lg mr-2">Place Order</Text>
                  <Text className="text-emerald-100 font-bold text-sm bg-emerald-700 px-2 py-0.5 rounded">₹{grandTotal}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

      </SafeAreaView>
    </View>
  );
}
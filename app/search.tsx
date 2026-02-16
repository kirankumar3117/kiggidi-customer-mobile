import { useRouter } from 'expo-router';
import { ArrowLeft, Minus, Plus, Search as SearchIcon, X } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// MOCK DATA (In real app, this comes from API)
const ALL_PRODUCTS = [
  { id: '1', name: 'Amul Taaza Fresh Toned Milk', weight: '500 ml', price: 27, image: 'https://m.media-amazon.com/images/I/51wXkM0ZzXL._AC_UF1000,1000_QL80_.jpg' },
  { id: '2', name: 'Nandini GoodLife Milk', weight: '500 ml', price: 28, image: 'https://www.bigbasket.com/media/uploads/p/l/306926_4-nandini-goodlife-toned-milk.jpg' },
  { id: '3', name: 'Aashirvaad Shudh Chakki Atta', weight: '10 kg', price: 440, image: 'https://m.media-amazon.com/images/I/71rBdK8N5WL._AC_UF1000,1000_QL80_.jpg' },
  { id: '4', name: 'Fortune Sunlite Refined Oil', weight: '1 L', price: 130, image: 'https://m.media-amazon.com/images/I/51+8r6mDkL._SY300_SX300_.jpg' },
  { id: '5', name: 'Tata Salt Vacuum Evaporated', weight: '1 kg', price: 28, image: 'https://m.media-amazon.com/images/I/61n9-jH7c9L._AC_UF1000,1000_QL80_.jpg' },
  { id: '6', name: 'Maggi 2-Minute Masala Noodles', weight: '70 g', price: 14, image: 'https://m.media-amazon.com/images/I/81TopWoq5WL._AC_UF1000,1000_QL80_.jpg' },
];

export default function SearchScreen() {
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(ALL_PRODUCTS);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // 1. Auto-Focus on mount
  useEffect(() => {
    // Small delay ensures screen transition finishes before keyboard pops
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  // 2. Filter Logic
  useEffect(() => {
    if (query.trim() === '') {
      setResults(ALL_PRODUCTS); // Or set to [] to show "Recent Searches"
    } else {
      const filtered = ALL_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query]);

  // Handle Add/Remove
  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      
      {/* HEADER with Search Input */}
      <View className="flex-row items-center px-4 py-2 border-b border-gray-100 gap-3">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        
        <View className="flex-1 flex-row items-center bg-gray-100 rounded-xl px-3 h-11">
          <SearchIcon size={18} color="#9CA3AF" />
          <TextInput
            ref={inputRef}
            placeholder='Search "Milk" or "Atta"...'
            className="flex-1 ml-2 text-base text-gray-900 h-full"
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <X size={18} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* RESULTS LIST */}
      <FlatList
        data={results}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        ListEmptyComponent={
          <View className="mt-10 items-center">
            <Text className="text-gray-400 text-lg">No items found</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="flex-row items-center bg-white mb-6">
            {/* Product Image */}
            <View className="border border-gray-100 rounded-lg p-1 mr-4">
              <Image 
                source={{ uri: item.image }} 
                className="w-16 h-16" 
                resizeMode="contain"
              />
            </View>

            {/* Product Info */}
            <View className="flex-1">
              <Text className="text-gray-900 font-semibold text-base">{item.name}</Text>
              <Text className="text-gray-500 text-xs mt-0.5">{item.weight}</Text>
              <Text className="text-gray-900 font-bold mt-1">₹{item.price}</Text>
            </View>

            {/* ADD BUTTON */}
            <View>
              {(quantities[item.id] || 0) === 0 ? (
                <TouchableOpacity 
                  onPress={() => updateQuantity(item.id, 1)}
                  className="bg-emerald-50 border border-emerald-600 rounded-lg px-4 py-1.5"
                >
                  <Text className="text-emerald-700 font-bold text-xs">ADD</Text>
                </TouchableOpacity>
              ) : (
                <View className="flex-row items-center bg-emerald-600 rounded-lg h-8">
                  <TouchableOpacity 
                    onPress={() => updateQuantity(item.id, -1)}
                    className="w-8 items-center justify-center"
                  >
                    <Minus size={14} color="white" />
                  </TouchableOpacity>
                  <Text className="text-white font-bold text-xs w-4 text-center">
                    {quantities[item.id]}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => updateQuantity(item.id, 1)}
                    className="w-8 items-center justify-center"
                  >
                    <Plus size={14} color="white" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}
      />

    </SafeAreaView>
  );
}
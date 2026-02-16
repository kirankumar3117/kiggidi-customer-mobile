import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    ArrowRight,
    Filter,
    Minus,
    Plus,
    Search
} from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
    FlatList,
    Image,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- MOCK DATABASE (With Price Ranges) ---
const ALL_PRODUCTS = [
  // STAPLES (Rice, Atta, Dals)
  { id: '1', category: 'Staples', name: 'Aashirvaad Shudh Chakki Atta', weight: '10 kg', mrp: 540, minPrice: 440, maxPrice: 460, off: '18%', image: 'https://m.media-amazon.com/images/I/71rBdK8N5WL._AC_UF1000,1000_QL80_.jpg' },
  { id: '2', category: 'Staples', name: 'India Gate Basmati Rice', weight: '5 kg', mrp: 850, minPrice: 620, maxPrice: 650, off: '27%', image: 'https://m.media-amazon.com/images/I/71W+Q5-v5EL._AC_UF1000,1000_QL80_.jpg' },
  { id: '3', category: 'Staples', name: 'Sona Masoori Rice', weight: '25 kg', mrp: 1600, minPrice: 1350, maxPrice: 1400, off: '15%', image: 'https://m.media-amazon.com/images/I/51wXkM0ZzXL._AC_UF1000,1000_QL80_.jpg' },
  { id: '4', category: 'Staples', name: 'Tata Salt', weight: '1 kg', mrp: 28, minPrice: 25, maxPrice: 28, off: '10%', image: 'https://m.media-amazon.com/images/I/61n9-jH7c9L._AC_UF1000,1000_QL80_.jpg' },
  { id: '5', category: 'Staples', name: 'Tata Sampann Toor Dal', weight: '1 kg', mrp: 160, minPrice: 135, maxPrice: 145, off: '15%', image: 'https://m.media-amazon.com/images/I/71yL+W-k+KL._AC_UF1000,1000_QL80_.jpg' },
  { id: '6', category: 'Staples', name: 'Moong Dal (Yellow)', weight: '1 kg', mrp: 140, minPrice: 115, maxPrice: 125, off: '18%', image: 'https://m.media-amazon.com/images/I/71J+T+P+v8L._AC_UF1000,1000_QL80_.jpg' },
  { id: '7', category: 'Staples', name: 'Urad Gota (Whole)', weight: '1 kg', mrp: 180, minPrice: 150, maxPrice: 165, off: '16%', image: 'https://m.media-amazon.com/images/I/71+1w+-gNXL._AC_UF1000,1000_QL80_.jpg' },
  { id: '8', category: 'Staples', name: 'Fortune Besan', weight: '500g', mrp: 65, minPrice: 55, maxPrice: 60, off: '15%', image: 'https://m.media-amazon.com/images/I/71J+T+P+v8L._AC_UF1000,1000_QL80_.jpg' },

  // OILS & GHEE
  { id: '9', category: 'Oil & Ghee', name: 'Fortune Sunlite Refined Oil', weight: '1 L', mrp: 165, minPrice: 130, maxPrice: 140, off: '21%', image: 'https://m.media-amazon.com/images/I/51+8r6mDkL._SY300_SX300_.jpg' },
  { id: '10', category: 'Oil & Ghee', name: 'Freedom Sunflower Oil', weight: '5 L Can', mrp: 850, minPrice: 680, maxPrice: 710, off: '20%', image: 'https://m.media-amazon.com/images/I/61+9Y3+b+dL._AC_UF1000,1000_QL80_.jpg' },
  { id: '11', category: 'Oil & Ghee', name: 'Amul Pure Ghee', weight: '1 L', mrp: 650, minPrice: 580, maxPrice: 600, off: '10%', image: 'https://m.media-amazon.com/images/I/51v1X5W+b+L._SY300_SX300_.jpg' },
  { id: '12', category: 'Oil & Ghee', name: 'Vijaya Ghee Pouch', weight: '500 ml', mrp: 340, minPrice: 310, maxPrice: 325, off: '8%', image: 'https://m.media-amazon.com/images/I/61zC8qQ+b+L._AC_UF1000,1000_QL80_.jpg' },

  // SPICES
  { id: '13', category: 'Spices', name: 'Everest Chilli Powder', weight: '200g', mrp: 85, minPrice: 78, maxPrice: 82, off: '8%', image: 'https://m.media-amazon.com/images/I/61M-J+b+dL._AC_UF1000,1000_QL80_.jpg' },
  { id: '14', category: 'Spices', name: 'Everest Turmeric Powder', weight: '200g', mrp: 60, minPrice: 52, maxPrice: 58, off: '13%', image: 'https://m.media-amazon.com/images/I/71+1w+-gNXL._AC_UF1000,1000_QL80_.jpg' },
  { id: '15', category: 'Spices', name: 'Aachi Chicken Masala', weight: '100g', mrp: 45, minPrice: 38, maxPrice: 42, off: '15%', image: 'https://m.media-amazon.com/images/I/61n9-jH7c9L._AC_UF1000,1000_QL80_.jpg' },
  { id: '16', category: 'Spices', name: 'Mustard Seeds (Aavalu)', weight: '100g', mrp: 25, minPrice: 20, maxPrice: 22, off: '20%', image: 'https://m.media-amazon.com/images/I/71wF7xS+JVL._AC_UF1000,1000_QL80_.jpg' },

  // CLEANING
  { id: '17', category: 'Cleaning', name: 'Surf Excel Easy Wash', weight: '1 kg', mrp: 145, minPrice: 122, maxPrice: 130, off: '16%', image: 'https://m.media-amazon.com/images/I/61M-J+b+dL._AC_UF1000,1000_QL80_.jpg' },
  { id: '18', category: 'Cleaning', name: 'Rin Detergent Bar', weight: '250g x 4', mrp: 110, minPrice: 95, maxPrice: 105, off: '13%', image: 'https://m.media-amazon.com/images/I/61+9Y3+b+dL._AC_UF1000,1000_QL80_.jpg' },
  { id: '19', category: 'Cleaning', name: 'Vim Dishwash Gel', weight: '750 ml', mrp: 195, minPrice: 155, maxPrice: 165, off: '20%', image: 'https://m.media-amazon.com/images/I/61zC8qQ+b+L._AC_UF1000,1000_QL80_.jpg' },
  { id: '20', category: 'Cleaning', name: 'Lizol Floor Cleaner', weight: '2 L', mrp: 380, minPrice: 320, maxPrice: 350, off: '15%', image: 'https://m.media-amazon.com/images/I/61n9-jH7c9L._AC_UF1000,1000_QL80_.jpg' },
  { id: '21', category: 'Cleaning', name: 'Harpic Toilet Cleaner', weight: '1 L', mrp: 210, minPrice: 180, maxPrice: 195, off: '14%', image: 'https://m.media-amazon.com/images/I/51wXkM0ZzXL._AC_UF1000,1000_QL80_.jpg' },

  // PERSONAL CARE
  { id: '22', category: 'Personal Care', name: 'Santoor Sandal Soap', weight: '100g x 4', mrp: 165, minPrice: 140, maxPrice: 150, off: '15%', image: 'https://m.media-amazon.com/images/I/51v1X5W+b+L._SY300_SX300_.jpg' },
  { id: '23', category: 'Personal Care', name: 'Cinthol Original', weight: '100g x 4', mrp: 180, minPrice: 155, maxPrice: 165, off: '14%', image: 'https://m.media-amazon.com/images/I/61+9Y3+b+dL._AC_UF1000,1000_QL80_.jpg' },
  { id: '24', category: 'Personal Care', name: 'Colgate Strong Teeth', weight: '500g', mrp: 240, minPrice: 199, maxPrice: 220, off: '17%', image: 'https://m.media-amazon.com/images/I/61zC8qQ+b+L._AC_UF1000,1000_QL80_.jpg' },
  { id: '25', category: 'Personal Care', name: 'Clinic Plus Shampoo', weight: '650 ml', mrp: 380, minPrice: 320, maxPrice: 340, off: '15%', image: 'https://m.media-amazon.com/images/I/61n9-jH7c9L._AC_UF1000,1000_QL80_.jpg' },
  { id: '26', category: 'Personal Care', name: 'Parachute Coconut Oil', weight: '500 ml', mrp: 190, minPrice: 175, maxPrice: 185, off: '8%', image: 'https://m.media-amazon.com/images/I/51wXkM0ZzXL._AC_UF1000,1000_QL80_.jpg' },

  // BEVERAGES
  { id: '27', category: 'Beverages', name: 'Red Label Tea', weight: '500g', mrp: 280, minPrice: 240, maxPrice: 260, off: '14%', image: 'https://m.media-amazon.com/images/I/71rBdK8N5WL._AC_UF1000,1000_QL80_.jpg' },
  { id: '28', category: 'Beverages', name: 'Bru Instant Coffee', weight: '100g', mrp: 210, minPrice: 180, maxPrice: 195, off: '14%', image: 'https://m.media-amazon.com/images/I/61+9Y3+b+dL._AC_UF1000,1000_QL80_.jpg' },
  { id: '29', category: 'Beverages', name: 'Boost Health Drink', weight: '500g', mrp: 320, minPrice: 290, maxPrice: 310, off: '9%', image: 'https://m.media-amazon.com/images/I/61zC8qQ+b+L._AC_UF1000,1000_QL80_.jpg' },
  
  // SNACKS
  { id: '30', category: 'Snacks', name: 'Maggi Noodles 12-Pack', weight: '840g', mrp: 168, minPrice: 155, maxPrice: 160, off: '7%', image: 'https://m.media-amazon.com/images/I/81TopWoq5WL._AC_UF1000,1000_QL80_.jpg' },
  { id: '31', category: 'Snacks', name: 'Good Day Butter', weight: '600g', mrp: 120, minPrice: 100, maxPrice: 110, off: '16%', image: 'https://m.media-amazon.com/images/I/51+8r6mDkL._SY300_SX300_.jpg' },
  { id: '32', category: 'Snacks', name: 'Kissan Tomato Ketchup', weight: '1 kg', mrp: 160, minPrice: 135, maxPrice: 145, off: '15%', image: 'https://m.media-amazon.com/images/I/61n9-jH7c9L._AC_UF1000,1000_QL80_.jpg' },
];

const CATEGORIES = ['All', 'Staples', 'Oil & Ghee', 'Spices', 'Cleaning', 'Personal Care', 'Beverages', 'Snacks'];

export default function CreateListScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<Record<string, number>>({});

  // --- LOGIC: FILTER PRODUCTS ---
  // GLOBAL SEARCH: If text exists, ignore category. Else use category.
  const filteredProducts = useMemo(() => {
    if (searchQuery.trim().length > 0) {
      return ALL_PRODUCTS.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return ALL_PRODUCTS.filter(item => {
      return activeCategory === 'All' || item.category === activeCategory;
    });
  }, [activeCategory, searchQuery]);

  // --- LOGIC: CALCULATE ESTIMATED TOTALS ---
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  
  const minTotal = Object.keys(cart).reduce((sum, id) => {
    const item = ALL_PRODUCTS.find(p => p.id === id);
    return sum + (item ? item.minPrice * cart[id] : 0);
  }, 0);

  const maxTotal = Object.keys(cart).reduce((sum, id) => {
    const item = ALL_PRODUCTS.find(p => p.id === id);
    return sum + (item ? item.maxPrice * cart[id] : 0);
  }, 0);

  // --- HANDLERS ---
  const updateQty = (id: string, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView className="flex-1" edges={['top']}>
        
        {/* 1. HEADER (Fixed) */}
        <View className="bg-white px-4 pt-3 pb-2 border-b border-gray-100">
          {/* Top Row: Back + Search */}
          <View className="flex-row items-center gap-3 mb-3">
            <TouchableOpacity onPress={() => router.back()} className="p-1">
              <ArrowLeft size={24} color="#374151" />
            </TouchableOpacity>
            
            <View className="flex-1 bg-gray-100 rounded-xl px-3 py-2.5 flex-row items-center">
              <Search size={18} color="#9CA3AF" />
              <TextInput 
                placeholder="Search 'Atta' or 'Soap'..." 
                className="flex-1 ml-2 text-base text-gray-900 leading-5"
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Bottom Row: Filter Pills (Scrollable) */}
          <View>
            <FlatList 
              horizontal
              data={CATEGORIES}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item}
              contentContainerStyle={{ paddingRight: 20 }}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  onPress={() => {
                    setActiveCategory(item);
                    setSearchQuery(''); // Clear search when picking a category
                  }}
                  className={`mr-2 px-4 py-1.5 rounded-full border ${
                    activeCategory === item && searchQuery === '' 
                    ? 'bg-emerald-600 border-emerald-600' 
                    : 'bg-white border-gray-200'
                  }`}
                >
                  <Text className={`text-xs font-bold ${
                    activeCategory === item && searchQuery === '' ? 'text-white' : 'text-gray-600'
                  }`}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        {/* 2. PRODUCT LIST (Scrollable) */}
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 12, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const qty = cart[item.id] || 0;
            return (
              <View className="flex-row bg-white p-3 mb-3 rounded-xl border border-gray-100 shadow-sm">
                {/* Image + Offer Tag */}
                <View className="relative mr-4">
                  <View className="border border-gray-100 rounded-lg p-1 bg-white">
                    <Image 
                      source={{ uri: item.image }} 
                      className="w-20 h-20" 
                      resizeMode="contain" 
                    />
                  </View>
                  <View className="absolute -top-1.5 -left-1.5 bg-green-600 px-1.5 py-0.5 rounded shadow-sm">
                    <Text className="text-[9px] font-bold text-white">{item.off} OFF</Text>
                  </View>
                </View>

                {/* Content */}
                <View className="flex-1 justify-between py-0.5">
                  <View>
                    <Text className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">{item.category}</Text>
                    <Text className="text-sm font-bold text-gray-900 line-clamp-2">{item.name}</Text>
                    <Text className="text-xs text-gray-500 mt-0.5">{item.weight}</Text>
                  </View>

                  <View className="flex-row items-end justify-between mt-2">
                    <View>
                      <Text className="text-xs text-gray-400 line-through">₹{item.mrp}</Text>
                      {/* NEW: Price Range Display */}
                      <Text className="text-base font-bold text-gray-900">₹{item.minPrice} - ₹{item.maxPrice}</Text>
                      <Text className="text-[8px] text-gray-400 font-medium">Est. Price</Text>
                    </View>

                    {/* ADD BUTTON */}
                    {qty === 0 ? (
                      <TouchableOpacity 
                        onPress={() => updateQty(item.id, 1)}
                        className="bg-emerald-50 border border-emerald-200 rounded px-6 py-2 active:bg-emerald-100"
                      >
                        <Text className="text-emerald-700 font-bold text-xs">ADD</Text>
                      </TouchableOpacity>
                    ) : (
                      <View className="flex-row items-center bg-emerald-600 rounded h-8 shadow-sm">
                        <TouchableOpacity 
                          onPress={() => updateQty(item.id, -1)}
                          className="w-9 h-full items-center justify-center border-r border-emerald-500"
                        >
                          <Minus size={14} color="white" />
                        </TouchableOpacity>
                        <Text className="text-white font-bold text-sm w-8 text-center">{qty}</Text>
                        <TouchableOpacity 
                          onPress={() => updateQty(item.id, 1)}
                          className="w-9 h-full items-center justify-center border-l border-emerald-500"
                        >
                          <Plus size={14} color="white" />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            );
          }}
          ListEmptyComponent={
             <View className="items-center justify-center mt-20">
                <Filter size={40} color="#D1D5DB" />
                <Text className="text-gray-400 font-bold mt-2">No items found</Text>
             </View>
          }
        />

        {/* 3. CART BAR (Bottom Right Navigation Update) */}
        {totalItems > 0 && (
          <View className="absolute bottom-0 left-0 right-0 p-4 bg-transparent">
             <TouchableOpacity 
               activeOpacity={0.9}
               onPress={() => router.push('/select-store')}
               className="bg-emerald-600 rounded-2xl p-4 flex-row items-center justify-between shadow-xl shadow-emerald-900/20"
             >
                <View className="flex-1">
                   {/* NEW: Estimated Total Range */}
                   <Text className="text-white font-bold text-lg">₹{minTotal} - ₹{maxTotal}</Text>
                   <Text className="text-emerald-100 text-xs font-medium">{totalItems} items added</Text>
                </View>
                
                <View className="flex-row items-center bg-emerald-800 px-4 py-2 rounded-xl">
                   <Text className="text-white font-bold text-sm mr-2">View Cart</Text>
                   <ArrowRight size={18} color="white" />
                </View>
             </TouchableOpacity>
          </View>
        )}

      </SafeAreaView>
    </View>
  );
}
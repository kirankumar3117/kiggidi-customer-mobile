import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Briefcase,
  Edit3,
  Home,
  MapPin,
  Plus,
  Trash2,
  X
} from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- TYPES ---
interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  type: 'home' | 'work' | 'other';
  isDefault: boolean;
}

// --- MOCK DATA ---
const INITIAL_ADDRESSES: Address[] = [
  {
    id: '1',
    name: 'Kiran Kumar',
    phone: '+91 98765 43210',
    address: '12-3-45, Main Road, Kanchikacherla, Krishna District, Andhra Pradesh - 521180',
    type: 'home',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Kiran Kumar',
    phone: '+91 98765 43210',
    address: 'Office Block A, Tech Park, Vijayawada, Andhra Pradesh - 520010',
    type: 'work',
    isDefault: false,
  },
];

export default function AddressesScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formType, setFormType] = useState<'home' | 'work' | 'other'>('home');

  const resetForm = () => {
    setFormName('');
    setFormPhone('');
    setFormAddress('');
    setFormType('home');
    setEditingAddress(null);
  };

  const closeModal = useCallback(() => {
    setShowAddForm(false);
    resetForm();
  }, []);

  const openAddForm = () => {
    resetForm();
    setShowAddForm(true);
  };

  const openEditForm = (addr: Address) => {
    setFormName(addr.name);
    setFormPhone(addr.phone);
    setFormAddress(addr.address);
    setFormType(addr.type);
    setEditingAddress(addr);
    setShowAddForm(true);
  };

  const handleSave = () => {
    if (!formName.trim() || !formPhone.trim() || !formAddress.trim()) {
      Alert.alert('Missing Fields', 'Please fill all required fields.');
      return;
    }

    if (editingAddress) {
      // Update existing
      setAddresses(prev =>
        prev.map(a =>
          a.id === editingAddress.id
            ? { ...a, name: formName, phone: formPhone, address: formAddress, type: formType }
            : a
        )
      );
    } else {
      // Add new
      const newAddr: Address = {
        id: Date.now().toString(),
        name: formName,
        phone: formPhone,
        address: formAddress,
        type: formType,
        isDefault: addresses.length === 0,
      };
      setAddresses(prev => [...prev, newAddr]);
    }

    setShowAddForm(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to remove this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setAddresses(prev => prev.filter(a => a.id !== id)),
        },
      ]
    );
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev =>
      prev.map(a => ({ ...a, isDefault: a.id === id }))
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home size={18} color="#059669" />;
      case 'work':
        return <Briefcase size={18} color="#3B82F6" />;
      default:
        return <MapPin size={18} color="#F59E0B" />;
    }
  };

  const getTypeBadgeStyle = (type: string) => {
    switch (type) {
      case 'home':
        return 'bg-emerald-50 border-emerald-200';
      case 'work':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-yellow-50 border-yellow-200';
    }
  };

  const getTypeTextStyle = (type: string) => {
    switch (type) {
      case 'home':
        return 'text-emerald-700';
      case 'work':
        return 'text-blue-700';
      default:
        return 'text-yellow-700';
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView className="flex-1">

        {/* --- HEADER --- */}
        <View className="px-5 py-4 bg-white border-b border-gray-100 flex-row justify-between items-center">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()} className="p-1">
              <ArrowLeft size={24} color="#111827" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-900">Address Book</Text>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

          {/* --- ADD NEW ADDRESS BUTTON --- */}
          <TouchableOpacity
            onPress={openAddForm}
            className="mx-4 mt-4 bg-white border-2 border-dashed border-emerald-300 rounded-2xl p-4 flex-row items-center justify-center"
          >
            <View className="w-10 h-10 bg-emerald-50 rounded-full items-center justify-center mr-3">
              <Plus size={22} color="#059669" />
            </View>
            <View>
              <Text className="text-base font-bold text-emerald-700">Add New Address</Text>
              <Text className="text-xs text-gray-400 mt-0.5">Home, Work, or Other</Text>
            </View>
          </TouchableOpacity>

          {/* --- SAVED ADDRESSES LIST --- */}
          {addresses.length > 0 && (
            <View className="mx-4 mt-6 mb-4">
              <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">
                Saved Addresses ({addresses.length})
              </Text>

              {addresses.map((addr) => (
                <View
                  key={addr.id}
                  className={`bg-white rounded-2xl p-4 mb-3 border ${addr.isDefault ? 'border-emerald-200' : 'border-gray-100'
                    } shadow-sm`}
                >
                  {/* Top Row: Type badge + Default */}
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center gap-2">
                      <View className={`flex-row items-center gap-1.5 px-2.5 py-1 rounded-lg border ${getTypeBadgeStyle(addr.type)}`}>
                        {getTypeIcon(addr.type)}
                        <Text className={`text-xs font-bold uppercase ${getTypeTextStyle(addr.type)}`}>
                          {addr.type}
                        </Text>
                      </View>
                      {addr.isDefault && (
                        <View className="bg-emerald-600 px-2 py-0.5 rounded-md">
                          <Text className="text-[10px] font-bold text-white">DEFAULT</Text>
                        </View>
                      )}
                    </View>

                    {/* Actions */}
                    <View className="flex-row items-center gap-2">
                      <TouchableOpacity
                        onPress={() => openEditForm(addr)}
                        className="p-1.5 bg-gray-50 rounded-lg"
                      >
                        <Edit3 size={16} color="#6B7280" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDelete(addr.id)}
                        className="p-1.5 bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Name & Phone */}
                  <Text className="text-base font-bold text-gray-900">{addr.name}</Text>
                  <Text className="text-sm text-gray-500 mt-0.5">{addr.phone}</Text>

                  {/* Full Address */}
                  <Text className="text-sm text-gray-600 mt-2 leading-5">{addr.address}</Text>

                  {/* Set as Default */}
                  {!addr.isDefault && (
                    <TouchableOpacity
                      onPress={() => handleSetDefault(addr.id)}
                      className="mt-3 pt-3 border-t border-gray-100"
                    >
                      <Text className="text-xs font-bold text-emerald-600">Set as Default</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* --- EMPTY STATE --- */}
          {addresses.length === 0 && (
            <View className="items-center justify-center mt-20 px-6">
              <View className="w-32 h-32 bg-gray-100 rounded-full items-center justify-center mb-6">
                <MapPin size={56} color="#9CA3AF" />
              </View>
              <Text className="text-lg font-bold text-gray-900 mb-2">No saved addresses</Text>
              <Text className="text-gray-500 text-center mb-6">
                Add your delivery address to get started with quick ordering.
              </Text>
              <TouchableOpacity
                onPress={openAddForm}
                className="bg-emerald-600 px-8 py-3 rounded-xl shadow-lg shadow-emerald-200"
              >
                <Text className="text-white font-bold text-base">Add Address</Text>
              </TouchableOpacity>
            </View>
          )}

          <View className="h-20" />
        </ScrollView>

        {/* ================================================================
           ADD / EDIT ADDRESS MODAL
           ================================================================ */}
        <Modal
          visible={showAddForm}
          animationType="slide"
          transparent={false}
          onRequestClose={closeModal}
        >
          <SafeAreaView className="flex-1 bg-white">
            {/* Modal Header — matches the main screen header */}
            <View className="px-5 py-4 bg-white border-b border-gray-100 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-gray-900">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </Text>
              <Pressable
                onPress={closeModal}
                style={{ padding: 8, backgroundColor: '#F3F4F6', borderRadius: 20 }}
              >
                <X size={20} color="#6B7280" />
              </Pressable>
            </View>

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              className="flex-1"
            >
              <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>

                {/* Address Type Selector */}
                <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Address Type
                </Text>
                <View className="flex-row gap-3 mb-5">
                  {(['home', 'work', 'other'] as const).map((type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() => setFormType(type)}
                      className={`flex-1 flex-row items-center justify-center py-3 rounded-xl border ${formType === type
                        ? type === 'home'
                          ? 'bg-emerald-50 border-emerald-400'
                          : type === 'work'
                            ? 'bg-blue-50 border-blue-400'
                            : 'bg-yellow-50 border-yellow-400'
                        : 'bg-gray-50 border-gray-200'
                        }`}
                    >
                      {type === 'home' && <Home size={16} color={formType === type ? '#059669' : '#9CA3AF'} />}
                      {type === 'work' && <Briefcase size={16} color={formType === type ? '#3B82F6' : '#9CA3AF'} />}
                      {type === 'other' && <MapPin size={16} color={formType === type ? '#F59E0B' : '#9CA3AF'} />}
                      <Text className={`ml-1.5 text-sm font-bold capitalize ${formType === type
                        ? type === 'home'
                          ? 'text-emerald-700'
                          : type === 'work'
                            ? 'text-blue-700'
                            : 'text-yellow-700'
                        : 'text-gray-400'
                        }`}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Name Input */}
                <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Full Name *
                </Text>
                <TextInput
                  value={formName}
                  onChangeText={setFormName}
                  placeholder="e.g. Kiran Kumar"
                  placeholderTextColor="#D1D5DB"
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 mb-4"
                />

                {/* Phone Input */}
                <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Phone Number *
                </Text>
                <TextInput
                  value={formPhone}
                  onChangeText={setFormPhone}
                  placeholder="e.g. +91 98765 43210"
                  placeholderTextColor="#D1D5DB"
                  keyboardType="phone-pad"
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 mb-4"
                />

                {/* Address Input */}
                <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Full Address *
                </Text>
                <TextInput
                  value={formAddress}
                  onChangeText={setFormAddress}
                  placeholder="House No, Street, Area, City, State - PIN"
                  placeholderTextColor="#D1D5DB"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 mb-6 min-h-[80px]"
                />

                {/* Save Button */}
                <TouchableOpacity
                  onPress={handleSave}
                  className="bg-emerald-600 py-4 rounded-xl shadow-lg shadow-emerald-200 mb-8"
                >
                  <Text className="text-white text-center font-bold text-base">
                    {editingAddress ? 'Update Address' : 'Save Address'}
                  </Text>
                </TouchableOpacity>

              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </Modal>

      </SafeAreaView>
    </View>
  );
}

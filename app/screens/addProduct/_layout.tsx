import React from 'react';
import { Stack, router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const LogoutButton = () => {

  const goBack = () => {
    router.replace('/(auth)/ilanVer')
  };

  return (
    <TouchableOpacity onPress={goBack}>
      <Ionicons name="chevron-back-outline" size={35} color="white" ></Ionicons>
    </TouchableOpacity>
  );
};
const AdsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4F80FF',
        },
        headerTintColor: '#fff',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen
        name="addBook"
        options={{
          headerTitle: 'Kitap Ekle',
          headerTitleAlign: 'center',
          headerLeft: () => <LogoutButton />
        }}></Stack.Screen>
       
      <Stack.Screen
        name="addTechnology"
        options={{
          headerTitle: 'Teknoloji Ürünü Ekle',
          headerTitleAlign: 'center',
          headerLeft: () => <LogoutButton />
        }}></Stack.Screen>
      <Stack.Screen
        name="addSportEquipment"
        options={{
          headerTitle: 'Spor Ekipmanı Ekle',
          headerTitleAlign: 'center',
          headerLeft: () => <LogoutButton />
          
        }}></Stack.Screen>
      
      <Stack.Screen
        name="addCloth"
        options={{
          headerTitle: 'Giyim Ürünü Ekle',
          headerTitleAlign: 'center',
          headerLeft: () => <LogoutButton />
        }}></Stack.Screen>    
          
    </Stack>
  );
};

export default AdsLayout;
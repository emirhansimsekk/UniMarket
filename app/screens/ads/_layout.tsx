import React from 'react';
import { Stack, router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
export const LogoutButton = () => {

  const goBack = () => {
    router.replace('/(auth)/home')
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
        name="kitapIlanlari"
        options={{
          headerTitle: 'Kitaplar',
          headerTitleAlign: 'center',
          headerLeft: () => <LogoutButton />
        }}></Stack.Screen>
       
      <Stack.Screen
        name="sporIlanlari"
        options={{
          headerTitle: 'Spor Ekipmanları',
          headerTitleAlign: 'center',
          headerLeft: () => <LogoutButton />
        }}></Stack.Screen>
      <Stack.Screen
        name="teknolojiIlanlari"
        options={{
          headerTitle: 'Teknoloji Ürünleri',
          headerTitleAlign: 'center',
          headerLeft: () => <LogoutButton />
        }}></Stack.Screen>
      <Stack.Screen
        name="giyimIlanlari"
        options={{
          headerTitle: 'Giyim Ürünleri',
          headerTitleAlign: 'center',
          headerLeft: () => <LogoutButton />
        }}></Stack.Screen> 
      <Stack.Screen
        name="urunDetay"
        options={{
          headerTitle: 'Ürün Detayı',
          headerTitleAlign: 'center',
          headerLeft: () => <LogoutButton />
        }}></Stack.Screen>    
      <Stack.Screen
        name="myAds"
        options={{
          headerTitle: 'Ilanlarim',
          headerTitleAlign: 'center',
          headerLeft: () => <LogoutButton />
        }}></Stack.Screen>    
          
    </Stack>
  );
};

export default AdsLayout;
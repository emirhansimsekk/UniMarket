import React from 'react';
import { Stack } from 'expo-router';

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
        }}></Stack.Screen>
       
      <Stack.Screen
        name="sporIlanlari"
        options={{
          headerTitle: 'Spor Ekipmanları',
          headerTitleAlign: 'center',
        }}></Stack.Screen>
      <Stack.Screen
        name="teknolojiIlanlari"
        options={{
          headerTitle: 'Teknoloji Ürünleri',
          headerTitleAlign: 'center',
        }}></Stack.Screen>
      <Stack.Screen
        name="giyimIlanlari"
        options={{
          headerTitle: 'Giyim Ürünleri',
          headerTitleAlign: 'center',
        }}></Stack.Screen> 
      <Stack.Screen
        name="urunDetay"
        options={{
          headerTitle: 'Ürün Detayı',
          headerTitleAlign: 'center',
        }}></Stack.Screen>    
          
    </Stack>
  );
};

export default AdsLayout;
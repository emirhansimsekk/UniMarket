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
        name="addBook"
        options={{
          headerTitle: 'Kitap Ekle',
          headerTitleAlign: 'center',
        }}></Stack.Screen>
       
      <Stack.Screen
        name="addTechnology"
        options={{
          headerTitle: 'Teknoloji Ürünü Ekle',
          headerTitleAlign: 'center',
        }}></Stack.Screen>
      <Stack.Screen
        name="addSportEquipment"
        options={{
          headerTitle: 'Spor Ekipmanı Ekle',
          headerTitleAlign: 'center',
        }}></Stack.Screen>
      
      <Stack.Screen
        name="addCloth"
        options={{
          headerTitle: 'Giyim Ürünü Ekle',
          headerTitleAlign: 'center',
        }}></Stack.Screen>    
          
    </Stack>
  );
};

export default AdsLayout;
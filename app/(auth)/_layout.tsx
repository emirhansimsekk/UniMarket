import { Tabs } from 'expo-router';
import { Ionicons, MaterialIcons, } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';

export const LogoutButton = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={'#fff'} />
    </Pressable>
  );
};

const TabsPage = () => {
  const { isSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4F80FF',
        },
        headerTintColor: '#fff',
      }}>
      <Tabs.Screen
        name="home"
        options={{
          href: '(auth)/home',
          headerTitle: 'Ana Sayfa',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          tabBarLabel: 'Ana Sayfa',
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="ilanVer"
        options={{
          href: '(auth)/ilanVer',
          headerTitle: 'İlan Ver',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="add-to-photos" size={35} color={color}  />,
          tabBarLabel: 'İlan Ver',
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'Profilim',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          tabBarLabel: 'Profilim',
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
};

export default TabsPage;
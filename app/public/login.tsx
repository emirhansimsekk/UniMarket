import { useSignIn } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Pressable, Text, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      <TextInput autoCapitalize="none" placeholder="E-Mail (@ismu.edu.tr)" value={emailAddress} onChangeText={setEmailAddress} style={styles.inputField} />
      <TextInput placeholder="Sifre" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputField} />

      <Button onPress={onSignInPress} title="Giris Yap" color={'#4F80FF'}></Button>

      <Link href="/public/register" asChild>
        <Pressable style={styles.button}>
          <Text style = {{textDecorationLine:'underline'}}>Uye Ol</Text>
        </Pressable>
      </Link>

      <Link href="/public/reset" asChild>
        <Pressable style={styles.button}>
          <Text style = {{textDecorationLine:'underline', fontWeight:'300', fontStyle:"italic"}}>Sifreni mi unuttun?</Text>
        </Pressable>
      </Link>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#4F80FF',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    margin: 8,
    alignItems: 'center',
  },
});

export default Login;
import { Alert, Platform, StyleSheet, ToastAndroid, View } from 'react-native';
import { Appbar, Button, TextInput } from 'react-native-paper';
import React, { useCallback, useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

function formatPhoneNumber(phone: string): string {
  if (phone.length === 10) {
    return `+33@${phone.slice(1)}`;
  } else if (phone.length === 9) {
    return `+33@${phone}`;
  } else if (phone.startsWith('+33')) {
    return phone.replace(/^(\+33)(\d{9})$/, '$1@$2');
  } else {
    return phone;
  }
}

function LoginScreen({ navigation }: { navigation: any }) {
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [deviceId, setDeviceId] = useState<string>('');
  const onLogin = useCallback(() => {
    fetch('https://prod-auth.pixpay.app/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 13; Subsystem for Android(TM) Build/TQ3A.230901.001)',
      },
      body: String(new URLSearchParams({
        login: formatPhoneNumber(phone),
        password,
        deviceId,
        auth_type: 'pwd',
        checkOnly: 'false',
        publicKey: '-----BEGIN RSA PUBLIC KEY-----MIGJAoGBAMmbkVGKpEyc27dDznkmOz99b5Wg1fNiY0AI2mdFnTyv79RBW2/379jUsSRUJ1HOyctI9xXFlKivupqYRsv/pvUjVfHNM3E4I6OjBjw6S4XhifaKLv3hYSVufsgZPi2ht8paCcO57XnyOebDcN0k+UKZ+XOoyxh5wGvl4Bx66ZPjAgMBAAE=-----END RSA PUBLIC KEY-----',
        scaToken: '', // j'ai passé une heure à décompiler l'appli pour comprendre que y'a AUCUN check de la valeur du token 😹😹😹
      })),
    })
      .then((response) => response.json())
      .then(async (res) => {
        if (res.statusCode === 500) {
          if (Platform.OS === 'android') {
            ToastAndroid.show('Numéro de téléphone ou mot de passe invalide', ToastAndroid.SHORT);
          } else {
            Alert.alert('Numéro de téléphone ou mot de passe invalide');
          }
        } else if (res.message === 'login.error.wrongloginpwd') {
          if (Platform.OS === 'android') {
            ToastAndroid.show('Mot de passe invalide', ToastAndroid.SHORT);
          } else {
            Alert.alert('Mot de passe invalide');
          }
        } else if (res.step === 'LOGIN') {
          await AsyncStorage.setItem('token', res.session.token);
          await AsyncStorage.setItem('token_expires_at', String(res.session.expires_at));
          await AsyncStorage.setItem('user_password', password);
          await AsyncStorage.setItem('user_phone', phone);
          navigation.navigate('Main');
        }
      })
      .catch((error) => {
        console.error(error);
        if (Platform.OS === 'android') {
          ToastAndroid.show('Une erreur est survenue', ToastAndroid.SHORT);
        } else {
          Alert.alert('Une erreur est survenue');
        }
      });
  }, [deviceId, navigation, password, phone]);

  useEffect(() => {
    AsyncStorage.getItem('deviceId')
      .then((id) => {
        if (!id) {
          id = uuid.v4();
          AsyncStorage.setItem('deviceId', id);
        }
        setDeviceId(id);
      });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('user_phone').then(async phone => {
      if (phone) setPhone(phone);
      const pwd = await AsyncStorage.getItem('user_password');
      if (pwd) setPassword(pwd);
      if (phone && pwd) onLogin();
    });
  }, [onLogin]);

  return (
    <View>
      <Appbar>
        <Appbar.Content title="Se connecter" />
      </Appbar>
      <View style={styles.container}>
        <TextInput
          label="Numéro de téléphone" mode="outlined" keyboardType="phone-pad" onChangeText={setPhone} value={phone}
        />
        <TextInput
          label="Mot de passe" mode="outlined" secureTextEntry keyboardType="decimal-pad" onChangeText={setPassword} value={password}
          maxLength={6}
        />
        <Button
          mode="contained" onPress={onLogin}
        >Se connecter</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
});

export default LoginScreen;

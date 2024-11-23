import { Appbar, List } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { getWallets } from '../helpers/api.ts';
import { Alert, Platform, ToastAndroid, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

function copy(text: string) {
  Clipboard.setString(text);
  if (Platform.OS === 'android') {
    ToastAndroid.show('Copié', ToastAndroid.SHORT);
  } else {
    Alert.alert('Copié');
  }
}

export default function RIBScreen({ navigation }: { navigation: any }) {
  const [iban, setIban] = useState<string>('');
  const [bic, setBic] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    getWallets()
      .then(async (wallets) => {
        const data = wallets.data.synchroWallets.wallets.find((wallet: any) => wallet.isMain && wallet.bic && wallet.iban);
        setIban(data.iban);
        setBic(data.bic);
        setName(data.name.replace(/\[.*] /, ''));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="RIB" />
      </Appbar>
      <View>
        <List.Section>
          <List.Subheader>
            Cliquez sur un élément pour le copier
          </List.Subheader>
          <List.Item
            title="Nom" description={name} onPress={() => copy(name)}
          />
          <List.Item
            title="IBAN" description={iban} onPress={() => copy(iban)}
          />
          <List.Item
            title="BIC" description={bic} onPress={() => copy(bic)}
          />
        </List.Section>
      </View>
    </>
  );
}

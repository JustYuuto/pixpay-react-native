import { View } from 'react-native';
import { Appbar, Text, Tooltip } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import PaymentsHistoryScreen from './PaymentsHistoryScreen.tsx';
import { getWallets } from '../helpers/api.ts';

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [creditCardBalance, setCreditCardBalance] = useState<number>(0);

  useEffect(() => {
    getWallets()
      .then(async (wallets) => {
        console.log(wallets);
        const data = wallets.data.synchroWallets.wallets.find((wallet: any) => wallet.isMain && wallet.bic && wallet.iban);
        setCreditCardBalance(data.balance);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Appbar>
        <Appbar.Content title="Dépenses" />
        <Tooltip title="Notifications">
          <Appbar.Action icon="bell" onPress={() => navigation.navigate('Notifications')} />
        </Tooltip>
        <Tooltip title="Paramètres">
          <Appbar.Action icon="cog" onPress={() => navigation.navigate('Settings')} />
        </Tooltip>
      </Appbar>
      <View>
        <View>
          <Text>Solde de ta carte</Text>
          <Text>{creditCardBalance} €</Text>
        </View>
        <Tab.Navigator>
          <Tab.Screen name="History" options={{
            tabBarLabel: 'Historique',
          }} component={PaymentsHistoryScreen} />
        </Tab.Navigator>
      </View>
    </>
  );
}

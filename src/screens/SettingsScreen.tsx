import { Appbar, List } from 'react-native-paper';
import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getMe } from '../helpers/api.ts';

function parseBirthdate(birthdate: string): string {
  const day = birthdate.slice(0, 2);
  const month = birthdate.slice(2, 4);
  const year = birthdate.slice(4, 8);
  return new Date(`${year}-${month}-${day}`).toLocaleDateString();
}

export default function SettingsScreen({ navigation }: { navigation: any }) {
  const [user, setUser] = useState<any|null>(null);

  useEffect(() => {
    getMe()
      .then(async (res) => {
        console.log(res.data.me);
        setUser(res.data.me);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return user && (
    <View>
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Paramètres" />
      </Appbar>
      <View>
        <List.Section>
          <List.Item title={user.child.firstname + ' ' + user.child.lastname} />
          <List.Item title="Membre depuis" description={new Date(user.child.createdDate).toLocaleString()} />
        </List.Section>
        <List.Section>
          <List.Subheader>Informations personnelles</List.Subheader>
          <List.Item title="Email" description={user.child.email} />
          <List.Item title="Téléphone" description={user.child.phone} />
          <List.Item title="Date de naissance" description={parseBirthdate(user.child.birthdate)} />
        </List.Section>
        <List.Section>
          <List.Subheader>Compte</List.Subheader>
          <List.Item
            // eslint-disable-next-line react/no-unstable-nested-components
            title="RIB" onPress={() => navigation.navigate('RIB')} right={() => <List.Icon icon="chevron-right" />}
            description="Voir mon RIB, mon IBAN et mon BIC"
          />
        </List.Section>
      </View>
    </View>
  );
}

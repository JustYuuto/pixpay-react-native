import { useEffect, useState } from 'react';
import { getNotifications } from '../helpers/api.ts';
import React from 'react';
import { Appbar } from 'react-native-paper';

export default function NotificationsScreen({ navigation }: { navigation: any }) {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    getNotifications()
      .then((notifications) => {
        setNotifications(notifications.data.findInappNotification);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Activité" />
      </Appbar>
    </>
  );
}

import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import React, { useEffect, useState } from 'react';
import HomeScreen from './HomeScreen.tsx';
import { getMe } from '../helpers/api.ts';

const Tab = createMaterialBottomTabNavigator();

export default function MainScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMe()
      .then(async (res) => {
        setUser(res.data.me);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: 'home',
      }} />
    </Tab.Navigator>
  );
}

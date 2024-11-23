import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './screens/LoginScreen.tsx';
import { PaperProvider, MD3DarkTheme } from 'react-native-paper';
import MainScreen from './screens/MainScreen.tsx';
import NotificationsScreen from './screens/NotificationsScreen.tsx';
import SettingsScreen from './screens/SettingsScreen.tsx';
import RIBScreen from './screens/RIBScreen.tsx';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <PaperProvider theme={MD3DarkTheme}>
      {/* @ts-ignore */}
      <NavigationContainer theme={MD3DarkTheme}>
        <Stack.Navigator initialRouteName="Login" screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="RIB" component={RIBScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;

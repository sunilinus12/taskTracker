/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { AppNavigation, navigationRef } from './src/navigation';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { requestPermission } from './src/utils';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { useNotificationListener } from './src/hooks/useNotificationListener';

function App() {
  const handleNotification = (data?: any) => {
    try {
      if (!data) return;
      const screen = data.screen;
      const params = data.params ? JSON.parse(data.params) : {};
      navigationRef.current?.navigate(screen, {
        taskId: { ...params.taskId },
        canUpdate: true,
      });
    } catch (error) {
      console.error('error from', handleNotification);
    }
  };

  notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.PRESS) {
      const data = detail.notification?.data;
      handleNotification(data);
    }
  });

  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    requestPermission();
    const createChannel = async () => {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    };
    createChannel();
  }, []);
  useNotificationListener();
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer ref={navigationRef}>
            <AppNavigation />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

import { useEffect } from 'react';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { navigationRef } from '../navigation';
import { requestPermission } from '../utils';

export const useNotificationListener = () => {
  const handleNotification = (data?: any) => {
    try {
      if (!data) return;
      const screen = data.screen;
      const params = data.params ? JSON.parse(data.params) : {};
      navigationRef.current?.navigate(screen, {
        taskId: { ...params.task },
        canUpdate: true,
      });
    } catch (error) {
      console.error('error from', handleNotification);
    }
  };
  const createChannel = async () => {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
  };
  const checkInitialNotification = async () => {
    const initialNotification = await notifee.getInitialNotification();
    if (initialNotification) {
      if (initialNotification.pressAction?.id === 'default') {
        handleNotification(initialNotification.notification?.data);
      }
    }
  };
  useEffect(() => {
    requestPermission();
    createChannel();
    checkInitialNotification();
    const unsubscribeForeground = notifee.onForegroundEvent(
      async ({ type, detail }) => {
        console.log('data come', type, detail);

        if (type === EventType.PRESS) {
          handleNotification(detail.notification?.data);
        }
      },
    );

    return () => {
      unsubscribeForeground();
    };
  }, []);

  return {
    handleNotification,
  };
};

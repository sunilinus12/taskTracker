import { useEffect } from 'react';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { navigationRef } from '../navigation';
import { requestPermission } from '../utils';
import { Alert } from 'react-native';

const useNotificationListener = () => {
  const handleNotification = (data?: any) => {
    try {
      if (!data) return;
      const screen = data.screen;
      const params = data.params ? JSON.parse(data.params) : {};

      if (navigationRef.current?.isReady()) {
        navigationRef.current.navigate(screen, {
          task: { ...params.task },
          canUpdate: true,
          taskId: params.id,
        });
      }
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
    const initNotifications = async () => {
      await requestPermission();
      await createChannel();
      await checkInitialNotification();
    };
    initNotifications();
    const unsubscribeForeground = notifee.onForegroundEvent(
      async ({ type, detail }) => {
        if (type == EventType.DELIVERED) {
          Alert.alert('Notification Received', 'You have a new message');
        }
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

export default useNotificationListener;

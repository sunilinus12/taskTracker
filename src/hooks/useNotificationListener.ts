import { useEffect } from 'react';
import notifee, { EventType } from '@notifee/react-native';
import { navigate, navigationRef } from '../navigation';

export const useNotificationListener = () => {
  useEffect(() => {
    const unsubscribeForeground = notifee.onForegroundEvent(
      async ({ type, detail }) => {
        if (type === EventType.PRESS) {
          handleNotification(detail.notification?.data);
        }
      },
    );

    return () => {
      unsubscribeForeground();
    };
  }, []);
};

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

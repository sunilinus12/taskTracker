import { useEffect } from 'react';
import notifee, { EventType } from '@notifee/react-native';
import { navigationRef } from '../navigation';

export const useNotificationListener = () => {
  useEffect(() => {
    const unsubscribeForeground = notifee.onForegroundEvent(
      async ({ type, detail }) => {
        console.log("data come",type,detail);
        
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
    console.log("gone in to notificaton()",data);
    
    if (!data) return;
    const screen = data.screen;
    const params = data.params ? JSON.parse(data.params) : {};
    console.log("ppp",params);
    
    navigationRef.current?.navigate(screen, {
      taskId: { ...params.task },
      canUpdate: true,
    });
  } catch (error) {
    console.error('error from', handleNotification);
  }
};

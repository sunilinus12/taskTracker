import { useEffect } from 'react';
import {
  getMessaging,
  requestPermission,
  getToken,
  AuthorizationStatus
} from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';

export function useFcmSetup() {
  useEffect(() => {
    const setup = async () => {
      const messaging = getMessaging(getApp());

      const authStatus = await requestPermission(messaging);
      if (
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL
      ) {
        const token = await getToken(messaging);
        // console.log('FCM Token:', token);
      }
    };

    setup();
  }, []);
}

export default useFcmSetup;

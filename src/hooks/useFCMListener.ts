import { useEffect } from "react";
import { Alert } from "react-native";
import {
  getMessaging,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
  FirebaseMessagingTypes
} from "@react-native-firebase/messaging";
import { getApp } from "@react-native-firebase/app";

import { RootStackParamList } from "../navigation/AppNavigation";
import { navigate } from "../navigation";

export function useFCMListener() {
  useEffect(() => {
    const messaging = getMessaging(getApp());

    const unsubscribeOnMessage = onMessage(
      messaging,
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log("Foreground notification:", remoteMessage);
        Alert.alert(
          remoteMessage.notification?.title || "Notification",
          remoteMessage.notification?.body || ""
        );
      }
    );

    const unsubscribeOnNotificationOpenedApp = onNotificationOpenedApp(
      messaging,
      (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log("Notification opened (background):", remoteMessage);
        handleNavigation(remoteMessage);
      }
    );

    getInitialNotification(messaging).then(remoteMessage => {
      console.log("App opened from quit state:", remoteMessage);
      if (remoteMessage) handleNavigation(remoteMessage);
    });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };
  }, []);

  const handleNavigation = (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    const screen = remoteMessage.data?.screen as keyof RootStackParamList;
    let params: any = {};

    if (remoteMessage.data?.params) {
      if (typeof remoteMessage.data.params === "string") {
        try {
          params = JSON.parse(remoteMessage.data.params);
        } catch (e) {
          console.warn("Failed to parse params:", e);
          params = {};
        }
      } else if (typeof remoteMessage.data.params === "object") {
        params = remoteMessage.data.params;
      }
    }

    if (screen) {
      navigate(screen, params);
    }
  };
}

export default useFCMListener;

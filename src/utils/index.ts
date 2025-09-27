import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import notifee, {
  AndroidImportance,
  AuthorizationStatus,
} from '@notifee/react-native';
import { Task } from '../components/RenderItemCard';

export const timeConversion = (isoString: any): string => {
  try {
    // Ensure isoString is a string
    const dateStr =
      typeof isoString === 'string' ? isoString : String(isoString);

    const d = new Date(dateStr);

    if (isNaN(d.getTime())) {
      // Invalid date
      console.error('Invalid date:', isoString);
      return String(isoString);
    }

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const hourStr = String(hours).padStart(2, '0');

    return `${year}-${month}-${day} ${hourStr}:${minutes} ${ampm}`;
  } catch (error) {
    console.error('Error in timeConversion:', error);
    return String(isoString);
  }
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const FontScale = (size: number) => RFValue(size);

export const WidthPercentage = (percentage: number) =>
  (SCREEN_WIDTH * percentage) / 100;

export const HeightPercentage = (percentage: number) =>
  (SCREEN_HEIGHT * percentage) / 100;

export const requestPermission = async () => {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    console.log('✅ Notification permissions granted.');
  } else {
    console.warn('⚠️ Notification permissions denied.');
  }
};

export const sendLocalNotification = async (obj: Task) => {
  await notifee.displayNotification({
    title: 'Demo Task Created',
    body: 'Tap to view task details',
    android: {
      channelId: 'default',
      smallIcon: 'ic_launcher', // your icon
      importance: AndroidImportance.HIGH,
      pressAction: {
      id: 'default', // 👈 mandatory for PRESS event
    },
    },
    ios: {
      sound: 'default',
    },
    data: {
      screen: 'TaskDetails',
      params: JSON.stringify({ task: obj }),
    },
  });
};

import { createNavigationContainerRef } from '@react-navigation/native';
import AppNavigation, { RootStackParamList } from './AppNavigation';

export const linking = {
  prefixes: ['com.trasktracer://'],
  config: {
    screens: {
      Home: '',
      TaskDetails: 'task/:taskId',
    },
  },
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();
export { AppNavigation };

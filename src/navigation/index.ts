import { createNavigationContainerRef } from '@react-navigation/native';
import AppNavigation, { RootStackParamList } from './AppNavigation';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();
export { AppNavigation };

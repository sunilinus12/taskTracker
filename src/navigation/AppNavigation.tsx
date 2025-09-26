import React, { useEffect } from 'react';
import { TaskDetailsScreen, TaskScreen } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Task } from '../components/RenderItemCard';
import { requestPermission } from '../utils';
import notifee, { AndroidImportance } from '@notifee/react-native';

export type RootStackParamList = {
  Home: undefined; // no params
  TaskDetails: { task?: Task | undefined ,canUpdate:boolean};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Home"
        component={TaskScreen}
        options={{ title: 'Task Tracker' }}
      />
      <Stack.Screen
        name="TaskDetails"
        component={TaskDetailsScreen}
        options={{ title: 'Task Details' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigation;

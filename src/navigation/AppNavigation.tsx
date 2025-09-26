import React from 'react';
import { TaskDetailsScreen, TaskScreen } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Task } from '../components/RenderItemCard';
import { useFCMListener, useFcmSetup } from '../hooks';

export type RootStackParamList = {
  Home: undefined; // no params
  TaskDetails: { task?: Task | undefined; canUpdate: boolean };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation: React.FC = () => {
  useFcmSetup()
  useFCMListener()
  return (
    
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
    
  );
};

export default AppNavigation;

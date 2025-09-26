import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { CommonHeader, FloatingIcon, RenderItemCard } from '../components';
import { Task } from '../components/RenderItemCard';
import { sampleTasks } from '../constants';
import { useAppSelector } from '../store/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const TaskScreen: React.FC<Props> = ({ navigation }) => {
  const { tasks: listTasks } = useAppSelector(e => e.tasks);
  const renderCard = ({ item }: { item: Task }) => (
    <RenderItemCard
      task={item}
      onPress={() => {
        navigation.navigate('TaskDetails', { task: item,canUpdate:true });
      }}
    />
  );
  return (
    <View style={styles.container}>
      <CommonHeader title="Tasks" />
      <FlatList
        contentContainerStyle={styles.flatlistContainer}
        data={listTasks as Task[]}
        keyExtractor={(i, k) => i.id.toString()}
        renderItem={renderCard}
      />
      <FloatingIcon
        onPress={() => {
          navigation.navigate('TaskDetails', { task: undefined,canUpdate:false});
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  flatlistContainer: {
    flexGrow: 1,
    padding: 10,
  },
});

export default TaskScreen;

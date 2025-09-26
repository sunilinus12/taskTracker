import React, { useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { CommonHeader, FloatingIcon, ListEmptyComponent, RenderItemCard } from '../components';
import { Task } from '../components/RenderItemCard';
import { useAppSelector } from '../store/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const TaskScreen: React.FC<Props> = ({ navigation }) => {
  const { tasks: listTasks } = useAppSelector(e => e.tasks);





  const renderCard = useCallback(
    ({ item }: { item: Task }) => (
      <RenderItemCard
        task={item}
        onPress={() =>
          navigation.navigate('TaskDetails', {
            task: item,
            canUpdate: true,
          })
        }
      />
    ),
    [listTasks],
  );

  const keyExtractor = useCallback((item: Task) => item.id.toString(), []);

  const handleFloatingIconPress = () => {
    navigation.navigate('TaskDetails', {
      task: undefined,
      canUpdate: false,
    });
  };
  return (
    <View style={styles.container}>
      <CommonHeader title="Tasks" subtitle="" />
      <FlatList
        contentContainerStyle={styles.flatlistContainer}
        data={listTasks as Task[]}
        keyExtractor={keyExtractor}
        renderItem={renderCard}
        ListEmptyComponent={ListEmptyComponent}
      />
      <FloatingIcon onPress={handleFloatingIconPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  flatlistContainer: {
    flexGrow: 1,
    padding: 10,
  },
});

export default TaskScreen;

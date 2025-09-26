import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import {
  CommonHeader,
  FloatingIcon,
  ListEmptyComponent,
  LoadingComponent,
  RenderItemCard,
} from '../components';
import { Task } from '../components/RenderItemCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { FontScale, HeightPercentage, WidthPercentage } from '../utils';
import { loadTasks } from '../store/slices/taskSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const TaskScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { tasks: listTasks, loading } = useAppSelector(e => e.tasks);

  useLayoutEffect(() => {
    dispatch(loadTasks());
  }, []);

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
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <FlatList
            contentContainerStyle={styles.flatlistContainer}
            data={listTasks as Task[]}
            keyExtractor={keyExtractor}
            renderItem={renderCard}
            ListEmptyComponent={ListEmptyComponent}
          />
          <FloatingIcon onPress={handleFloatingIconPress} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  title: {
    fontSize: FontScale(20),
    fontWeight: 'bold',
    marginBottom: HeightPercentage(16),
  },
  flatlistContainer: {
    flexGrow: 1,
    padding: WidthPercentage(2.5),
  },
});

export default TaskScreen;

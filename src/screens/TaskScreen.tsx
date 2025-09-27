import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import {
  CommonHeader,
  CustomTextInput,
  FloatingIcon,
  ListEmptyComponent,
  LoadingComponent,
  RenderItemCard,
} from '../components';
import { Task } from '../components/RenderItemCard';
import { FontScale, HeightPercentage, WidthPercentage } from '../utils';
import { useTask } from '../hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const TaskScreen: React.FC<Props> = ({ navigation }) => {
  const { onChangeText, search, filterList, loading, listTasks } = useTask();

  const renderCard = useCallback(
    ({ item }: { item: Task }) => (
      <RenderItemCard
        task={item}
        onPress={() =>
          navigation.navigate('TaskDetails', {
            task: item.id,
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
  const renderList = useMemo(
    () =>
      loading ? (
        <LoadingComponent />
      ) : (
        <>
          <FlatList
            contentContainerStyle={styles.flatlistContainer}
            data={search ? filterList : (listTasks as Task[])}
            keyExtractor={keyExtractor}
            renderItem={renderCard}
            ListEmptyComponent={ListEmptyComponent}
          />
          {!search && <FloatingIcon onPress={handleFloatingIconPress} />}
        </>
      ),
    [listTasks, loading, renderCard, keyExtractor, handleFloatingIconPress],
  );
  return (
    <View style={styles.container}>
      <CommonHeader
        title="Tasks"
        subtitle=""
        showSearchField={true}
        searchValue={search}
        searchPlaceholder="🔍 Search tasks..."
        onSearchTextChange={onChangeText}
      />

      {renderList}
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
  searchContainer: {
    marginHorizontal: WidthPercentage(3),
    marginTop: HeightPercentage(2),
  },
});

export default TaskScreen;

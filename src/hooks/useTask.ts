import { useCallback, useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Task } from '../components/RenderItemCard';
import { loadTasks } from '../store/slices/taskSlice';

const useTask = () => {
  const dispatch = useAppDispatch();
  const { tasks: listTasks, loading } = useAppSelector(e => e.tasks);
  const [search, setSearch] = useState('');
  const [filterList, setFilterList] = useState<Task[] | null>(null);

  useLayoutEffect(() => {
    dispatch(loadTasks());
  }, []);

  const onChangeText = useCallback((e: string) => {
    setSearch(e);
    if (!e.trim()) return;
    setFilterList(
      listTasks.filter(task =>
        task.title.toLowerCase().includes(e.toLowerCase()),
      ),
    );
  }, []);
  return {
    onChangeText,
    search,
    filterList,
    setSearch,
    setFilterList,
    loading,
    listTasks
  };
};

export default useTask;

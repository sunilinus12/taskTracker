import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addTaskAsync,
  removeTaskAsync,
  updateTaskAsync,
} from '../store/slices/taskSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import { sendLocalNotification } from '../utils';
import Toast from 'react-native-toast-message';
import { Keyboard } from 'react-native';
import { Task } from '../components/RenderItemCard';

const useTaskDetail = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { tasks: listTasks, loading } = useAppSelector(e => e.tasks);

  const route = useRoute();
  const {
    task,
    taskId,
    canUpdate = false,
  } = route?.params as {
    task: Task;
    taskId: number | string;
    canUpdate: boolean;
  };
  const selectedTask = task ? task : listTasks.find(e => e.id == taskId);

  const [title, setTitle] = useState(selectedTask?.title || '');
  const [description, setDescription] = useState(
    selectedTask?.description || '',
  );
  const [status, setStatus] = useState<
    'completed' | 'overdue' | 'pending' | string
  >(selectedTask?.status || 'pending');
  const [priority, setPriority] = useState<
    'high' | 'medium' | 'low' | 'default'
  >(selectedTask?.priority || 'medium');

  const [dueDate, setDueDate] = useState(
    selectedTask?.dueDate ? new Date(selectedTask?.dueDate) : new Date(),
  );
  const [showPicker, setShowPicker] = useState(false);
  const onChangeDatePickerValue = useCallback(
    (event: any, selectedDate?: Date) => {
      // setShowPicker(Platform.OS === 'ios');
      setShowPicker(false);
      if (selectedDate) setDueDate(selectedDate);
    },
    [],
  );

  const handleTask = useCallback(() => {
    try {
      if (!title) return;
      Keyboard.dismiss();
      const obj = {
        id: canUpdate && selectedTask?.id ? selectedTask.id : uuidv4(),
        title,
        description,
        status,
        priority,
        dueDate:
          dueDate instanceof Date ? dueDate.toISOString() : String(dueDate),
        updatedAt: new Date().toISOString(),
      };
      if (canUpdate) {
        dispatch(updateTaskAsync(obj));
        Toast.show({
          text1: 'Task updated successfully ✏️',
          type: 'success',
          position: 'top',
        });
      } else {
        dispatch(addTaskAsync(obj));
        sendLocalNotification(obj);
        Toast.show({
          type: 'success',
          text1: 'Task created successfully ✅',
          position: 'top',
          visibilityTime: 2500,
        });
      }

      navigation.goBack();
    } catch (error) {
      console.error('handleTask error:', error);
    }
  }, [selectedTask, canUpdate, dueDate, title, status, priority]);

  const handleDeleteTask = useCallback(() => {
    try {
      if(selectedTask)
      dispatch(removeTaskAsync(selectedTask?.id.toString()));
    Toast.show({
          type: 'success',
          text1: 'Task deleted successfully ✅',
          position: 'top',
          visibilityTime: 2500,
        });
      navigation.goBack();
    } catch (error) {}
  }, [selectedTask]);
  const handleOpenCalender = useCallback(() => {
    setShowPicker(true);
  }, []);
   const handleCloseCalender = useCallback(() => {
    setShowPicker(false);
  }, []);

  return {
    title,
    setTitle,
    description,
    setDescription,
    setStatus,
    status,
    priority,
    setPriority,
    handleOpenCalender,
    dueDate,
    showPicker,
    onChangeDatePickerValue,
    handleTask,
    handleDeleteTask,
    handleCloseCalender
  };
};

export default useTaskDetail;

import { useCallback, useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import {
  addTaskAsync,
  removeTaskAsync,
  updateTaskAsync,
} from '../store/slices/taskSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import { sendLocalNotification } from '../utils';

const useTaskDetail = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { task: selectedTask = [], canUpdate = false } = route?.params ?? {};

  const [title, setTitle] = useState(selectedTask?.title || '');
  const [description, setDescription] = useState(
    selectedTask?.description || '',
  );
  const [status, setStatus] = useState<
    'completed' | 'overdue' | 'pending' | string
  >(selectedTask?.status || 'pending');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>(
    selectedTask?.priority || 'medium',
  );

  const [dueDate, setDueDate] = useState(
    selectedTask?.dueDate ? new Date(selectedTask?.dueDate) : new Date(),
  );
  const [showPicker, setShowPicker] = useState(false);
  const onChangeDatePickerValue = useCallback(
    (event: any, selectedDate?: Date) => {
      // setShowPicker(Platform.OS === 'ios'); 
      setShowPicker(false)
      if (selectedDate) setDueDate(selectedDate);
    },
    [],
  );

  const handleTask = useCallback(() => {
    try {
      if (!title) return;
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
      } else {
        dispatch(addTaskAsync(obj));
        sendLocalNotification(obj);
      }
      navigation.goBack();
    } catch (error) {
      console.error('handleTask error:', error);
    }
  }, [selectedTask, canUpdate, dueDate, title, status, priority]);

  const handleDeleteTask = useCallback(() => {
    try {
      dispatch(removeTaskAsync(selectedTask?.id.toString()));
      navigation.goBack();
    } catch (error) {}
  }, [selectedTask]);
  const handleOpenCalender = useCallback(() => {
    setShowPicker(true);
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
  };
};

export default useTaskDetail;

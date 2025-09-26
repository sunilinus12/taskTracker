import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addTask, removeTask, updateTask } from '../store/slices/taskSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';

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
  const onChangeDatePickerValue = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios'); // Keep open on iOS
    if (selectedDate) setDueDate(selectedDate);
  };
  const handleTask = () => {
    try {
      const obj = {
        id: canUpdate ? selectedTask?.id : uuidv4(),
        title,
        description,
        status,
        priority,
        dueDate: dueDate.toString(),
        updatedAt: new Date().toISOString(),
      };
      canUpdate ? dispatch(updateTask(obj)) : dispatch(addTask(obj));

      navigation.goBack();
    } catch (error) {}
  };
  const handleDeleteTask = () => {
    try {
      dispatch(removeTask(selectedTask?.id));
      navigation.goBack();
    } catch (error) {}
  };
  const handleOpenCalender = () => {
    setShowPicker(true);
  };

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

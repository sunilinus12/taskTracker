import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import {
  CommonButton,
  CommonHeader2,
  CustomTextInput,
  RenderPriorityCard,
  RenderTaskStatusCard,
} from '../components';
import { priorityOptions, statusOptions } from '../constants';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../store/hooks';
import { addTask, removeTask, updateTask } from '../store/slices/taskSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetails'>;

const TaskDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { task: selectedTask = [], canUpdate = false } = route?.params ?? {};
  const dispatch = useAppDispatch();
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
  const [dueDate, setDueDate] = useState(selectedTask?.dueDate || '');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <CommonHeader2
          isEditing={false}
          onBackPress={() => navigation.goBack()}
          title={canUpdate ? 'Edit Task' : 'Add Task'}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.editForm}
          keyboardShouldPersistTaps="handled"
        >
          <CustomTextInput
            label="Task Title *"
            value={title}
            onChangeText={setTitle}
            placeholder="Enter task title"
          />
          <CustomTextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Enter task description (optional)"
            multiline
          />
          {/* Status Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>📊 Task Status</Text>
            <View style={styles.statusGrid}>
              {statusOptions.map(option => (
                <RenderTaskStatusCard
                  key={option.value}
                  option={option}
                  status={status}
                  setStatus={setStatus}
                />
              ))}
            </View>
          </View>

          {/* Priority Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>⚡ Priority Level</Text>
            <View style={styles.priorityList}>
              {priorityOptions.map(option => (
                <RenderPriorityCard
                  key={option.value}
                  option={option}
                  priority={priority}
                  setPriority={setPriority}
                />
              ))}
            </View>
          </View>

          {/* Due Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>📅 Due Date</Text>
            <TextInput
              value={dueDate}
              onChangeText={setDueDate}
              placeholder="YYYY-MM-DD"
              style={styles.textInput}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <View style={styles.actionButtons}>
              <CommonButton
                title={canUpdate ? 'Update Task' : 'Create Task'}
                onPress={() => {
                  const obj = {
                    id: canUpdate ? selectedTask?.id : uuidv4(),
                    title,
                    description,
                    status,
                    priority,
                    dueDate: dueDate.toString(),
                    updatedAt: new Date().toISOString(),
                  };
                  canUpdate
                    ? dispatch(updateTask(obj))
                    : dispatch(addTask(obj));

                  navigation.goBack();
                }}
                type="save"
                disabled={!title.trim()}
              />

              {canUpdate && (
                <CommonButton
                  title="🗑️ Delete Task"
                  onPress={() => {
                    dispatch(removeTask(selectedTask?.id));
                    navigation.goBack();
                  }}
                  type="delete"
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  inputGroup: {
    marginBottom: 24,
  },
  editForm: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBlock: 24,
  },

  statusGrid: {
    flexDirection: 'row',
    gap: 12,
  },

  priorityList: {
    gap: 12,
  },

  actionButtons: {
    marginTop: 32,
    marginBottom: 40,
    gap: 16,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },

  textInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
});

export default TaskDetailsScreen;

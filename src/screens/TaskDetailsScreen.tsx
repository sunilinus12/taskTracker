import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Pressable,
  Modal,
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
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTaskDetail } from '../hooks';
import { FontScale, HeightPercentage, WidthPercentage } from '../utils';
import { Colors } from '../Colors/Colors';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetails'>;

const TaskDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { canUpdate = false } = route?.params ?? {};
  const {
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
    handleCloseCalender,
  } = useTaskDetail();

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
            <Pressable
              onPress={handleOpenCalender}
              style={{  flex: 1 }}
            >
              <TextInput
                value={dueDate ? dueDate.toLocaleDateString() : 'Select Date'}
                editable={false}
                placeholder="YYYY-MM-DD"
                style={styles.textInput}
                placeholderTextColor="#9CA3AF"
                pointerEvents="none"
              />
            </Pressable>
          </View>

          {showPicker && (
            <Modal
              visible={showPicker}
              transparent
              animationType="slide"
              onRequestClose={handleCloseCalender}
            >
              <View style={styles.modalBackground}>
                <View style={styles.pickerWrapper}>
                  <DateTimePicker
                    minimumDate={new Date()}
                    value={dueDate || new Date()}
                    mode="date"
                    display="spinner"
                    onChange={onChangeDatePickerValue}
                    style={{ width: '100%' }}
                  />
                  <CommonButton
                    style={{ marginHorizontal: WidthPercentage(10) }}
                    title="Done"
                    onPress={handleCloseCalender}
                  />
                </View>
              </View>
            </Modal>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <CommonButton
              title={canUpdate ? 'Update Task' : 'Create Task'}
              onPress={handleTask}
              type="save"
              disabled={!title.trim()}
            />

            {canUpdate && (
              <CommonButton
                title="🗑️ Delete Task"
                onPress={handleDeleteTask}
                type="delete"
              />
            )}
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.screenBackgroundColor },
  inputGroup: {
    marginBottom: HeightPercentage(4),
  },
  editForm: {
    flex: 1,
    paddingHorizontal: WidthPercentage(4),
    paddingTop: HeightPercentage(2),
    paddingBlock: HeightPercentage(2.4),
  },

  statusGrid: {
    flexDirection: 'row',
    gap: 12,
  },

  priorityList: {
    gap: 12,
  },

  actionButtons: {
    marginTop: HeightPercentage(3.2),
    marginBottom: 40,
    gap: 16,
  },

  inputLabel: {
    fontSize: FontScale(14),
    fontWeight: '600',
    color: Colors.inputLabel,
    marginBottom: 8,
  },

  textInput: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderVarient1,
    borderRadius: 12,
    paddingHorizontal: WidthPercentage(2),
    paddingVertical: HeightPercentage(1.2),
    fontSize: FontScale(12),
    color: Colors.blackVarient,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    paddingBottom: 20,
    borderRadius: 20,
  },
  doneButton: {
    backgroundColor: '#007AFF',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 20,
  },
});

export default TaskDetailsScreen;

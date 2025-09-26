import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { FontScale, timeConversion } from '../utils';
import { Colors } from '../Colors/Colors';

export type Task = {
  id: string | number;
  title: string;
  description?: string;
  status: 'completed' | 'overdue' | 'pending' | string;
  priority: 'high' | 'medium' | 'low' | 'default';
  updatedAt: string;
  dueDate?: string;
};

type RenderItemCardProps = {
  task: Task;
  onPress?: (task: Task) => void;
};

const RenderItemCard: React.FC<RenderItemCardProps> = ({ task, onPress }) => {
  const getPriorityColor = (priority: Task['priority']): ViewStyle => {
    switch (priority) {
      case 'high':
        return styles.highPriority;
      case 'medium':
        return styles.mediumPriority;
      case 'low':
        return styles.lowPriority;
      default:
        return styles.defaultPriority;
    }
  };

  const getStatusColor = (status: Task['status']): ViewStyle => {
    switch (status) {
      case 'completed':
        return styles.completedStatus;
      case 'overdue':
        return styles.overdueStatus;
      default:
        return styles.pendingStatus;
    }
  };

  return (
    <TouchableOpacity
      key={task.id}
      onPress={() => onPress?.(task)}
      style={styles.taskCard}
    >
      <View style={styles.taskCardContent}>
        <View style={styles.taskInfo}>
          <View style={styles.taskTitleRow}>
            <Text style={styles.statusIcon}>
              {task.status === 'completed'
                ? '✓'
                : task.status === 'overdue'
                ? '⚠'
                : '○'}
            </Text>
            <Text
              style={[
                styles.taskTitle,
                task.status === 'completed' && styles.completedTaskTitle,
              ]}
              numberOfLines={1}
            >
              {task.title}
            </Text>
          </View>

          {task.description ? (
            <Text style={styles.taskDescription} numberOfLines={2}>
              {task.description}
            </Text>
          ) : null}

          <View style={styles.taskFooter}>
            <View style={styles.taskTimeRow}>
              <Text style={styles.timeIcon}>🕐</Text>
              <Text style={styles.taskTime}>
                {timeConversion(task.dueDate)}
              </Text>
            </View>

            <View style={styles.taskBadges}>
              <View style={[styles.badge, getPriorityColor(task.priority)]}>
                <Text style={styles.badgeText}>{task.priority}</Text>
              </View>
              <View style={[styles.badge, getStatusColor(task.status)]}>
                <Text style={styles.badgeText}>{task.status}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.editIcon}>
          <Text style={styles.editIconText}>✏️</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RenderItemCard;

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.borderVarient,
  },
  taskCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  taskInfo: {
    flex: 1,
    marginRight: 12,
  },
  taskTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIcon: {
    fontSize: FontScale(16),
    marginRight: 8,
  },
  taskTitle: {
    fontSize: FontScale(14),
    fontWeight: '600',
    color: Colors.blackVarient,
    flex: 1,
    textTransform: 'capitalize',
  },
  completedTaskTitle: {
    color: Colors.grayVarient,
    textDecorationLine: 'line-through',
  },
  taskDescription: {
    fontSize: FontScale(12),
    color: Colors.grayVarient,
    marginBottom: 12,
    lineHeight: 20,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  taskTime: {
    fontSize: FontScale(10),
    color: Colors.grayVarient1,
  },
  taskBadges: {
    flexDirection: 'row',
    gap: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: FontScale(8),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  highPriority: {
    backgroundColor: Colors.highPriority,
  },
  mediumPriority: {
    backgroundColor: Colors.mediumPriority,
  },
  lowPriority: {
    backgroundColor: Colors.lowPriority,
  },
  defaultPriority: {
    backgroundColor: Colors.defaultPriority,
  },
  completedStatus: {
    backgroundColor: Colors.lowPriority,
  },
  overdueStatus: {
    backgroundColor: Colors.highPriority,
  },
  pendingStatus: {
    backgroundColor: Colors.pendingStatus,
  },
  editIcon: {
    backgroundColor: Colors.editIcon,
    padding: 8,
    borderRadius: 8,
  },
  editIconText: {
    fontSize: FontScale(10),
  },
});

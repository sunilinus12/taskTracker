import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';

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
  console.log('item', task.updatedAt);

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
              <Text style={styles.taskTime}>{task.updatedAt}</Text>
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
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
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
    fontSize: 16,
    marginRight: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  completedTaskTitle: {
    color: '#6B7280',
    textDecorationLine: 'line-through',
  },
  taskDescription: {
    fontSize: 14,
    color: '#6B7280',
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
    fontSize: 12,
    color: '#9CA3AF',
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
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  highPriority: {
    backgroundColor: '#FEE2E2',
  },
  mediumPriority: {
    backgroundColor: '#FEF3C7',
  },
  lowPriority: {
    backgroundColor: '#D1FAE5',
  },
  defaultPriority: {
    backgroundColor: '#F3F4F6',
  },
  completedStatus: {
    backgroundColor: '#D1FAE5',
  },
  overdueStatus: {
    backgroundColor: '#FEE2E2',
  },
  pendingStatus: {
    backgroundColor: '#DBEAFE',
  },
  editIcon: {
    backgroundColor: '#EBF8FF',
    padding: 8,
    borderRadius: 8,
  },
  editIconText: {
    fontSize: 16,
  },
});

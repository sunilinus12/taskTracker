import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';

export type PriorityOption = {
  label: string;
  value: 'high' | 'medium' | 'low' | string;
  description?: string;
};

type RenderPriorityCardProps = {
  option: PriorityOption;
  priority: string;
  setPriority: (value: string | 'high' | 'medium' | 'low') => void;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  descriptionStyle?: TextStyle;
};

const RenderPriorityCard: React.FC<RenderPriorityCardProps> = ({
  option,
  priority,
  setPriority,
  containerStyle,
  labelStyle,
  descriptionStyle,
}) => {
  const getPriorityColor = (priority: string) => {
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

  const getDotColor = (value: string) => {
    switch (value) {
      case 'high':
        return styles.highDot;
      case 'medium':
        return styles.mediumDot;
      case 'low':
        return styles.lowDot;
      default:
        return styles.defaultDot;
    }
  };

  const isActive = priority === option.value;

  return (
    <TouchableOpacity
      onPress={() => setPriority(option.value)}
      style={[
        styles.priorityCard,
        isActive && styles.priorityCardActive,
        containerStyle,
      ]}
    >
      <View style={styles.priorityCardContent}>
        <View style={styles.priorityHeader}>
          <View style={styles.priorityIndicator}>
            <View style={[styles.priorityDot, getDotColor(option.value)]} />
            <Text style={[styles.priorityLabel, labelStyle]}>
              {option.label}
            </Text>
          </View>

          <View style={[styles.badge, getPriorityColor(option.value)]}>
            <Text style={styles.badgeText}>{option.value.toUpperCase()}</Text>
          </View>
        </View>

        {option.description ? (
          <Text style={[styles.priorityDescription, descriptionStyle]}>
            {option.description}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default RenderPriorityCard;

const styles = StyleSheet.create({
  priorityCard: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
  },
  priorityCardActive: {
    borderColor: '#3B82F6',
    backgroundColor: '#EBF8FF',
  },
  priorityCardContent: {
    gap: 8,
  },
  priorityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priorityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  highDot: {
    backgroundColor: '#EF4444',
  },
  mediumDot: {
    backgroundColor: '#F59E0B',
  },
  lowDot: {
    backgroundColor: '#10B981',
  },
  defaultDot: {
    backgroundColor: '#D1D5DB',
  },
  priorityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  priorityDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 24,
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
});

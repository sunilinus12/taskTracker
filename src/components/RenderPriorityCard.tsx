import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { FontScale, WidthPercentage } from '../utils';
import { Colors } from '../Colors/Colors';

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
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.borderVarient1,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
  },
  priorityCardActive: {
    borderColor: Colors.blueVarient,
    backgroundColor: Colors.editIcon,
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
    width: WidthPercentage(2.5),
    height: WidthPercentage(2.5),
    borderRadius: 6,
    marginRight: WidthPercentage(3),
  },
  highDot: {
    backgroundColor: Colors.highDot,
  },
  mediumDot: {
    backgroundColor: Colors.mediumDot,
  },
  lowDot: {
    backgroundColor: Colors.lowDot,
  },
  defaultDot: {
    backgroundColor: Colors.borderVarient1,
  },
  priorityLabel: {
    fontSize: FontScale(13),
    fontWeight: '600',
    color: Colors.blackVarient,
  },
  priorityDescription: {
    fontSize: FontScale(10),
    color: Colors.grayVarient,
    marginLeft: WidthPercentage(5),
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
});

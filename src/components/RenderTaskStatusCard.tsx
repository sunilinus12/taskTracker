import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { FontScale, HeightPercentage } from '../utils';
import { Colors } from '../Colors/Colors';

type StatusOption = {
  label: string;
  value: 'completed' | 'overdue' | 'pending';
  icon?: string;
};

type RenderTaskStatusCardProps = {
  option: StatusOption;
  status: string;
  setStatus: (value: 'completed' | 'overdue' | 'pending') => {};
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  iconStyle?: TextStyle;
};

const RenderTaskStatusCard: React.FC<RenderTaskStatusCardProps> = ({
  option,
  status,
  setStatus,
  containerStyle,
  labelStyle,
  iconStyle,
}) => {
  const isActive = status === option.value;

  return (
    <TouchableOpacity
      onPress={() => setStatus(option.value)}
      style={[
        styles.statusCard,
        isActive && styles.statusCardActive,
        containerStyle,
      ]}
    >
      {option.icon && (
        <Text style={[styles.statusIcon, iconStyle]}>{option.icon}</Text>
      )}
      <Text
        style={[
          styles.statusLabel,
          isActive && styles.statusLabelActive,
          labelStyle,
        ]}
      >
        {option.label}
      </Text>
    </TouchableOpacity>
  );
};

export default RenderTaskStatusCard;

const styles = StyleSheet.create({
  statusCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.borderVarient1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statusCardActive: {
    borderColor: Colors.blueVarient,
    backgroundColor: Colors.editIcon,
  },
  statusIcon: {
    fontSize: FontScale(14),
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: FontScale(11),
    fontWeight: '500',
    color: Colors.grayVarient1,
    marginTop: HeightPercentage(0.8),
  },
  statusLabelActive: {
    color: Colors.blueVarient,
  },
});

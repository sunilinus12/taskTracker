import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';

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
      {option.icon && <Text style={[styles.statusIcon, iconStyle]}>{option.icon}</Text>}
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
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statusCardActive: {
    borderColor: '#3B82F6',
    backgroundColor: '#EBF8FF',
  },
  statusIcon: {
    fontSize: 16,
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 8,
  },
  statusLabelActive: {
    color: '#3B82F6',
  },
});

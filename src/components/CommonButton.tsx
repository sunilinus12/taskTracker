import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';

type CommonButtonProps = {
  title: string;
  onPress: () => void;
  type?: 'save' | 'delete';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const CommonButton: React.FC<CommonButtonProps> = ({
  title,
  onPress,
  type = 'save',
  disabled = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    if (type === 'save') {
      return [styles.saveButton, disabled && styles.saveButtonDisabled];
    }
    if (type === 'delete') {
      return styles.deleteButton;
    }
    return {};
  };

  const getTextStyle = () => {
    if (type === 'save') return styles.saveButtonText;
    if (type === 'delete') return styles.deleteButtonText;
    return {};
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  saveButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  deleteButton: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
});

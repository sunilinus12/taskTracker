import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { FontScale, HeightPercentage, WidthPercentage } from '../utils';
import { Colors } from '../Colors/Colors';

type CommonButtonProps = {
  title: string;
  onPress: () => void;
  type?: 'save' | 'delete';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  enableDisableScheme?: boolean;
};

const CommonButton: React.FC<CommonButtonProps> = ({
  title,
  onPress,
  type = 'save',
  disabled = false,
  style,
  textStyle,
  enableDisableScheme = false,
}) => {
  const getButtonStyle = () => {
    if (type === 'save') {
      return [
        styles.saveButton,
        (disabled || enableDisableScheme) && styles.saveButtonDisabled,
      ];
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
    backgroundColor: Colors.blueVarient,
    borderRadius: 12,
    paddingVertical: HeightPercentage(1.6),
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  saveButtonDisabled: {
    backgroundColor: Colors.borderVarient1,
  },
  saveButtonText: {
    fontSize: FontScale(14),
    fontWeight: '600',
    color: Colors.white,
  },
  deleteButton: {
    backgroundColor: Colors.deleteBackgroundColor,
    borderWidth: 1,
    borderColor: Colors.deleteBorderColor,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: FontScale(14),
    fontWeight: '600',
    color: Colors.highDot,
  },
});

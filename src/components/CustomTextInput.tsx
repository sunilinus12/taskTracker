import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { FontScale, HeightPercentage, WidthPercentage } from '../utils';
import { Colors } from '../Colors/Colors';

type CustomTextInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  style,
  inputStyle,
}) => {
  return (
    <View style={[styles.inputGroup, style]}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[styles.textInput, multiline && styles.textArea, inputStyle]}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        placeholderTextColor={Colors.grayVarient}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: HeightPercentage(2.4),
  },
  inputLabel: {
    fontSize: FontScale(13),
    fontWeight: '600',
    color: Colors.inputLabel,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderVarient1,
    borderRadius: 10,
    paddingHorizontal: WidthPercentage(2),
    paddingVertical: HeightPercentage(1.2),
    fontSize: FontScale(13),
    color: Colors.blackVarient,
    height: 'auto',
    minHeight: HeightPercentage(5),
  },
  textArea: {
    height: HeightPercentage(12),
    textAlignVertical: 'top',
  },
});

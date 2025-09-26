import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextStyle,
  ViewStyle,
} from 'react-native';

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
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
});

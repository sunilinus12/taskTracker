import React, { memo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  Dimensions,
} from 'react-native';

type FloatingIconProps = {
  onPress: (event: GestureResponderEvent) => void;
  icon?: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  position?: {
    bottomPercent?: number;
    rightPercent?: number;
    leftPercent?: number;
    topPercent?: number;
  };
};

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const FloatingIcon: React.FC<FloatingIconProps> = ({
  onPress,
  icon = '+',
  containerStyle,
  textStyle,
  position = { bottomPercent: 5, rightPercent: 5 },
}) => {
  const dynamicPosition: ViewStyle = {};

  if (position.bottomPercent !== undefined) {
    dynamicPosition.bottom = (SCREEN_HEIGHT * position.bottomPercent) / 100;
  }
  if (position.topPercent !== undefined) {
    dynamicPosition.top = (SCREEN_HEIGHT * position.topPercent) / 100;
  }
  if (position.rightPercent !== undefined) {
    dynamicPosition.right = (SCREEN_WIDTH * position.rightPercent) / 100;
  }
  if (position.leftPercent !== undefined) {
    dynamicPosition.left = (SCREEN_WIDTH * position.leftPercent) / 100;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.floatingButton, dynamicPosition, containerStyle]}
      accessibilityRole="button"
      activeOpacity={0.8}
    >
      <Text style={[styles.floatingButtonText, textStyle]}>{icon}</Text>
    </TouchableOpacity>
  );
};

export default memo(FloatingIcon);

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    backgroundColor: '#3B82F6',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  floatingButtonText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '600',
  },
});

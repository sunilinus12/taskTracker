import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle, TextStyle } from 'react-native';

type CommonHeaderProps = {
  title?: string;
  subtitle?: string;
  onPressNotification?: () => void;
  notificationIcon?: string; // You could also replace with ReactNode if using SVG/Icon components
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
};

const CommonHeader: React.FC<CommonHeaderProps> = ({
  title = 'Tasks',
  subtitle = '5 of 4 tasks',
  onPressNotification,
  notificationIcon = '🔔',
  containerStyle,
  titleStyle,
  subtitleStyle,
}) => {
  return (
    <View style={[styles.header, containerStyle]}>
      <View style={styles.headerTop}>
        <View>
          <Text style={[styles.headerTitle, titleStyle]}>{title}</Text>
          <Text style={[styles.headerSubtitle, subtitleStyle]}>{subtitle}</Text>
        </View>
        <TouchableOpacity
          onPress={onPressNotification}
          style={styles.notificationButton}
        >
          <Text style={styles.notificationIcon}>{notificationIcon}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  notificationButton: {
    backgroundColor: '#3B82F6',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  notificationIcon: {
    fontSize: 18,
    color: '#ffffff',
  },
});

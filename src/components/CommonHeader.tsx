import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '../Colors/Colors';
import { FontScale, HeightPercentage, WidthPercentage } from '../utils';
import CustomTextInput from './CustomTextInput';
import CommonButton from './CommonButton';

type CommonHeaderProps = {
  title?: string;
  subtitle?: string;
  onPressNotification?: () => void;
  notificationIcon?: string; // You could also replace with ReactNode if using SVG/Icon components
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  showSearchField?: boolean;
  onSearchTextChange?: (e: string) => void;
  searchValue?: string;
  searchPlaceholder?: string;
  filterBtnDisable?: boolean;
};

const CommonHeader: React.FC<CommonHeaderProps> = ({
  title = 'Tasks',
  subtitle = '5 of 4 tasks',
  onPressNotification,
  notificationIcon = '🔔',
  containerStyle,
  titleStyle,
  subtitleStyle,
  showSearchField = false,
  searchValue,
  onSearchTextChange,
  searchPlaceholder,
  filterBtnDisable = false,
}) => {
  return (
    <>
      <View style={[styles.header, containerStyle]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.headerTitle, titleStyle]}>{title}</Text>
            {subtitle && (
              <Text style={[styles.headerSubtitle, subtitleStyle]}>
                {subtitle}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={onPressNotification}
            style={styles.notificationButton}
          >
            <Text style={styles.notificationIcon}>{notificationIcon}</Text>
          </TouchableOpacity>
        </View>
        {showSearchField && onSearchTextChange && (
          <CustomTextInput
            value={searchValue ?? ''}
            placeholder={searchPlaceholder}
            onChangeText={onSearchTextChange}
            style={styles.searchContainer}
          />
        )}
        {filterBtnDisable && (
          <CommonButton
            title=" Filters"
            onPress={() => {}}
            enableDisableScheme={false}
            style={styles.selectedFilter}
            textStyle={{ ...styles.selectedTextStyle }}
          />
        )}
      </View>
    </>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingTop: HeightPercentage(2),
    paddingBottom: HeightPercentage(2),
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.blackVarient,
  },
  headerSubtitle: {
    fontSize: FontScale(14),
    color: Colors.grayVarient,
    marginTop: 4,
  },
  notificationButton: {
    backgroundColor: Colors.blueVarient,
    width: WidthPercentage(13),
    height: WidthPercentage(13),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  notificationIcon: {
    fontSize: FontScale(18),
    color: Colors.white,
  },
  searchContainer: {
    marginTop: HeightPercentage(2),
  },
  selectedFilter: {
    width: WidthPercentage(20),
    paddingVertical: HeightPercentage(1),
    borderRadius: 5,
  },
  selectedTextStyle: {
    // color: Colors.blackVarient,
    fontSize: FontScale(10),
    backgroundColor: 'transparent',
    letterSpacing: 0.1,
  },
});

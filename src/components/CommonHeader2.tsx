import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppImages } from '../resources';
import { FontScale, HeightPercentage, WidthPercentage } from '../utils';
import { Colors } from '../Colors/Colors';

type CommonHeader2Props = {
  isEditing?: boolean;
  onBackPress: () => void;
  title?: string;
};

const CommonHeader2: React.FC<CommonHeader2Props> = ({
  isEditing = false,
  onBackPress,
  title,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.editHeader}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Image style={styles.backImage} source={AppImages.backIcon} />
        </TouchableOpacity>

        <Text style={styles.editHeaderTitle}>
          {title || (isEditing ? 'Edit Task' : 'Add Task')}
        </Text>

        <View style={styles.headerSpacer} />
      </View>
    </View>
  );
};

export default CommonHeader2;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  editHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: Colors.inputLabel,
  },
  editHeaderTitle: {
    fontSize: FontScale(18),
    fontWeight: 'bold',
    color: Colors.blackVarient,
  },
  headerSpacer: {
    width: 32,
  },
  backImage: {
    width: WidthPercentage(8),
    height: HeightPercentage(5),
    resizeMode: 'contain',
  },
});

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
          <Text style={styles.backButtonText}>←</Text>
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
    color: '#374151',
  },
  editHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSpacer: {
    width: 32,
  },
});

import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';
import { Colors } from '../Colors/Colors';

export default function LoadingComponent({
  title = 'Loading...',
}: {
  title?: string;
}) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.blueVarient} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.blackVarient,
  },
});

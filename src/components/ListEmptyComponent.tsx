import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ListEmptyComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No Tasks Yet</Text>
      <Text style={styles.subtitle}>
        Looks like you haven’t added any tasks. Tap the "+" button to create your first task and get organized!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#1f1e1ee9",
  },
});

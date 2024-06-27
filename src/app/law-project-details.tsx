import { Platform, StyleSheet, useColorScheme } from "react-native";

import { SafeAreaView, Text, View, getColors } from "@/components/Themed";
import { StatusBar } from "expo-status-bar";

export default function LawProjectDetails() {
  const theme = useColorScheme();
  const colors = getColors(theme || "light");
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.primaryColor}
        style={Platform.OS === "ios" ? "light" : "auto"}
      />
      <Text style={styles.title}>Projeto de lei</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

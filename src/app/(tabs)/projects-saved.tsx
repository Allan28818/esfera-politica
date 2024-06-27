import { Platform, StyleSheet, useColorScheme } from "react-native";

import { StatusBar } from "expo-status-bar";

import { SafeAreaView, Text, View, getColors } from "@/components/Themed";
import { DefaultHeader } from "@/components/Headers/DefaultHeader";

export default function ProjectsSaved() {
  const theme = useColorScheme();
  const colors = getColors(theme || "light");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.primaryColor}
        style={Platform.OS === "ios" ? "light" : "auto"}
      />
      <DefaultHeader />
      <Text style={styles.title}>Projetos de Lei Favoritos</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

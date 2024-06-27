import { Platform, StyleSheet, useColorScheme } from "react-native";

import { SafeAreaView, Text, getColors } from "@/components/Themed";
import { StatusBar } from "expo-status-bar";

export default function PoliticianDetails() {
  const theme = useColorScheme();
  const colors = getColors(theme || "light");
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.primaryColor}
        style={Platform.OS === "ios" ? "light" : "auto"}
      />
      <Text style={styles.title}>Detalhes do Político</Text>
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

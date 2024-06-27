import { Platform, StyleSheet, useColorScheme } from "react-native";

import { SafeAreaView, Text, getColors } from "@/components/Themed";
import { StatusBar } from "expo-status-bar";

import { styles } from "@/styles/politician-details";

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

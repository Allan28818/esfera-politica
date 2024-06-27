import { Link, Stack } from "expo-router";
import { Platform, StyleSheet, useColorScheme } from "react-native";

import { SafeAreaView, Text, View, getColors } from "@/components/Themed";
import { StatusBar } from "expo-status-bar";

export default function NotFoundScreen() {
  const theme = useColorScheme();
  const colors = getColors(theme || "light");
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={colors.primaryColor}
          style={Platform.OS === "ios" ? "light" : "auto"}
        />
        <Text style={styles.title}>This screen doesn't exist.</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});

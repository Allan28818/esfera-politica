import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { SafeAreaView, Text, View, getColors } from "@/components/Themed";
import { DefaultHeader } from "@/components/Headers/DefaultHeader";
import { useRouter } from "expo-router";

export default function TabTwoScreen() {
  const theme = useColorScheme();
  const colors = getColors(theme || "light");

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.primaryColor}
        style={Platform.OS === "ios" ? "light" : "auto"}
      />
      <DefaultHeader />
      <Text style={styles.title}>Pesquisa</Text>
      <TouchableOpacity
        onPress={() => {
          router.navigate("politician-details");
        }}>
        <Text>Clica em mim</Text>
      </TouchableOpacity>
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

import { ActivityIndicator, Image, View, useColorScheme } from "react-native";

import { styles } from "./styles";
import { SafeAreaView, getColors } from "@/components/Themed";

const DefaultLoader = () => {
  const theme = useColorScheme();
  const colors = getColors(theme || "light");

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator color={colors.primaryColor} size={"large"} />
    </SafeAreaView>
  );
};

export { DefaultLoader };

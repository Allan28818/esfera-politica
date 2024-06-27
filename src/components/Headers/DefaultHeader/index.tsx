import { getColors } from "@/components/Themed";
import { Image, View, useColorScheme } from "react-native";

import { styles } from "./styles";

const DefaultHeader = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require("@/assets/images/icon.png")}
        alt="Esfera Política - Logo"
        style={styles.logo}
      />
    </View>
  );
};

export { DefaultHeader };

import { Image, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

interface HeaderWithGoBackProps {
  onPress: () => void;
}

const HeaderWithGoBack = (props: HeaderWithGoBackProps) => {
  const { onPress } = props;

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPress} style={styles.goBackButton}>
        <MaterialIcons name="arrow-back-ios" style={styles.arrowIcon} />
      </TouchableOpacity>
      <Image
        source={require("@/assets/images/icon.png")}
        alt="Esfera Política - Logo"
        style={styles.logo}
      />
    </View>
  );
};

export { HeaderWithGoBack };

import { Text, View, getColors } from "@/components/Themed";
import {
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
} from "react-native";

import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

interface DashedCardProps extends TouchableOpacityProps {
  text: string;
}

const DashedCard = (props: DashedCardProps) => {
  const { text } = props;

  const theme = useColorScheme();
  const colors = getColors(theme || "light");

  return (
    <View style={styles.cardWrapper}>
      <Text style={styles.cardText}>{text}</Text>
    </View>
  );
};

export { DashedCard };

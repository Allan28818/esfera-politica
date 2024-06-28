import { Text, View, getColors } from "@/components/Themed";
import {
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
} from "react-native";

import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

interface PoliticianCardProps extends TouchableOpacityProps {
  politicianPhotoURL: string;
  politicianName: string;
  acronym: string;
  politicianEmail: string;
}

const PoliticianCard = (props: PoliticianCardProps) => {
  const { politicianPhotoURL, politicianName, acronym, politicianEmail } =
    props;

  const theme = useColorScheme();
  const colors = getColors(theme || "light");

  return (
    <TouchableOpacity
      {...props}
      style={[styles.cardWrapper, props.style]}
      activeOpacity={0.7}>
      <View>
        <Image
          source={{ uri: politicianPhotoURL }}
          alt={politicianName}
          style={styles.politicianImage}
        />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.politicianName}>{politicianName}</Text>
        <View style={styles.subInfo}>
          <View style={styles.subInfoWrapper}>
            <FontAwesome
              name="building-o"
              style={[styles.buildingIcon, { color: colors.text }]}
            />
            <Text style={[styles.acronymInfo, styles.subInfoText]}>
              {acronym}
            </Text>
          </View>
          <View style={styles.subInfoWrapper}>
            <Ionicons
              name="mail"
              style={[styles.mailIcon, { color: colors.text }]}
            />
            <Text
              style={[styles.mailInfo, styles.subInfoText]}
              numberOfLines={1}>
              {politicianEmail}asdfasdfkasdlfkjasldkf
            </Text>
          </View>
        </View>
      </View>

      <MaterialIcons name="keyboard-arrow-right" style={styles.arrowIcon} />
    </TouchableOpacity>
  );
};

export { PoliticianCard };

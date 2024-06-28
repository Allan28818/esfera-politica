import { Text, View, getColors } from "@/components/Themed";
import {
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
} from "react-native";

import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";

interface SuggestedPoliticianCardProps extends TouchableOpacityProps {
  politicianPhotoURL: string;
  politicianName: string;
  partyAcronym: string;
  cityAcronym: string;
  politicianEmail: string;
}

const SuggestedPoliticianCard = (props: SuggestedPoliticianCardProps) => {
  const {
    politicianPhotoURL,
    politicianName,
    partyAcronym,
    cityAcronym,
    politicianEmail,
  } = props;

  const theme = useColorScheme();
  const colors = getColors(theme || "light");

  return (
    <TouchableOpacity
      {...props}
      style={[styles.cardWrapper, props.style]}
      activeOpacity={0.7}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: politicianPhotoURL }}
          alt={politicianName}
          style={styles.politicianImage}
        />
        <LinearGradient
          colors={["transparent", colors.black]}
          style={styles.gradient}>
          <Text style={styles.politicianName} numberOfLines={1}>
            {politicianName}
          </Text>
        </LinearGradient>
      </View>
      <View style={styles.infoWrapper}>
        <View style={styles.politicianInfoWrapper}>
          <FontAwesome
            name="building-o"
            style={[styles.buildingIcon, { color: colors.text }]}
          />
          <Text style={styles.politicianInfoText} numberOfLines={1}>
            {partyAcronym}
          </Text>
        </View>
        <View style={styles.politicianInfoWrapper}>
          <Ionicons
            name="mail"
            style={[styles.mailIcon, { color: colors.text }]}
          />
          <Text style={styles.politicianInfoText} numberOfLines={1}>
            {politicianEmail}
          </Text>
        </View>
        <View style={styles.politicianInfoWrapper}>
          <FontAwesome5
            name="map-marker-alt"
            style={[styles.locationIcon, { color: colors.text }]}
          />
          <Text style={styles.politicianInfoText} numberOfLines={1}>
            {cityAcronym}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { SuggestedPoliticianCard };

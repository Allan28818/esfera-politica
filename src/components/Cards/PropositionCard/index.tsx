import { SafeAreaView, Text, View, getColors } from "@/components/Themed";
import {
  Image,
  Pressable,
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
  StyleSheet,
} from "react-native";

import { styles } from "./styles";
import { FontAwesome, Fontisto, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface PropositionCardProps extends TouchableOpacityProps {
  acronym: string;
  documentNumber: string | number;
  documentYear: string | number;
  summary: string;
  onPressFavorite: () => void;
  secondaryIndicator?: string;
  isFavorite: boolean;
}

const PropositionCard = (props: PropositionCardProps) => {
  const {
    acronym,
    documentNumber,
    documentYear,
    summary,
    onPressFavorite,
    isFavorite,
    secondaryIndicator,
  } = props;

  const theme = useColorScheme();
  const colors = getColors(theme || "light");

  return (
    <TouchableOpacity
      {...props}
      style={[styles.cardWrapper, props.style]}
      activeOpacity={0.7}>
      <View>
        <View style={styles.topInfoWrapper}>
          <FontAwesome
            name="building"
            style={[styles.buildingIcon, { color: colors.textSecondary }]}
          />
          <Text
            style={styles.documentSpecifications}
            lightColor={Colors.light.textSecondary}
            darkColor={Colors.dark.textSecondary}>
            {acronym} {documentNumber}/{documentYear}
          </Text>
        </View>
        <Text style={styles.summary} numberOfLines={3}>
          {summary}
        </Text>
        <View
          style={[
            styles.complementaryInfoWrapper,
            !!secondaryIndicator
              ? { justifyContent: "space-around" }
              : { justifyContent: "flex-start" },
          ]}>
          <View style={styles.complementaryInfoCard}>
            <Text style={styles.complementaryText}>
              criação{" "}
              <Text style={styles.complementaryTextBigger}>{documentYear}</Text>
            </Text>
          </View>
          {!!secondaryIndicator && (
            <View style={styles.complementaryInfoCard}>
              <Text style={styles.complementaryText}>
                {secondaryIndicator}
                <MaterialIcons
                  name="keyboard-arrow-right"
                  style={styles.complementaryInfoIcon}
                />
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.actionsWrapper}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.favoriteButton}
          hitSlop={{ top: 10, right: 10, bottom: 15, left: 10 }}
          onPress={onPressFavorite}>
          <Fontisto name="favorite" style={styles.favoriteIconOutline} />
          {!isFavorite && (
            <Fontisto
              name="favorite"
              size={18}
              color={colors.background}
              style={[styles.innerFavoriteIcon, StyleSheet.absoluteFill]}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.arrowButton}>
          <MaterialIcons name="keyboard-arrow-right" style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export { PropositionCard };

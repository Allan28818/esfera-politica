import { SafeAreaView, Text, View, getColors } from "@/components/Themed";
import {
  Image,
  Pressable,
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
} from "react-native";

import { styles } from "./styles";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface PropositionCardProps extends TouchableOpacityProps {
  acronym: string;
  documentNumber: string | number;
  documentYear: string | number;
  summary: string;
}

const PropositionCard = (props: PropositionCardProps) => {
  const { acronym, documentNumber, documentYear, summary } = props;

  const theme = useColorScheme();
  const colors = getColors(theme || "light");

  return (
    <TouchableOpacity {...props} style={styles.cardWrapper} activeOpacity={0.7}>
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
        <View style={styles.creationCard}>
          <Text style={styles.creationText}>
            criação{" "}
            <Text style={styles.creationTextBigger}>{documentYear}</Text>
          </Text>
        </View>
      </View>
      <Pressable style={styles.button}>
        <MaterialIcons name="keyboard-arrow-right" style={styles.arrowIcon} />
      </Pressable>
    </TouchableOpacity>
  );
};

export { PropositionCard };

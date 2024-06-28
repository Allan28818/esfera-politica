import { Text, View } from "@/components/Themed";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

interface PoliticalPartyCardProps extends TouchableOpacityProps {
  acronym: string;
  partyName: string;
}

const PoliticalPartyCard = (props: PoliticalPartyCardProps) => {
  const { acronym, partyName } = props;

  return (
    <TouchableOpacity
      {...props}
      style={[styles.cardWrapper, props.style]}
      activeOpacity={0.7}>
      <View style={styles.textContentWrapper}>
        <Text style={styles.acronym}>{acronym}</Text>
        <View style={styles.circle} />
        <Text style={styles.partyName} numberOfLines={1}>
          {partyName}
        </Text>
      </View>

      <MaterialIcons name="keyboard-arrow-right" style={styles.arrowIcon} />
    </TouchableOpacity>
  );
};

export { PoliticalPartyCard };

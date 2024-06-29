import {
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

import { styles } from "./styles";
import { AntDesign, Feather } from "@expo/vector-icons";
import { getColors } from "@/components/Themed";

interface KeywordsInputProps {
  onChangeText: (value: string) => void;
  handleAddKeyword: (keyword: string) => void;
  placeholder: string;
  value: string;
}

const KeywordsInput = (props: KeywordsInputProps) => {
  const { onChangeText, value, placeholder, handleAddKeyword } = props;

  const theme = useColorScheme();
  const colors = getColors(theme || "light");

  return (
    <View style={[styles.inputWrapper, { backgroundColor: colors.foreground }]}>
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, { color: colors.text }]}
      />
      <TouchableOpacity
        style={[
          styles.addKeywordButton,
          {
            backgroundColor:
              value.length > 2 ? colors.primaryColor : colors.disabled,
          },
        ]}
        disabled={value.length < 2}
        onPress={() => handleAddKeyword(value)}>
        <AntDesign name="plus" style={styles.addIcon} />
      </TouchableOpacity>
    </View>
  );
};

export { KeywordsInput };

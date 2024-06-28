import { TextInput, View, useColorScheme } from "react-native";

import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";
import { getColors } from "@/components/Themed";

interface SearchInputProps {
  onChangeText: (value: string) => void;
  placeholder: string;
  value: string;
}

const SearchInput = (props: SearchInputProps) => {
  const { onChangeText, value, placeholder } = props;

  const theme = useColorScheme();
  const colors = getColors(theme || "light");

  return (
    <View style={[styles.inputWrapper, { backgroundColor: colors.foreground }]}>
      <Feather name="search" style={styles.searchIcon} />
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, { color: colors.text }]}
      />
    </View>
  );
};

export { SearchInput };

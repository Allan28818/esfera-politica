import { StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";

import { styles } from "./styles";

interface DefaultButtonProps {
  buttonText: string;
  onPress: () => void;
  additionalStyles?: StyleProp<ViewStyle>;
  textUnerline?: boolean;
}

const DefaultButton = (props: DefaultButtonProps) => {
  const { buttonText, onPress, additionalStyles, textUnerline } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, additionalStyles]}
      onPress={onPress}>
      <Text
        style={[
          styles.buttonText,
          { textDecorationLine: textUnerline ? "underline" : "none" },
        ]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export { DefaultButton };

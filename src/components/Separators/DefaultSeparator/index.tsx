import { StyleProp, View, ViewStyle } from "react-native";

import { styles } from "./styles";

interface DefaultSeparatorProps {
  additionalStyles?: StyleProp<ViewStyle>;
}

const DefaultSeparator = (props: DefaultSeparatorProps) => {
  const { additionalStyles } = props;

  return <View style={[styles.separator, additionalStyles]} />;
};

export { DefaultSeparator };

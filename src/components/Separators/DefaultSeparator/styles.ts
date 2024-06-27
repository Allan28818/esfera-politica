import { getColors } from "@/components/Themed";
import { StyleSheet } from "react-native";

const colors = getColors();

const styles = StyleSheet.create({
  separator: {
    width: "80%",
    height: 1,
    backgroundColor: colors.primaryColor,
    borderRadius: 50,
    alignSelf: "center",
  },
});

export { styles };

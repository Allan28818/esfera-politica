import { getColors } from "@/components/Themed";
import { Fonts } from "@/styles/fonts";
import { StyleSheet } from "react-native";

const colors = getColors();

const styles = StyleSheet.create({
  button: {
    width: "auto",
    height: "auto",
    padding: 20,
    backgroundColor: colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: Fonts.FredokaRegular,
    fontSize: 16,
    color: colors.white,
  },
});

export { styles };

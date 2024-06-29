import { getColors } from "@/components/Themed";
import { Fonts } from "@/styles/fonts";
import { StyleSheet } from "react-native";

const colors = getColors();

const styles = StyleSheet.create({
  cardWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 26,
    flexDirection: "row",
    height: "auto",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.primaryColor,
    margin: "auto",
  },
  cardText: {
    fontSize: 16,
    fontFamily: Fonts.FredokaMedium,
    textAlign: "center",
  },
});

export { styles };

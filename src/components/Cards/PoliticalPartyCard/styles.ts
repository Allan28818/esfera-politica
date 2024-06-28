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
    justifyContent: "space-between",
  },
  textContentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  acronym: {
    fontFamily: Fonts.FredokaRegular,
    fontSize: 16,
  },
  circle: {
    height: 5,
    width: 5,
    backgroundColor: colors.tertiaryColor,
    marginHorizontal: 8,
    borderRadius: 50,
  },
  partyName: {
    fontFamily: Fonts.FredokaRegular,
    width: "80%",
    fontSize: 16,
  },
  arrowIcon: {
    fontSize: 24,
    color: colors.tertiaryColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export { styles };

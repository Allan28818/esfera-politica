import { getColors } from "@/components/Themed";
import { Fonts } from "@/styles/fonts";
import { StyleSheet } from "react-native";

const colors = getColors();

const styles = StyleSheet.create({
  cardWrapper: {
    paddingHorizontal: 9,
    paddingVertical: 8,
    flexDirection: "row",
  },
  topInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  buildingIcon: {
    fontSize: 14,
    marginRight: 5,
  },
  documentSpecifications: {
    fontSize: 16,
    fontFamily: Fonts.FredokaRegular,
  },
  summary: {
    fontFamily: Fonts.FredokaRegular,
    fontSize: 13,
    marginTop: 11,
    paddingRight: 20,
  },
  creationCard: {
    height: "auto",
    width: 120,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: colors.tertiaryColor,
    marginTop: 11,
  },
  creationText: {
    textAlign: "center",
    fontFamily: Fonts.FredokaBold,
    fontSize: 10,
    marginRight: 5,
  },
  creationTextBigger: {
    fontSize: 13,
    fontFamily: Fonts.FredokaRegular,
    marginLeft: 50,
  },
  button: {
    margin: "auto",
    width: "10%",
  },
  arrowIcon: {
    fontSize: 24,
    color: colors.tertiaryColor,
  },
});

export { styles };

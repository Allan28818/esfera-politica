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
  actionsWrapper: {
    margin: "auto",
    width: "auto",
    height: "100%",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  favoriteButton: {
    height: 30,
    width: 30,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  favoriteIconOutline: {
    color: colors.tertiaryColor,
    fontSize: 24,
  },
  innerFavoriteIcon: {
    marginLeft: 1.35,
    marginTop: 1.5,
  },
  arrowButton: {
    height: 30,
    width: 30,
    marginTop: "50%",
  },
  arrowIcon: {
    fontSize: 24,
    color: colors.tertiaryColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { styles };

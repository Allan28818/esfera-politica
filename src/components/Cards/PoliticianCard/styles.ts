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
    alignItems: "center",
  },
  politicianImage: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  contentWrapper: {
    marginLeft: 10,
    width: "90%",
  },
  politicianName: {
    fontSize: 12,
    fontFamily: Fonts.FredokaRegular,
  },
  subInfo: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-around",
  },
  subInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  buildingIcon: {
    fontSize: 13,
    marginRight: 5,
  },
  mailIcon: {
    fontSize: 17,
    marginRight: 5,
  },
  acronymInfo: {
    width: "47%",
  },
  subInfoText: {
    fontSize: 10,
    fontFamily: Fonts.FredokaRegular,
  },
  mailInfo: {
    width: "50%",
    flexWrap: "wrap",
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

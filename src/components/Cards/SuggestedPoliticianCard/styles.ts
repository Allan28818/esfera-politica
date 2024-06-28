import { getColors } from "@/components/Themed";
import { Fonts } from "@/styles/fonts";
import { StyleSheet } from "react-native";

const colors = getColors();

const styles = StyleSheet.create({
  cardWrapper: {
    height: "auto",
    width: 150,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: colors.shadow,
    elevation: 10,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  imageWrapper: {
    width: "auto",
    height: 70,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  politicianImage: {
    width: 115,
    height: 70,
    objectFit: "contain",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  gradient: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    alignItems: "flex-end",
    width: "auto",
    alignSelf: "center",
    height: "100%",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    paddingHorizontal: 4,
    paddingBottom: 7,
  },
  politicianName: {
    fontSize: 12,
    fontFamily: Fonts.FredokaRegular,
    color: colors.white,
    width: "90%",
    flexWrap: "nowrap",
  },
  infoWrapper: {
    paddingHorizontal: 11,
    paddingBottom: 11,
    paddingTop: 7,
    backgroundColor: "transparent",
  },
  politicianInfoWrapper: {
    flexDirection: "row",
    backgroundColor: "transparent",
    marginBottom: 5,
  },
  politicianInfoText: {
    fontSize: 10,
    fontFamily: Fonts.FredokaRegular,
    flexWrap: "nowrap",
    width: "80%",
  },
  buildingIcon: {
    fontSize: 12,
    marginRight: 5,
  },
  mailIcon: {
    fontSize: 12,
    marginRight: 5,
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 5,
  },
});

export { styles };

import { getColors } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Fonts } from "./fonts";

const colors = getColors();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabSelectorsWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 23,
  },

  sectionButton: {
    marginTop: 20,
    marginLeft: 10,
  },
  sectionButtonText: {
    fontFamily: Fonts.FredokaRegular,
    textTransform: "uppercase",
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  sectionTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryColor,
  },
  changeKeywordsLinkWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 17,
    marginBottom: 26,
  },
  changeKeywordsLink: {
    textDecorationLine: "underline",
    color: colors.primaryColor,
  },
  propositionsList: {
    marginBottom: 75,
  },
  section: {
    marginBottom: 21,
  },
  sectionTitle: {
    fontFamily: Fonts.FredokaMedium,
    fontSize: 16,
    marginLeft: 30,
    marginBottom: 5,
    color: colors.primaryColor,
  },
});

export { styles };

import { getColors } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Fonts } from "./fonts";

const colors = getColors();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrapper: {
    marginTop: 28,
  },
  noContentWrapper: {
    margin: "auto",
    alignItems: "center",
  },
  noContentIconWrapper: {
    height: 150,
    width: 150,
    borderRadius: 200,
    backgroundColor: colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  noContentIcon: {
    fontSize: 60,
  },
  noDocumentTitle: {
    fontSize: 14,
    fontFamily: Fonts.FredokaBold,
    marginBottom: 5,
  },
  noDocumentDescription: {
    fontSize: 12,
    fontFamily: Fonts.FredokaRegular,
    textAlign: "center",
    flexWrap: "wrap",
    width: 200,
  },
  noDocumentText: {
    color: colors.primaryColor,
    textDecorationLine: "underline",
  },
  keywordsWrapper: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 12,
    flexWrap: "wrap",
  },
  keywordWrapper: {
    height: "auto",
    paddingVertical: 5,
    paddingLeft: 10,
    borderRadius: 50,
    backgroundColor: colors.primaryColor,
    flexShrink: 1,
    flexDirection: "row",
    width: 150,
    marginRight: 10,
    marginTop: 10,
  },
  keywordText: {
    fontFamily: Fonts.FredokaRegular,
    fontSize: 12,
    color: colors.white,
    textAlign: "center",
    margin: "auto",
  },
  removeKeywordsButton: {
    width: 20,
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  removeKeywordIcon: {
    color: colors.white,
    fontSize: 13,
  },
  section: {
    marginBottom: 21,
  },
  sectionTitle: {
    fontFamily: Fonts.FredokaMedium,
    fontSize: 16,
    marginLeft: 30,
    marginBottom: 5,
  },
  propositionsList: {
    marginTop: 41,
    marginBottom: 75,
  },
});

export { styles };

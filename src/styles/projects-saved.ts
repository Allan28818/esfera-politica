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
    marginBottom: 18,
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
    width: "10%",
  },
  noDocumentText: {
    color: colors.primaryColor,
    textDecorationLine: "underline",
  },
});

export { styles };

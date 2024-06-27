import { getColors } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Fonts } from "./fonts";

const colors = getColors();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionButtonsWrapper: {
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
  },
  separator: {
    width: "90%",
    height: 1,
    backgroundColor: colors.primaryColor,
    borderRadius: 20,
    margin: "auto",
  },
  propositionsList: {
    marginBottom: 75,
  },
});

export { styles };

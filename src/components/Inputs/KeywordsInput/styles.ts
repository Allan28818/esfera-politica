import { getColors } from "@/components/Themed";
import { Fonts } from "@/styles/fonts";
import { StyleSheet } from "react-native";

const colors = getColors();

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    borderRadius: 5,
    padding: 10,
    width: "80%",
    height: 40,
    alignSelf: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: "100%",
    fontSize: 12,
    fontFamily: Fonts.FredokaRegular,
  },
  addKeywordButton: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    position: "absolute",
    right: 0,
  },
  addIcon: {
    fontSize: 20,
    color: colors.white,
  },
});

export { styles };

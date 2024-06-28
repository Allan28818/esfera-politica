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
    alignSelf: "center",
    alignItems: "center",
  },
  searchIcon: {
    fontSize: 20,
    color: colors.secondaryColor,
    marginRight: 15,
    shadowColor: colors.shadow,
    elevation: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  input: {
    width: "100%",
    height: "100%",
    fontSize: 12,
    fontFamily: Fonts.FredokaRegular,
  },
});

export { styles };

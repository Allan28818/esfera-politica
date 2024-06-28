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
  filters: {
    flexDirection: "row",
    marginTop: 14,
    width: "85%",
    alignSelf: "center",
    justifyContent: "flex-start",
  },
  filterButton: {
    borderWidth: 1,
    borderColor: colors.tertiaryColor,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 5,
  },
  filterText: {
    fontSize: 10,
    fontFamily: Fonts.FredokaRegular,
  },
  list: {
    marginBottom: 75,
    marginTop: 14,
  },
});

export { styles };

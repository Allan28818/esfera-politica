import { getColors } from "@/components/Themed";
import { StyleSheet } from "react-native";

const colors = getColors();

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primaryColor,
    width: "100%",
    height: "auto",
    flexDirection: "row",
  },
  logo: {
    width: 70,
    height: 70,
    marginVertical: 6,
    resizeMode: "contain",
    margin: "auto",
  },
  goBackButton: {
    flexDirection: "row",
    alignSelf: "center",
    position: "absolute",
    marginLeft: 30,
  },
  arrowIcon: {
    color: colors.white,
    fontSize: 25,
  },
});

export { styles };

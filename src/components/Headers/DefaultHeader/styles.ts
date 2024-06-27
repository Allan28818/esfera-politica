import { getColors } from "@/components/Themed";
import { StyleSheet } from "react-native";

const colors = getColors();

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primaryColor,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  logo: {
    width: 70,
    height: 70,
    marginVertical: 6,
    resizeMode: "contain",
  },
});

export { styles };

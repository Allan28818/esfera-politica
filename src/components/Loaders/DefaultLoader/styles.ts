import { getColors } from "@/components/Themed";
import { StyleSheet } from "react-native";

const colors = getColors();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { styles };

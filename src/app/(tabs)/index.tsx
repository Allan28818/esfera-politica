import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";

import { getColors } from "@/components/Themed";

export default function TabOneScreen() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  containerHead: {
    backgroundColor: "#27AE60",
    width: "100%",
    height: "40%",
  },
  containerBody: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    backgroundColor: "white",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    backgroundColor: "black",
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

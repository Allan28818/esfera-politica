import { getColors } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Fonts } from "./fonts";

const colors = getColors();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  partyInfoWrapper: {
    marginTop: 24,
    flexDirection: "row",
    paddingHorizontal: 21,
    marginBottom: 10,
  },
  membersList: {
    margin: "auto",
    alignSelf: "center",
    marginBottom: 20,
  },
  partyImage: {
    height: 60,
    width: 60,
    marginRight: 18,
    borderRadius: 100,
  },
  partyNameWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  partyTitle: {
    fontSize: 18,
    fontFamily: Fonts.FredokaSemiBold,
  },
  circle: {
    width: 4,
    height: 4,
    borderRadius: 10,
    marginHorizontal: 6,
  },
  politicalPartyDetails: {
    paddingHorizontal: 32,
    marginVertical: 15,
  },
  topic: {
    marginBottom: 13,
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    height: 35,
    width: 35,
    borderRadius: 100,
    backgroundColor: colors.lightBlue,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  topicIcon: {
    fontSize: 18,
  },
  topicField: {
    fontSize: 14,
    fontFamily: Fonts.FredokaSemiBold,
    marginRight: 5,
  },
  topicValue: {
    fontSize: 14,
    fontFamily: Fonts.FredokaSemiBold,
    marginRight: 5,
  },
  leaderContainer: {
    paddingHorizontal: 27,
    marginTop: 14,
  },
  leaderTitle: {
    fontSize: 16,
    fontFamily: Fonts.FredokaMedium,
  },
  membersTitle: {
    marginLeft: 27,
    fontSize: 16,
    fontFamily: Fonts.FredokaMedium,
    marginVertical: 20,
  },
  statusWrapper: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    width: 150,
  },
  status: {
    fontSize: 14,
    fontFamily: Fonts.FredokaRegular,
  },
});

export { styles };

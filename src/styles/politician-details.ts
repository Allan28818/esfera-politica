import { getColors } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Fonts } from "./fonts";

const colors = getColors();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  politicianInfosWrapper: {
    marginTop: 30,
  },
  politicianInfoWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  politicianPhoto: {
    width: 70,
    height: 70,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.primaryColor,
    marginRight: 15,
  },
  politicianName: {
    fontSize: 16,
    fontFamily: Fonts.FredokaBold,
    flexWrap: "wrap",
    width: "70%",
    marginBottom: 12,
  },
  politicianOfficialName: {
    fontSize: 10,
    fontFamily: Fonts.FredokaRegular,
  },
  additionalInfosWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 13,
  },
  additionalInfoWrapper: {
    alignItems: "center",
    flexDirection: "row",
    marginRight: 20,
  },
  additionalInfoIcon: {
    fontSize: 17,
    marginRight: 5,
  },
  additionalInfoText: {
    fontFamily: Fonts.FredokaRegular,
    fontSize: 12,
  },
  politicianDetails: {
    marginHorizontal: 20,
    marginVertical: 25,
  },
  politicianDetailTopic: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconWrapper: {
    height: 35,
    width: 35,
    borderRadius: 100,
    backgroundColor: colors.lightBlue,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  detailTopicIcon: {
    fontSize: 17,
  },
  detailTopicField: {
    fontSize: 14,
    fontFamily: Fonts.FredokaSemiBold,
  },
  detailTopicValue: {
    fontSize: 14,
    fontFamily: Fonts.FredokaRegular,
    marginLeft: 5,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontFamily: Fonts.FredokaMedium,
    marginLeft: 20,
    marginTop: 10,
  },
  listStyle: {
    alignSelf: "center",
    marginTop: 10,
  },
});

export { styles };

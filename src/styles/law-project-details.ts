import { getColors } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Fonts } from "./fonts";

const colors = getColors();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summaryWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderRadius: 5,
    height: "auto",
    width: "auto",
    marginHorizontal: 20,
    marginTop: 31,
    marginBottom: 19.5,
  },
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleOfSummarySection: {
    fontFamily: Fonts.FredokaSemiBold,
    fontSize: 16,
  },
  propositionTypeWrapper: {
    borderRadius: 50,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  propositionTypeText: {
    fontFamily: Fonts.FredokaRegular,
    fontSize: 14,
  },
  summaryText: {
    fontFamily: Fonts.FredokaRegular,
    fontSize: 16,
    marginTop: 14,
  },
  propositionDetails: {
    marginTop: 10.5,
    alignItems: "center",
  },
  propositionTopic: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 9,
  },
  propositionIconWrapper: {
    height: 35,
    width: 35,
    borderRadius: 50,
    backgroundColor: colors.lightBlue,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  propositionIcon: {
    fontSize: 16,
    color: colors.text,
  },
  topicTextWrapper: {
    width: "100%",
  },
  topicField: {
    fontSize: 14,
    fontFamily: Fonts.FredokaSemiBold,
    maxWidth: "80%",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  topicValue: {
    fontSize: 14,
    fontFamily: Fonts.FredokaRegular,
  },
  authorButton: {
    alignSelf: "center",
  },
  dispatchWrapper: {
    marginTop: 14.5,
    width: "auto",
    height: "auto",
    marginHorizontal: 20,
    marginBottom: 25,
    paddingHorizontal: 9,
    paddingVertical: 15,
    borderRadius: 5,
  },
  dispatchTitle: {
    fontFamily: Fonts.FredokaSemiBold,
    fontSize: 16,
    marginBottom: 16,
  },
  dispatchText: {
    fontFamily: Fonts.FredokaRegular,
    fontSize: 16,
    marginBottom: 16,
  },
  buttonsWrapper: {
    width: "80%",
    margin: "auto",
  },
  docButton: {
    marginBottom: 8,
  },
  fullDocButton: {
    backgroundColor: colors.secondaryColor,
  },
  votesButton: {
    width: "90%",
    height: "auto",
    marginTop: 32,
    borderRadius: 5,
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    margin: "auto",
    alignSelf: "center",
  },
  voteTitleWrapper: {
    flexDirection: "row",
  },
  voteButtonTitle: {
    fontSize: 16,
    fontFamily: Fonts.FredokaSemiBold,
    marginRight: 8,
  },
  voteIcon: {
    fontSize: 17,
  },
  votesAmount: {
    fontSize: 12,
    fontFamily: Fonts.FredokaSemiBold,
    marginTop: 13,
  },
  voteButtonArrow: {
    fontSize: 30,
  },
  votesList: {
    width: "90%",
    height: "auto",
    margin: "auto",
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  voteWrapper: {
    paddingVertical: 14,
    paddingHorizontal: 25,
  },
  voteWrapperHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  agencyName: {
    fontSize: 14,
    fontFamily: Fonts.FredokaSemiBold,
  },
  isApproved: {
    width: "auto",
    height: "auto",
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  isApprovedText: {
    fontSize: 10,
    fontFamily: Fonts.FredokaSemiBold,
    marginRight: 3,
  },
  isApprovedCheckIcon: {
    fontSize: 7,
  },
  isApprovedXIcon: {
    fontSize: 13,
  },
  voteDescription: {
    fontSize: 10,
    fontFamily: Fonts.FredokaRegular,
  },
  relatedProjectsTitle: {
    fontSize: 16,
    fontFamily: Fonts.FredokaSemiBold,
    marginBottom: 14,
  },
});

export { styles };

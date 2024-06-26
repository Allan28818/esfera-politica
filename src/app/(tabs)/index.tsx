import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";

import { getProposition } from "@/services/propositions/getProposition";
import { getPropositions } from "@/services/propositions/getPropositions";
import { getRelatedPropositions } from "@/services/propositions/getRelatedPropositions";
import { useEffect } from "react";
import { getPropositionVotes } from "@/services/propositions/getPropositionVotes";
import { getPropositionAuthors } from "@/services/propositions/getPropositionAuthors";
import { getPoliticians } from "@/services/politicians/getPoliticians";
import { getPolitician } from "@/services/politicians/getPolitician";
import { getPoliticalParties } from "@/services/politicalParties/getPoliticalParties";
import { getPoliticalParty } from "@/services/politicalParties/getPoliticalParty";
import { getPoliticalPartyMembers } from "@/services/politicalParties/getPoliticalPartyMembers";

export default function Home() {
  useEffect(() => {
    const handleGetPropositions = async () => {
      const propositionsResponse = await getPropositions();
      const propositionResponse = await getProposition(18156);
      const relatedPropositionResponse = await getRelatedPropositions(18156);
      const propositionVotesResponse = await getPropositionVotes(18156);
      const propositionAuthorsResponse = await getPropositionAuthors(18156);

      const politiciansResponse = await getPoliticians();
      const politicianResponse = await getPolitician(220593);

      const politicalPartiesResponse = await getPoliticalParties();
      const politicalPartyResponse = await getPoliticalParty(36844);
      const politicalPartyMembersResponse = await getPoliticalPartyMembers(
        36844
      );

      console.log("propositions", propositionsResponse);
      console.log("proposition", propositionResponse);
      console.log("related proposition", relatedPropositionResponse);
      console.log("proposition votes", propositionVotesResponse);
      console.log("proposition authors", propositionAuthorsResponse);

      console.log("politicians", politiciansResponse);
      console.log("politician", politicianResponse);

      console.log("political parties", politicalPartiesResponse);
      console.log("political party", politicalPartyResponse);
      console.log("political party members", politicalPartyMembersResponse);
    };

    handleGetPropositions();
  }, []);

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

import { DefaultResponse } from "@/models/core.response";
import { PropositionProps } from "@/models/propositions";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SaveFavoritePropositionPropsReturn extends DefaultResponse {
  data: PropositionProps[];
}

async function saveFavoriteProposition(
  proposition: PropositionProps
): Promise<SaveFavoritePropositionPropsReturn> {
  try {
    const propositionsInString = await AsyncStorage.getItem(
      "RNPropositions_favorites"
    );

    const propositionsParsed: PropositionProps[] = !!propositionsInString
      ? JSON.parse(propositionsInString)
      : [];

    const duplicatedPropositions = propositionsParsed.filter(
      (currentProposition: PropositionProps) =>
        currentProposition.id === proposition.id
    );

    if (duplicatedPropositions.length === 0) {
      propositionsParsed.push(proposition);
      await AsyncStorage.setItem(
        "RNPropositions_favorites",
        JSON.stringify(propositionsParsed)
      );

      return {
        statusCode: 200,
        message: "Salvo na sua lista de favoritos!",
        data: propositionsParsed,
      };
    }

    return {
      statusCode: 401,
      message: "Proposição já está inclusa na sua lista de proposições!",
      data: propositionsParsed,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      message: "Falha ao salvar a proposição!",
      error,
      data: [],
    };
  }
}

export { saveFavoriteProposition };

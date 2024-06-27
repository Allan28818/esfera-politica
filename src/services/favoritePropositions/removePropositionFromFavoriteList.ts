import { DefaultResponse } from "@/models/core.response";
import { PropositionProps } from "@/models/propositions";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RemovePropositionFromFavoriteListPropsReturn extends DefaultResponse {
  data: PropositionProps[];
}

async function removePropositionFromFavoriteList(
  proposition: PropositionProps
): Promise<RemovePropositionFromFavoriteListPropsReturn> {
  try {
    const propositionsInString = await AsyncStorage.getItem(
      "RNPropositions_favorites"
    );
    const propositionsParsed: PropositionProps[] =
      JSON.parse(propositionsInString || "") || [];
    const propositionIndex = propositionsParsed.findIndex(
      (currentProposition: PropositionProps) =>
        currentProposition.id === proposition.id
    );

    if (propositionIndex === -1) {
      return {
        statusCode: 401,
        message: "A proposição já foi removida da sua lista!",
        data: propositionsParsed,
      };
    }

    const deleteCount = 1;
    propositionsParsed.splice(propositionIndex, deleteCount);

    await AsyncStorage.setItem(
      "RNPropositions_favorites",
      JSON.stringify(propositionsParsed)
    );

    return {
      statusCode: 200,
      message: "Removido da sua lista de favoritos!",
      data: propositionsParsed,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      message: "Falha ao remover a proposição!",
      error,
      data: [],
    };
  }
}

export { removePropositionFromFavoriteList };

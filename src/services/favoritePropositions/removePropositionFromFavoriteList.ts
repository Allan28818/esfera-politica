import { DefaultResponse } from "@/models/core.response";
import { PropositionProps } from "@/models/propositions";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function removePropositionFromFavoriteList(
  proposition: PropositionProps
): Promise<DefaultResponse> {
  try {
    const propositionsInString = await AsyncStorage.getItem(
      "RNPropositions_favorites"
    );
    const propositionsParsed = JSON.parse(propositionsInString || "") || [];
    const propositionIndex = propositionsParsed.findIndex(
      (currentProposition: PropositionProps) =>
        currentProposition.id === proposition.id
    );

    if (propositionIndex === -1) {
      return {
        statusCode: 401,
        message: "A proposição já foi removida da sua lista!",
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
      message: "Proposição removida com sucesso!",
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      message: "Falha ao remover a proposição!",
      error,
    };
  }
}

export { removePropositionFromFavoriteList };

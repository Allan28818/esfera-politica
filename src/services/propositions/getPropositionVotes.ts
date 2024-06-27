import axios from "axios";

import { DefaultResponse } from "@/models/core.response";
import { LinkProps } from "@/models/links";
import { PropositionWithVotingProps } from "@/models/propositions";

interface DataProps {
  dados: PropositionWithVotingProps[];
  links: LinkProps[];
}

interface GetPropositionVotesResProps extends DefaultResponse {
  data: DataProps;
}

async function getPropositionVotes(
  propositionId: string | number
): Promise<GetPropositionVotesResProps> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_GOV_API_URL}/proposicoes/${propositionId}/votacoes`
    );

    return {
      statusCode: response.status,
      message: "Votação da proposição encontrada com sucesso!",
      data: response.data,
    };
  } catch (error: any) {
    console.error("[ERROR][getPropositionVotes]", error);
    return {
      statusCode: error.status || 500,
      message: "Não foi possível buscar a votação da sua proposição!",
      error,
      data: {} as DataProps,
    };
  }
}

export { getPropositionVotes };

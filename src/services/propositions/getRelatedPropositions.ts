import axios from "axios";

import { DefaultResponse } from "@/models/core.response";
import { LinkProps } from "@/models/links";
import { PropositionProps } from "@/models/propositions";

interface DataProps {
  dados: PropositionProps[];
  links: LinkProps[];
}

interface GetRelatedPropositionsResProps extends DefaultResponse {
  data: DataProps;
}

async function getRelatedPropositions(
  propositionId: string | number
): Promise<GetRelatedPropositionsResProps> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_GOV_API_URL}/proposicoes/${propositionId}/relacionadas`
    );

    return {
      statusCode: response.status,
      message: "Proposições relaciondas encontradas com sucesso!",
      data: response.data,
    };
  } catch (error: any) {
    console.error("[ERROR][getRelatedPropositions]", error);
    return {
      statusCode: error.status || 500,
      message: "Não foi possível buscar suas proposições!",
      error,
      data: {} as DataProps,
    };
  }
}

export { getRelatedPropositions };

import axios from "axios";

import { DefaultResponse } from "@/models/core.response";
import { PropositionProps } from "@/models/propositions";
import { LinkProps } from "@/models/links";

interface DataProps {
  dados: PropositionProps[];
  links: LinkProps[];
}

interface GetPropositionsResProps extends DefaultResponse {
  data: DataProps;
}

async function getPropositions(): Promise<GetPropositionsResProps> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_GOV_API_URL}/proposicoes`
    );

    return {
      statusCode: response.status,
      message: "Proposições encontradas com sucesso!",
      data: response.data,
    };
  } catch (error: any) {
    console.error("[ERROR][getPropositions]", error);
    return {
      statusCode: error.status || 500,
      message: "Não foi possível buscar suas proposições!",
      error,
      data: {} as DataProps,
    };
  }
}

export { getPropositions };

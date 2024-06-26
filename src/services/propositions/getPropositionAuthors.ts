import axios from "axios";

import { DefaultResponse } from "@/models/core.response";
import { LinkProps } from "@/models/links";
import { PropositionAuthor } from "@/models/propositions";

interface DataProps {
  dados: PropositionAuthor[];
  links: LinkProps[];
}

interface GetPropositionAuthorsResProps extends DefaultResponse {
  data: DataProps;
}

async function getPropositionAuthors(
  propositionId: string | number
): Promise<GetPropositionAuthorsResProps> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_GOV_API_URL}/proposicoes/${propositionId}/autores`
    );

    return {
      statusCode: response.status,
      message: "Autores da proposição encontrados com sucesso!",
      data: response.data,
    };
  } catch (error: any) {
    console.error("[ERROR][getPropositionAuthors]", error);
    return {
      statusCode: error.status || 500,
      message: "Não foi possível buscar os autores da sua proposição!",
      error,
      data: {} as DataProps,
    };
  }
}

export { getPropositionAuthors };

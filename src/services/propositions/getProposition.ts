import axios from "axios";

import { DefaultResponse } from "@/models/core.response";
import { LinkProps } from "@/models/links";
import { DetailedPropositionProps } from "@/models/propositions";

interface DataProps {
  dados: DetailedPropositionProps;
  links: LinkProps[];
}

interface GetPropositionResProps extends DefaultResponse {
  data: DataProps;
}

async function getProposition(
  propositionId: string | number
): Promise<GetPropositionResProps> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_GOV_API_URL}/proposicoes/${propositionId}`
    );

    return {
      statusCode: response.status,
      message: "Proposição encontrada com sucesso!",
      data: response.data,
    };
  } catch (error: any) {
    console.error("[ERROR][getProposition]", error);
    return {
      statusCode: error.status || 500,
      message: "Não foi possível buscar sua proposição!",
      error,
      data: {} as DataProps,
    };
  }
}

export { getProposition };

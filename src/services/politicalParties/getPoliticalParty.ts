import axios from "axios";

import { DefaultResponse } from "@/models/core.response";
import { LinkProps } from "@/models/links";
import { DetailedPoliticalPartyProps } from "@/models/politicalParties";

interface DataProps {
  dados: DetailedPoliticalPartyProps;
  links: LinkProps[];
}

interface GetPoliticalPartyResProps extends DefaultResponse {
  data: DataProps;
}

async function getPoliticalParty(
  politicalPartyId: string
): Promise<GetPoliticalPartyResProps> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_GOV_API_URL}/partidos/${politicalPartyId}`
    );

    return {
      statusCode: response.status,
      message: "Partido político encontrado com sucesso!",
      data: response.data,
    };
  } catch (error: any) {
    console.error("[ERROR][getPoliticalParty]", error);
    return {
      statusCode: error.status || 500,
      message: "Não foi possível buscar o partido político!",
      error,
      data: {} as DataProps,
    };
  }
}

export { getPoliticalParty };

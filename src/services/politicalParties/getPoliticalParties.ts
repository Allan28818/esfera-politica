import axios from "axios";

import { DefaultResponse } from "@/models/core.response";
import { LinkProps } from "@/models/links";
import { PoliticalPartyProps } from "@/models/politicalParties";

interface DataProps {
  dados: PoliticalPartyProps[];
  links: LinkProps[];
}

interface GetPoliticalPartiesResProps extends DefaultResponse {
  data: DataProps;
}

async function getPoliticalParties(): Promise<GetPoliticalPartiesResProps> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_GOV_API_URL}/partidos`
    );

    return {
      statusCode: response.status,
      message: "Partidos políticos encontrados com sucesso!",
      data: response.data,
    };
  } catch (error: any) {
    console.error("[ERROR][getPoliticalParties]", error);
    return {
      statusCode: error.status || 500,
      message: "Não foi possível buscar os partidos políticos!",
      error,
      data: {} as DataProps,
    };
  }
}

export { getPoliticalParties };

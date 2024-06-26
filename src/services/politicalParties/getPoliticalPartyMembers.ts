import axios from "axios";

import { DefaultResponse } from "@/models/core.response";
import { LinkProps } from "@/models/links";
import { PoliticianProps } from "@/models/politicians";

interface DataProps {
  dados: PoliticianProps[];
  links: LinkProps[];
}

interface GetPoliticalPartyMembersResProps extends DefaultResponse {
  data: DataProps;
}

async function getPoliticalPartyMembers(
  politicalPartyId: string | number
): Promise<GetPoliticalPartyMembersResProps> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_GOV_API_URL}/partidos/${politicalPartyId}/membros`
    );

    return {
      statusCode: response.status,
      message: "Membros do partido político encontrados com sucesso!",
      data: response.data,
    };
  } catch (error: any) {
    console.error("[ERROR][getPoliticalPartyMembers]", error);
    return {
      statusCode: error.status || 500,
      message: "Não foi possível buscar os membros do partido político!",
      error,
      data: {} as DataProps,
    };
  }
}

export { getPoliticalPartyMembers };

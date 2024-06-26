import axios from "axios";

import { DefaultResponse } from "@/models/core.response";
import { LinkProps } from "@/models/links";
import { DetailedPoliticianProps } from "@/models/politicians";

interface DataProps {
  dados: DetailedPoliticianProps;
  links: LinkProps[];
}

interface GetPoliticianResProps extends DefaultResponse {
  data: DataProps;
}

async function getPolitician(
  politicianId: string | number
): Promise<GetPoliticianResProps> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_GOV_API_URL}/deputados/${politicianId}`
    );

    return {
      statusCode: response.status,
      message: "Deputado encontrado com sucesso!",
      data: response.data,
    };
  } catch (error: any) {
    console.error("[ERROR][getPolitician]", error);
    return {
      statusCode: error.status || 500,
      message: "Não foi possível buscar o deputado!",
      error,
      data: {} as DataProps,
    };
  }
}

export { getPolitician };

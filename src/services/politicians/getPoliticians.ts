import axios from "axios";

import { DefaultResponse } from "@/models/core.response";
import { PoliticianProps } from "@/models/politicians";
import { LinkProps } from "@/models/links";

interface DataProps {
  dados: PoliticianProps[];
  links: LinkProps[];
}

interface GetPoliticiansResProps extends DefaultResponse {
  data: DataProps;
}

interface GetPoliticiansProps {
  page: number;
  items: number;
}

async function getPoliticians(
  props?: GetPoliticiansProps
): Promise<GetPoliticiansResProps> {
  try {
    const url = `${process.env.EXPO_PUBLIC_GOV_API_URL}/deputados${
      !!props?.items && props.page
        ? `?pagina=${props.page}&itens=${props.items}`
        : ""
    }`;

    const response = await axios.get(url);

    return {
      statusCode: response.status,
      message: "Deputados encontrados com sucesso!",
      data: response.data,
    };
  } catch (error: any) {
    console.error("[ERROR][getPoliticians]", error);
    return {
      statusCode: error.status || 500,
      message: "Não foi possível buscar os deputados!",
      error,
      data: {} as DataProps,
    };
  }
}

export { getPoliticians };

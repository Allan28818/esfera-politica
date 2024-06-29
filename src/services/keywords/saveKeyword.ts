import { DefaultResponse } from "@/models/core.response";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SaveKeywordPropsReturn extends DefaultResponse {
  data: string[];
}

async function saveKeyword(keyword: string): Promise<SaveKeywordPropsReturn> {
  try {
    const treatedKeyword = keyword.trim().toLowerCase();

    const keywordsInString = await AsyncStorage.getItem("RNKeywords");
    const keywordsParsed: string[] = !!keywordsInString
      ? JSON.parse(keywordsInString)
      : [];

    const keywordAlreadyIncluded =
      keywordsParsed.indexOf(treatedKeyword) !== -1;

    if (keywordAlreadyIncluded) {
      return {
        statusCode: 400,
        message: "Palavra-chave já inclusa na sua lista!",
        data: keywordsParsed,
      };
    }

    keywordsParsed.push(treatedKeyword);

    await AsyncStorage.setItem("RNKeywords", JSON.stringify(keywordsParsed));

    return {
      statusCode: 200,
      message: "Palavra-chave adicionada!",
      data: keywordsParsed,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      message: "Falha ao salvar palavra-chave!",
      error,
      data: [],
    };
  }
}

export { saveKeyword };

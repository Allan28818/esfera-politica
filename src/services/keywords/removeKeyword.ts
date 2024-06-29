import { DefaultResponse } from "@/models/core.response";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RemoveKeywordPropsReturn extends DefaultResponse {
  data: string[];
}

async function removeKeyword(
  keyword: string
): Promise<RemoveKeywordPropsReturn> {
  try {
    const treatedKeyword = keyword.trim().toLowerCase();

    const keywordsInString = await AsyncStorage.getItem("RNKeywords");
    const keywordsParsed: string[] = !!keywordsInString
      ? JSON.parse(keywordsInString)
      : [];

    const keywordIndex = keywordsParsed.indexOf(treatedKeyword);
    const keywordAlreadyRemoved = keywordIndex === -1;

    if (keywordAlreadyRemoved) {
      return {
        statusCode: 400,
        message: "Palavra-chave já foi removida da sua lista!",
        data: keywordsParsed,
      };
    }

    keywordsParsed.splice(keywordIndex, 1);

    await AsyncStorage.setItem("RNKeywords", JSON.stringify(keywordsParsed));

    return {
      statusCode: 200,
      message: "Palavra-chave removida!",
      data: keywordsParsed,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      message: "Falha ao remover a palavra-chave!",
      error,
      data: [],
    };
  }
}

export { removeKeyword };

import { StatusBar } from "expo-status-bar";
import {
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

import { SafeAreaView, Text, getColors } from "@/components/Themed";

import { DashedCard } from "@/components/Cards/DashedCard";
import { PropositionCard } from "@/components/Cards/PropositionCard";
import { DefaultHeader } from "@/components/Headers/DefaultHeader";
import { KeywordsInput } from "@/components/Inputs/KeywordsInput";
import { DefaultLoader } from "@/components/Loaders/DefaultLoader";
import { PropositionProps } from "@/models/propositions";
import { removePropositionFromFavoriteList } from "@/services/favoritePropositions/removePropositionFromFavoriteList";
import { saveFavoriteProposition } from "@/services/favoritePropositions/saveFavoriteProposition";
import { removeKeyword } from "@/services/keywords/removeKeyword";
import { saveKeyword } from "@/services/keywords/saveKeyword";
import { getPropositions } from "@/services/propositions/getPropositions";
import { styles } from "@/styles/add-keyword";
import { deepSearch } from "@/utils/deepSearch";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-root-toast";

export default function AddKeywords() {
  const theme = useColorScheme();
  const colors = getColors(theme || "light");

  const [propositions, setPropositions] = useState<PropositionProps[]>([]);
  const [favoritePropositions, setFavoritePropositions] = useState<
    PropositionProps[]
  >([]);

  const [keywordInput, setKeywordInput] = useState<string>("");

  const [keywords, setKeywords] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleGetPropositions = async () => {
      setLoading(true);
      const propositionsResponse = await getPropositions();

      if (!!propositionsResponse.error) {
        Toast.show(propositionsResponse.message, {
          duration: Toast.durations.LONG,
        });
      }
      setPropositions(propositionsResponse.data.dados);
    };

    const handleSetKeywords = async () => {
      const keywordsInString = await AsyncStorage.getItem("RNKeywords");
      const keywordsParsed = !!keywordsInString
        ? JSON.parse(keywordsInString)
        : [];

      setKeywords(keywordsParsed);

      setLoading(false);
    };

    handleGetPropositions();
    handleSetKeywords();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const handleSetFavoritePropositions = async () => {
        setLoading(true);
        const favoritePropositions = await AsyncStorage.getItem(
          "RNPropositions_favorites"
        );
        const favoritePropositionsParsed = !!favoritePropositions
          ? JSON.parse(favoritePropositions)
          : [];

        setFavoritePropositions(favoritePropositionsParsed);
        setLoading(false);
      };
      handleSetFavoritePropositions();
    }, [])
  );

  async function handleFavoriteProposition(proposition: PropositionProps) {
    const isFavoriteProposition =
      favoritePropositions.findIndex(
        (currentProposition) => currentProposition.id === proposition.id
      ) !== -1;

    let response;

    if (isFavoriteProposition) {
      response = await removePropositionFromFavoriteList(proposition);
    } else {
      response = await saveFavoriteProposition(proposition);
    }

    Toast.show(response.message, { duration: Toast.durations.LONG });

    if (!!response.error) {
      return;
    }

    setFavoritePropositions(response.data);
  }

  async function handleAddKeyword(keyword: string) {
    const addKeywordResponse = await saveKeyword(keyword);

    if (addKeywordResponse.error) {
      Toast.show(addKeywordResponse.message, {
        duration: Toast.durations.LONG,
      });
      return;
    }
    setKeywords(addKeywordResponse.data);
    setKeywordInput("");
  }
  async function handleRemoveKeyword(keyword: string) {
    const removeKeywordResponse = await removeKeyword(keyword);

    if (removeKeywordResponse.error) {
      Toast.show(removeKeywordResponse.message, {
        duration: Toast.durations.LONG,
      });
      return;
    }
    Toast.show(removeKeywordResponse.message, {
      duration: Toast.durations.LONG,
    });
    setKeywords(removeKeywordResponse.data);
  }

  if (loading) {
    return <DefaultLoader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.primaryColor}
        style={Platform.OS === "ios" ? "light" : "auto"}
      />
      <DefaultHeader />
      <View style={styles.inputWrapper}>
        <KeywordsInput
          handleAddKeyword={handleAddKeyword}
          onChangeText={(text) => setKeywordInput(text)}
          placeholder="Digite palavras chave para receber alertas"
          value={keywordInput}
        />
        <View style={styles.keywordsWrapper}>
          {keywords.map((keyword) => (
            <View key={keyword} style={styles.keywordWrapper}>
              <Text style={styles.keywordText}>
                {keyword[0].toLocaleUpperCase() + keyword.slice(1)}
              </Text>
              <TouchableOpacity
                onPress={() => handleRemoveKeyword(keyword)}
                style={styles.removeKeywordsButton}>
                <AntDesign name="close" style={styles.removeKeywordIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {!loading && !keywords.length ? (
        <View style={styles.noContentWrapper}>
          <View style={styles.noContentIconWrapper}>
            <MaterialCommunityIcons
              name="bell-ring"
              style={[styles.noContentIcon, { color: colors.text }]}
            />
          </View>
          <Text style={styles.noDocumentTitle}>
            Você ainda não tem palavras-chave
          </Text>
          <Text style={styles.noDocumentDescription}>
            Adicione palavras chave para receber alertas sobre projeto de lei
            relacionados...
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.propositionsList}>
          {keywords.map((keyword) => {
            const filteredPropositions = propositions.filter((proposition) => {
              const stringToAnalyze = `${proposition.ano} ${proposition.codTipo} ${proposition.ementa} ${proposition.id} ${proposition.numero} ${proposition.siglaTipo} ${proposition.uri}`;
              console.log("proposition", proposition);
              return deepSearch({ stringToAnalyze, searchTerm: keyword });
            });

            return (
              <View key={keyword} style={styles.section}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: colors.textSecondary },
                  ]}>
                  {keyword[0].toLocaleUpperCase() + keyword.slice(1)}
                </Text>
                {filteredPropositions.length === 0 ? (
                  <DashedCard
                    text={"Sem resultados para seu alerta nesse momento"}
                  />
                ) : (
                  filteredPropositions.map((proposition) => (
                    <PropositionCard
                      key={proposition.id}
                      acronym={proposition.siglaTipo}
                      documentNumber={proposition.numero}
                      documentYear={proposition.ano}
                      isFavorite={
                        favoritePropositions.findIndex(
                          (currentProposition) =>
                            currentProposition.id === proposition.id
                        ) !== -1
                      }
                      onPressFavorite={() =>
                        handleFavoriteProposition(proposition)
                      }
                      summary={proposition.ementa}
                    />
                  ))
                )}
              </View>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

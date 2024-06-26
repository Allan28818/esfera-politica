import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

import { SafeAreaView, Text, getColors } from "@/components/Themed";

import { PropositionCard } from "@/components/Cards/PropositionCard";
import { DefaultHeader } from "@/components/Headers/DefaultHeader";
import { DefaultLoader } from "@/components/Loaders/DefaultLoader";
import { DefaultSeparator } from "@/components/Separators/DefaultSeparator";
import { PropositionProps } from "@/models/propositions";
import { removePropositionFromFavoriteList } from "@/services/favoritePropositions/removePropositionFromFavoriteList";
import { saveFavoriteProposition } from "@/services/favoritePropositions/saveFavoriteProposition";
import { getPropositions } from "@/services/propositions/getPropositions";
import { styles } from "@/styles/home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-root-toast";
import { DashedCard } from "@/components/Cards/DashedCard";
import { deepSearch } from "@/utils/deepSearch";

export default function Home() {
  const router = useRouter();

  const theme = useColorScheme();
  const colors = getColors(theme || "light");

  const [propositions, setPropositions] = useState<PropositionProps[]>([]);
  const [favoritePropositions, setFavoritePropositions] = useState<
    PropositionProps[]
  >([]);

  const [keywords, setKeywords] = useState<string[]>([]);

  const [currentTab, setCurrentTab] = useState<
    "target-propositions" | "all-propositions"
  >("target-propositions");

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleGetPropositions = async () => {
      setLoading(true);
      const propositionsResponse = await getPropositions();

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
  console.log("currenttab", currentTab);

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

      <View style={styles.tabSelectorsWrapper}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.sectionButton,
            currentTab === "target-propositions" && styles.sectionTabActive,
          ]}
          onPress={() => setCurrentTab("target-propositions")}>
          <Text style={styles.sectionButtonText}>Projetos em observação</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.sectionButton,
            currentTab === "all-propositions" && styles.sectionTabActive,
          ]}
          onPress={() => setCurrentTab("all-propositions")}>
          <Text style={styles.sectionButtonText}>Projetos de lei</Text>
        </TouchableOpacity>
      </View>
      {currentTab === "target-propositions" && (
        <View style={styles.changeKeywordsLinkWrapper}>
          <Link href={"add-keywords"}>
            <Text style={styles.changeKeywordsLink}>
              Alterar palavras-chave
            </Text>
          </Link>
        </View>
      )}
      {currentTab === "target-propositions" && (
        <ScrollView style={styles.propositionsList}>
          {keywords.map((keyword) => {
            const filteredPropositions = propositions.filter((proposition) => {
              const stringToAnalyze = `${proposition.ano} ${proposition.codTipo} ${proposition.ementa} ${proposition.id} ${proposition.numero} ${proposition.siglaTipo} ${proposition.uri}`;
              console.log("proposition", proposition);
              return deepSearch({ stringToAnalyze, searchTerm: keyword });
            });

            return (
              <View key={keyword} style={styles.section}>
                <Text style={[styles.sectionTitle]}>
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

      {currentTab === "all-propositions" && (
        <FlatList
          style={styles.propositionsList}
          data={propositions}
          ItemSeparatorComponent={() => <DefaultSeparator />}
          renderItem={(proposition) => (
            <PropositionCard
              key={proposition.item.id}
              acronym={proposition.item.siglaTipo}
              documentNumber={proposition.item.numero}
              documentYear={proposition.item.ano}
              summary={proposition.item.ementa}
              isFavorite={
                favoritePropositions.findIndex(
                  (currentProposition) =>
                    currentProposition.id === proposition.item.id
                ) !== -1
              }
              onPressFavorite={() =>
                handleFavoriteProposition(proposition.item)
              }
              onPress={() => {
                router.navigate({
                  pathname: "law-project-details",
                  params: {
                    propositionId: proposition.item.id,
                  },
                });
              }}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

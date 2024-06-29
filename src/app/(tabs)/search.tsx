import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { SafeAreaView, Text, View, getColors } from "@/components/Themed";
import { DefaultHeader } from "@/components/Headers/DefaultHeader";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { PropositionProps } from "@/models/propositions";
import { PoliticianProps } from "@/models/politicians";
import { PoliticalPartyProps } from "@/models/politicalParties";
import { SearchInput } from "@/components/Inputs/SerachInput";
import { styles } from "@/styles/search";
import { getPoliticalParties } from "@/services/politicalParties/getPoliticalParties";
import Toast from "react-native-root-toast";
import { getPoliticians } from "@/services/politicians/getPoliticians";
import { getPropositions } from "@/services/propositions/getPropositions";
import { PoliticalPartyCard } from "@/components/Cards/PoliticalPartyCard";
import { DefaultSeparator } from "@/components/Separators/DefaultSeparator";
import { PoliticianCard } from "@/components/Cards/PoliticianCard";
import { PropositionCard } from "@/components/Cards/PropositionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removePropositionFromFavoriteList } from "@/services/favoritePropositions/removePropositionFromFavoriteList";
import { saveFavoriteProposition } from "@/services/favoritePropositions/saveFavoriteProposition";
import { deepSearch } from "@/utils/deepSearch";
import { DefaultLoader } from "@/components/Loaders/DefaultLoader";

const placeholderOptions = {
  parties: "Buscar por partidos políticos",
  politicians: "Buscar por deputados",
  propositions: "Buscar por projetos de lei",
};

export default function Search() {
  const pageParams = useLocalSearchParams<{
    currentTab: "parties" | "politicians" | "propositions";
  }>();

  const theme = useColorScheme();
  const colors = getColors(theme || "light");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<
    "parties" | "politicians" | "propositions"
  >("parties");

  const [politicalParties, setPoliticalParties] = useState<
    PoliticalPartyProps[]
  >([]);
  const [politicians, setPoliticians] = useState<PoliticianProps[]>([]);
  const [propositions, setPropositions] = useState<PropositionProps[]>([]);
  const [favoritePropositions, setFavoritePropositions] = useState<
    PropositionProps[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const handleGetPoliticalParties = async () => {
      setLoading(true);
      const response = await getPoliticalParties();

      if (!!response.error) {
        Toast.show(response.message, { duration: Toast.durations.LONG });
      }
      setPoliticalParties(response.data.dados);
    };
    const handleGetPoliticians = async () => {
      const response = await getPoliticians({ items: 50, page: 1 });
      if (!!response.error) {
        Toast.show(response.message, { duration: Toast.durations.LONG });
      }
      setPoliticians(response.data.dados);
    };

    const handleGetPropositions = async () => {
      const response = await getPropositions();

      if (!!response.error) {
        Toast.show(response.message, { duration: Toast.durations.LONG });
      }
      setPropositions(response.data.dados);
      setLoading(false);
    };

    handleGetPoliticalParties();
    handleGetPoliticians();
    handleGetPropositions();
  }, []);

  useEffect(() => {
    setCurrentTab(pageParams.currentTab || "parties");
  }, [pageParams.currentTab]);

  useFocusEffect(
    useCallback(() => {
      const handleSetFavoritePropositions = async () => {
        const favoritePropositions = await AsyncStorage.getItem(
          "RNPropositions_favorites"
        );
        const favoritePropositionsParsed = !!favoritePropositions
          ? JSON.parse(favoritePropositions)
          : [];

        setFavoritePropositions(favoritePropositionsParsed);
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
      <View style={styles.inputWrapper}>
        <SearchInput
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          placeholder={placeholderOptions[currentTab]}
        />
        <View style={styles.filters}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  currentTab === "parties"
                    ? colors.tertiaryColor
                    : colors.background,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => setCurrentTab("parties")}>
            <Text
              style={[
                styles.filterText,
                {
                  color:
                    currentTab === "parties"
                      ? colors.white
                      : colors.tertiaryColor,
                },
              ]}>
              Partidos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  currentTab === "politicians"
                    ? colors.tertiaryColor
                    : colors.background,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => setCurrentTab("politicians")}>
            <Text
              style={[
                styles.filterText,
                {
                  color:
                    currentTab === "politicians"
                      ? colors.white
                      : colors.tertiaryColor,
                },
              ]}>
              Deputados
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  currentTab === "propositions"
                    ? colors.tertiaryColor
                    : colors.background,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => setCurrentTab("propositions")}>
            <Text
              style={[
                styles.filterText,
                {
                  color:
                    currentTab === "propositions"
                      ? colors.white
                      : colors.tertiaryColor,
                },
              ]}>
              Projetos de lei
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {currentTab === "parties" && (
        <FlatList
          style={styles.list}
          data={politicalParties.filter((politicalParty) => {
            const stringToAnalyze = `${politicalParty.id} ${politicalParty.nome} ${politicalParty.sigla} ${politicalParty.uri}`;

            return deepSearch({ searchTerm, stringToAnalyze });
          })}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PoliticalPartyCard
              acronym={item.sigla}
              partyName={item.nome}
              onPress={() =>
                router.navigate({
                  pathname: "party-details",
                  params: {
                    politicalPartyId: /\/(\d+)$/.exec(item.uri)?.[1] || "",
                  },
                })
              }
            />
          )}
          ItemSeparatorComponent={() => (
            <DefaultSeparator additionalStyles={{ width: "90%" }} />
          )}
        />
      )}
      {currentTab === "politicians" && (
        <FlatList
          style={styles.list}
          data={politicians.filter((politician) => {
            const stringToAnalyze = `${politician.id} ${politician.email} ${politician.idLegislatura} ${politician.nome} ${politician.siglaPartido} ${politician.siglaUf} ${politician.uri} ${politician.uriPartido} ${politician.urlFoto}`;

            return deepSearch({ searchTerm, stringToAnalyze });
          })}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PoliticianCard
              acronym={item.siglaPartido}
              politicianEmail={item.email}
              politicianName={item.nome}
              politicianPhotoURL={item.urlFoto}
              onPress={() =>
                router.navigate({
                  pathname: "politician-details",
                  params: {
                    politicianId: item.id?.toString(),
                  },
                })
              }
            />
          )}
          ItemSeparatorComponent={() => (
            <DefaultSeparator additionalStyles={{ width: "90%" }} />
          )}
        />
      )}
      {currentTab === "propositions" && (
        <FlatList
          style={styles.list}
          data={propositions.filter((proposition) => {
            const stringToAnalyze = `${proposition.ano} ${proposition.codTipo} ${proposition.ementa} ${proposition.id} ${proposition.numero} ${proposition.siglaTipo} ${proposition.uri}`;

            return deepSearch({ searchTerm, stringToAnalyze });
          })}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PropositionCard
              acronym={item.siglaTipo}
              documentNumber={item.numero}
              documentYear={item.ano}
              isFavorite={
                favoritePropositions.findIndex(
                  (currentProposition) => currentProposition.id === item.id
                ) !== -1
              }
              onPressFavorite={() => handleFavoriteProposition(item)}
              onPress={() =>
                router.navigate({
                  pathname: "law-project-details",
                  params: { propositionId: item.id },
                })
              }
              summary={item.ementa}
            />
          )}
          ItemSeparatorComponent={() => (
            <DefaultSeparator additionalStyles={{ width: "90%" }} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

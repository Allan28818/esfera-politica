import { FlatList, Platform, useColorScheme } from "react-native";

import { StatusBar } from "expo-status-bar";

import { PropositionCard } from "@/components/Cards/PropositionCard";
import { DefaultHeader } from "@/components/Headers/DefaultHeader";
import { SearchInput } from "@/components/Inputs/SearchInput";
import { DefaultLoader } from "@/components/Loaders/DefaultLoader";
import { SafeAreaView, Text, View, getColors } from "@/components/Themed";
import { PropositionProps } from "@/models/propositions";
import { removePropositionFromFavoriteList } from "@/services/favoritePropositions/removePropositionFromFavoriteList";
import { saveFavoriteProposition } from "@/services/favoritePropositions/saveFavoriteProposition";
import { styles } from "@/styles/projects-saved";
import { deepSearch } from "@/utils/deepSearch";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import Toast from "react-native-root-toast";

export default function ProjectsSaved() {
  const router = useRoute();

  const theme = useColorScheme();
  const colors = getColors(theme || "light");

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [favoritePropositions, setFavoritePropositions] = useState<
    PropositionProps[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);
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
      <View style={styles.inputWrapper}>
        <SearchInput
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          placeholder="Buscar projetos de lei"
        />
      </View>
      {!loading && !favoritePropositions.length ? (
        <View style={styles.noContentWrapper}>
          <View style={styles.noContentIconWrapper}>
            <Ionicons
              name="document-text-outline"
              style={[styles.noContentIcon, { color: colors.text }]}
            />
          </View>
          <Text style={styles.noDocumentTitle}>
            Ainda não há documentos salvos!
          </Text>
          <Text style={styles.noDocumentDescription}>
            Aproveite que está aqui e{" "}
            <Link
              href={{
                pathname: "search",
                params: { currentTab: "propositions" },
              }}>
              <Text style={styles.noDocumentText}>
                adicione o seu primeiro documento
              </Text>
            </Link>
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoritePropositions.filter((favoriteProposition) => {
            const stringToAnalyze = `${favoriteProposition.ano} ${favoriteProposition.codTipo} ${favoriteProposition.ementa} ${favoriteProposition.id} ${favoriteProposition.numero} ${favoriteProposition.siglaTipo} ${favoriteProposition.uri}`;

            return deepSearch({ stringToAnalyze, searchTerm });
          })}
          renderItem={({ item }) => (
            <PropositionCard
              summary={item.ementa}
              acronym={item.siglaTipo}
              documentNumber={item.numero}
              documentYear={item.ano}
              isFavorite={true}
              onPressFavorite={() => handleFavoriteProposition(item)}
              secondaryIndicator="ACESSAR"
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

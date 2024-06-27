import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import { SafeAreaView, Text, View, getColors } from "@/components/Themed";

import { PropositionCard } from "@/components/Cards/PropositionCard";
import { DefaultHeader } from "@/components/Headers/DefaultHeader";
import { PropositionProps } from "@/models/propositions";
import { getPropositions } from "@/services/propositions/getPropositions";
import { styles } from "@/styles/home";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removePropositionFromFavoriteList } from "@/services/favoritePropositions/removePropositionFromFavoriteList";
import Toast from "react-native-root-toast";
import { saveFavoriteProposition } from "@/services/favoritePropositions/saveFavoriteProposition";

export default function Home() {
  const router = useRouter();

  const theme = useColorScheme();
  const colors = getColors(theme || "light");

  const [propositions, setPropositions] = useState<PropositionProps[]>([]);
  const [favoritePropositions, setFavoritePropositions] = useState<
    PropositionProps[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleGetPropositions = async () => {
      setLoading(true);
      const propositionsResponse = await getPropositions();

      setPropositions(propositionsResponse.data.dados);
      setLoading(false);
    };

    const handleSetFavoritePropositions = async () => {
      const favoritePropositions = await AsyncStorage.getItem(
        "RNPropositions_favorites"
      );
      const favoritePropositionsParsed = !!favoritePropositions
        ? JSON.parse(favoritePropositions)
        : [];

      setFavoritePropositions(favoritePropositionsParsed);
    };
    handleGetPropositions();
    handleSetFavoritePropositions();
  }, []);

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
    return <ActivityIndicator color={colors.primaryColor} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.primaryColor}
        style={Platform.OS === "ios" ? "light" : "auto"}
      />
      <DefaultHeader />

      <TouchableOpacity activeOpacity={0.7} style={styles.sectionButton}>
        <Text style={styles.sectionButtonText}>Projetos de lei</Text>
      </TouchableOpacity>

      <FlatList
        style={styles.propositionsList}
        data={propositions}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
            onPressFavorite={() => handleFavoriteProposition(proposition.item)}
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
    </SafeAreaView>
  );
}

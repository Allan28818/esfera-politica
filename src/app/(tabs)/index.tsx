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

export default function Home() {
  const router = useRouter();

  const theme = useColorScheme();
  const colors = getColors(theme || "light");

  const [propositions, setPropositions] = useState<PropositionProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleGetPropositions = async () => {
      setLoading(true);
      const propositionsResponse = await getPropositions();

      setPropositions(propositionsResponse.data.dados);
      setLoading(false);
    };
    handleGetPropositions();
  }, []);

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
            onPress={() => {
              router.navigate("law-project-details");
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}

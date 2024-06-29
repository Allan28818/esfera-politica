import { Image, Platform, FlatList, useColorScheme } from "react-native";

import { SafeAreaView, Text, View, getColors } from "@/components/Themed";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styles } from "@/styles/party-details";
import { HeaderWithGoBack } from "@/components/Headers/HeaderWithGoBack";
import { useEffect, useState } from "react";
import { DetailedPoliticalPartyProps } from "@/models/politicalParties";
import { getPoliticalParty } from "@/services/politicalParties/getPoliticalParty";
import Toast from "react-native-root-toast";
import { DefaultLoader } from "@/components/Loaders/DefaultLoader";
import { DefaultSeparator } from "@/components/Separators/DefaultSeparator";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { PoliticianCard } from "@/components/Cards/PoliticianCard";
import { DetailedPoliticianProps, PoliticianProps } from "@/models/politicians";
import { getPoliticalPartyMembers } from "@/services/politicalParties/getPoliticalPartyMembers";
import { SuggestedPoliticianCard } from "@/components/Cards/SuggestedPoliticianCard";
import Colors from "@/constants/Colors";
import { getPolitician } from "@/services/politicians/getPolitician";

export default function PartyDetails() {
  const pageParams = useLocalSearchParams();
  const router = useRouter();

  const [pagePoliticalParty, setPagePoliticalParty] =
    useState<DetailedPoliticalPartyProps>();

  const [partyMembers, setPartyMembers] = useState<PoliticianProps[]>([]);

  const [partyLeader, setPartyLeader] = useState<DetailedPoliticianProps>();

  const [loading, setLoading] = useState<boolean>(false);

  const theme = useColorScheme();
  const colors = getColors(theme || "light");

  useEffect(() => {
    const handleConfigPage = async () => {
      setLoading(true);
      const politicalPartyResponse = await getPoliticalParty(
        pageParams.politicalPartyId?.toString() || ""
      );

      const politicalPartyMembersResponse = await getPoliticalPartyMembers(
        pageParams.politicalPartyId?.toString() || ""
      );

      const politicianResponse = await getPolitician(
        /\/(\d+)$/.exec(
          politicalPartyResponse?.data?.dados.status.lider.uri || ""
        )?.[1] || ""
      );

      if (!!politicalPartyResponse.error) {
        Toast.show(politicalPartyResponse.message, {
          duration: Toast.durations.LONG,
        });
      }

      if (!!politicianResponse.error) {
        Toast.show(politicianResponse.message, {
          duration: Toast.durations.LONG,
        });
      }

      if (!!politicalPartyMembersResponse.error) {
        Toast.show(politicalPartyMembersResponse.message, {
          duration: Toast.durations.LONG,
        });
      }

      setPagePoliticalParty(politicalPartyResponse.data.dados);
      setPartyMembers(politicalPartyMembersResponse.data.dados);
      setPartyLeader(politicianResponse.data.dados);
      setLoading(false);
    };

    handleConfigPage();
  }, []);

  if (loading) {
    return <DefaultLoader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.primaryColor}
        style={Platform.OS === "ios" ? "light" : "auto"}
      />
      <HeaderWithGoBack onPress={() => router.back()} />
      <View style={styles.partyInfoWrapper}>
        <Image
          source={{ uri: pagePoliticalParty?.urlLogo }}
          alt={pagePoliticalParty?.nome}
          style={styles.partyImage}
        />
        <View>
          <View style={styles.partyNameWrapper}>
            <Text style={[styles.partyTitle, { color: colors.textSecondary }]}>
              {pagePoliticalParty?.nome}
            </Text>
            <View
              style={[styles.circle, { backgroundColor: colors.textSecondary }]}
            />
            <Text style={[styles.partyTitle, { color: colors.textSecondary }]}>
              {pagePoliticalParty?.sigla}
            </Text>
          </View>
          <View
            style={[
              styles.statusWrapper,
              {
                backgroundColor:
                  pagePoliticalParty?.status.situacao === "Ativo"
                    ? colors.primaryColor
                    : colors.red,
              },
            ]}>
            <Text style={styles.status}>
              Situação: {pagePoliticalParty?.status.situacao}
            </Text>
          </View>
        </View>
      </View>
      <DefaultSeparator />
      <View style={styles.politicalPartyDetails}>
        <View style={styles.topic}>
          <View style={styles.iconWrapper}>
            <FontAwesome6
              name="people-line"
              style={[styles.topicIcon, { color: Colors.light.text }]}
            />
          </View>
          <Text style={styles.topicField}>Membros:</Text>
          <Text style={styles.topicValue}>
            {pagePoliticalParty?.status.totalMembros}
          </Text>
        </View>
        <View style={styles.topic}>
          <View style={styles.iconWrapper}>
            <FontAwesome
              name="trophy"
              style={[styles.topicIcon, { color: Colors.light.text }]}
            />
          </View>
          <Text style={styles.topicField}>Total de posses:</Text>
          <Text style={styles.topicValue}>
            {pagePoliticalParty?.status.totalPosse}
          </Text>
        </View>
      </View>
      <DefaultSeparator />
      <View style={styles.leaderContainer}>
        <View>
          <Text style={styles.leaderTitle}>Líder</Text>
        </View>
        <PoliticianCard
          acronym={partyLeader?.ultimoStatus?.siglaUf || ""}
          politicianName={partyLeader?.ultimoStatus?.nomeEleitoral || ""}
          politicianEmail={partyLeader?.ultimoStatus?.email || ""}
          politicianPhotoURL={partyLeader?.ultimoStatus?.urlFoto || ""}
          onPress={() =>
            router.navigate({
              pathname: "politician-details",
              params: {
                politicianId: partyLeader?.id || "",
              },
            })
          }
        />
      </View>
      <DefaultSeparator />

      <Text style={styles.membersTitle}>Membros</Text>
      <FlatList
        style={styles.membersList}
        data={partyMembers}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <SuggestedPoliticianCard
              cityAcronym={item.siglaUf}
              partyAcronym={item.siglaPartido}
              politicianEmail={item.email}
              politicianName={item.nome}
              politicianPhotoURL={item.urlFoto}
            />
          );
        }}
        numColumns={2}
      />
    </SafeAreaView>
  );
}

import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  useColorScheme,
} from "react-native";

import { SafeAreaView, Text, View, getColors } from "@/components/Themed";
import { StatusBar } from "expo-status-bar";

import { styles } from "@/styles/politician-details";
import { HeaderWithGoBack } from "@/components/Headers/HeaderWithGoBack";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { DetailedPoliticianProps, PoliticianProps } from "@/models/politicians";
import { DefaultLoader } from "@/components/Loaders/DefaultLoader";
import { getPolitician } from "@/services/politicians/getPolitician";
import Toast from "react-native-root-toast";
import { getPoliticalPartyMembers } from "@/services/politicalParties/getPoliticalPartyMembers";
import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import { DefaultSeparator } from "@/components/Separators/DefaultSeparator";
import { differenceInYears, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { SuggestedPoliticianCard } from "@/components/Cards/SuggestedPoliticianCard";
import Colors from "@/constants/Colors";

export default function PoliticianDetails() {
  const router = useRouter();
  const pageParams = useLocalSearchParams();

  const [pagePoliticianId, setPagePoliticianId] = useState<string>(
    pageParams.politicianId?.toString() || ""
  );

  const [pagePolitician, setPagePolitician] =
    useState<DetailedPoliticianProps>();
  const [members, setMembers] = useState<PoliticianProps[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const theme = useColorScheme();
  const colors = getColors(theme || "light");

  useEffect(() => {
    const handleConfigPage = async () => {
      setLoading(true);
      const politicianResponse = await getPolitician(pagePoliticianId);

      const partyMembersResponse = await getPoliticalPartyMembers(
        /\/(\d+)$/.exec(
          politicianResponse.data.dados?.ultimoStatus?.uriPartido || ""
        )?.[1] || ""
      );

      if (!!politicianResponse.error) {
        Toast.show(politicianResponse.message, {
          duration: Toast.durations.LONG,
        });
      }

      if (!!partyMembersResponse.error) {
        Toast.show(partyMembersResponse.message, {
          duration: Toast.durations.LONG,
        });
      }
      setPagePolitician(politicianResponse.data.dados);
      setMembers(partyMembersResponse.data.dados);
      setLoading(false);
    };

    handleConfigPage();
  }, [pagePoliticianId]);

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
      <View style={styles.politicianInfoWrapper}>
        <Image
          source={{ uri: pagePolitician?.ultimoStatus.urlFoto }}
          alt={pagePolitician?.ultimoStatus?.nomeEleitoral}
          style={styles.politicianPhoto}
        />
        <View style={styles.politicianInfosWrapper}>
          <Text style={styles.politicianName}>{pagePolitician?.nomeCivil}</Text>
          <Text
            style={[
              styles.politicianOfficialName,
              { color: colors.textSecondary },
            ]}>
            Nome eleitoral: {pagePolitician?.ultimoStatus.nomeEleitoral}
          </Text>

          <View style={styles.additionalInfosWrapper}>
            <View style={styles.additionalInfoWrapper}>
              <FontAwesome
                name="building-o"
                style={[styles.additionalInfoIcon, { color: colors.text }]}
              />
              <Text style={styles.additionalInfoText}>
                {pagePolitician?.ultimoStatus.siglaPartido}
              </Text>
            </View>
            <View style={styles.additionalInfoWrapper}>
              <FontAwesome6
                name="location-dot"
                style={[styles.additionalInfoIcon, { color: colors.text }]}
              />
              <Text style={styles.additionalInfoText}>
                {pagePolitician?.ultimoStatus.siglaUf}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <DefaultSeparator />
      <View style={styles.politicianDetails}>
        <View style={styles.politicianDetailTopic}>
          <View style={styles.iconWrapper}>
            <Ionicons
              name="mail"
              style={[styles.detailTopicIcon, { color: Colors.light.text }]}
            />
          </View>
          <Text style={styles.detailTopicField}>Email:</Text>
          <Text style={styles.detailTopicValue}>
            {pagePolitician?.ultimoStatus.email}
          </Text>
        </View>
        <View style={styles.politicianDetailTopic}>
          <View style={styles.iconWrapper}>
            <FontAwesome5
              name="phone-alt"
              style={[styles.detailTopicIcon, { color: Colors.light.text }]}
            />
          </View>
          <Text style={styles.detailTopicField}>Telefone:</Text>
          <Text style={styles.detailTopicValue}>
            {pagePolitician?.ultimoStatus.gabinete.telefone}
          </Text>
        </View>
        <View style={styles.politicianDetailTopic}>
          <View style={styles.iconWrapper}>
            {pagePolitician?.sexo === "M" ? (
              <Ionicons
                name="male-sharp"
                style={[styles.detailTopicIcon, { color: Colors.light.text }]}
              />
            ) : (
              <Ionicons
                name="female-sharp"
                style={[styles.detailTopicIcon, { color: Colors.light.text }]}
              />
            )}
          </View>
          <Text style={styles.detailTopicField}>Sexo:</Text>
          <Text style={styles.detailTopicValue}>
            {pagePolitician?.sexo === "M" ? "Masculino" : "Feminino"}
          </Text>
        </View>
        <View style={styles.politicianDetailTopic}>
          <View style={styles.iconWrapper}>
            <Ionicons
              name="calendar-number-outline"
              style={[styles.detailTopicIcon, { color: Colors.light.text }]}
            />
          </View>
          <Text style={styles.detailTopicField}>Data de nascimento:</Text>
          <Text style={styles.detailTopicValue}>
            {!!Date.parse(pagePolitician?.dataNascimento || "") &&
              format(
                new Date(pagePolitician?.dataNascimento || ""),
                "d 'de' MMMM 'de' yyyy",
                { locale: ptBR }
              )}{" "}
            {!!Date.parse(pagePolitician?.dataNascimento || "") &&
              differenceInYears(
                new Date(),
                new Date(pagePolitician?.dataNascimento || "")
              )}{" "}
            anos
          </Text>
        </View>
        <View style={styles.politicianDetailTopic}>
          <View style={styles.iconWrapper}>
            <Ionicons
              name="school-sharp"
              style={[styles.detailTopicIcon, { color: Colors.light.text }]}
            />
          </View>
          <Text style={styles.detailTopicField}>Escolaridade:</Text>
          <Text style={styles.detailTopicValue}>
            {pagePolitician?.escolaridade}
          </Text>
        </View>
      </View>
      <DefaultSeparator />
      <Text style={[styles.suggestionsTitle, { color: colors.textSecondary }]}>
        Sugestões
      </Text>
      <FlatList
        style={styles.listStyle}
        data={members}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SuggestedPoliticianCard
            cityAcronym={item.siglaUf}
            partyAcronym={item.siglaUf}
            politicianEmail={item.email}
            politicianName={item.nome}
            politicianPhotoURL={item.urlFoto}
            onPress={() => setPagePoliticianId(item?.id?.toString())}
          />
        )}
      />
    </SafeAreaView>
  );
}

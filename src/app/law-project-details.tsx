import {
  Linking,
  Platform,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  View as DefaultView,
  FlatList,
} from "react-native";

import { HeaderWithGoBack } from "@/components/Headers/HeaderWithGoBack";
import { DefaultLoader } from "@/components/Loaders/DefaultLoader";
import { SafeAreaView, Text, View, getColors } from "@/components/Themed";
import {
  DetailedPropositionProps,
  PropositionAuthor,
  PropositionProps,
  PropositionWithVotingProps,
} from "@/models/propositions";
import { getProposition } from "@/services/propositions/getProposition";
import { styles } from "@/styles/law-project-details";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Toast from "react-native-root-toast";
import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getPropositionAuthors } from "@/services/propositions/getPropositionAuthors";
import { DefaultSeparator } from "@/components/Separators/DefaultSeparator";
import { DefaultButton } from "@/components/Buttons/DefaultButton";
import { getPropositionVotes } from "@/services/propositions/getPropositionVotes";
import { getRelatedPropositions } from "@/services/propositions/getRelatedPropositions";
import { PropositionCard } from "@/components/Cards/PropositionCard";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removePropositionFromFavoriteList } from "@/services/favoritePropositions/removePropositionFromFavoriteList";
import { saveFavoriteProposition } from "@/services/favoritePropositions/saveFavoriteProposition";

export default function LawProjectDetails() {
  const pageParams = useLocalSearchParams();
  const router = useRouter();

  const [propositionPageId, setPropositionPageId] = useState<string>(
    pageParams.propositionId?.toString() || ""
  );

  const [pageProposition, setPageProposition] =
    useState<DetailedPropositionProps>();
  const [propositionAuthors, setPropositionAuthors] = useState<
    PropositionAuthor[]
  >([]);
  const [propositionVotes, setPropositionVotes] = useState<
    PropositionWithVotingProps[]
  >([]);

  const [relatedPropositions, setRelatedPropositions] = useState<
    PropositionProps[]
  >([]);

  const [favoritePropositions, setFavoritePropositions] = useState<
    PropositionProps[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [showPropositionVotes, setShowPropositionVotes] =
    useState<boolean>(false);

  const theme = useColorScheme();
  const colors = getColors(theme || "light");

  useEffect(() => {
    const handleGetPageProposition = async () => {
      setLoading(true);
      const response = await getProposition(propositionPageId);

      if (!!response.error) {
        Toast.show(response.message, { duration: Toast.durations.LONG });
      }
      setPageProposition(response.data.dados);
    };

    const handleGetPropositionAuthors = async () => {
      const response = await getPropositionAuthors(
        pageParams.propositionId?.toString() || ""
      );

      if (!!response.error) {
        Toast.show(response.message, { duration: Toast.durations.LONG });
      }
      setPropositionAuthors(response.data.dados);
    };

    const handleGetPropositionVotes = async () => {
      const response = await getPropositionVotes(
        pageParams.propositionId?.toString() || ""
      );

      if (!!response.error) {
        Toast.show(response.message, { duration: Toast.durations.LONG });
      }
      setPropositionVotes(response.data.dados);
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

    const handleGetRelatedPropositions = async () => {
      const response = await getRelatedPropositions(
        pageParams.propositionId?.toString() || ""
      );

      if (!!response.error) {
        Toast.show(response.message, { duration: Toast.durations.LONG });
      }
      setRelatedPropositions(response.data.dados);
      setLoading(false);
    };

    handleGetPageProposition();
    handleGetPropositionAuthors();
    handleGetPropositionVotes();
    handleSetFavoritePropositions();
    handleGetRelatedPropositions();
  }, [propositionPageId]);

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

  if (!pageParams.propositionId) {
    Toast.show("Proposição não encontrada!", {
      duration: Toast.durations.LONG,
    });
    router.replace("+not-found");
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
      <HeaderWithGoBack onPress={() => router.back()} />
      <ScrollView>
        <View
          darkColor={colors.foreground}
          lightColor={colors.foreground}
          style={styles.summaryWrapper}>
          <View
            style={styles.summaryHeader}
            darkColor={colors.foreground}
            lightColor={colors.foreground}>
            <Text
              darkColor={colors.textSecondary}
              lightColor={colors.textSecondary}
              style={styles.titleOfSummarySection}>
              Ementa
            </Text>
            <View
              style={styles.propositionTypeWrapper}
              darkColor={colors.tertiaryColor}
              lightColor={colors.secondaryColor}>
              <Text
                darkColor={colors.textSecondary}
                lightColor={colors.textSecondary}
                style={styles.propositionTypeText}>
                {pageProposition?.descricaoTipo}
              </Text>
            </View>
          </View>
          <Text style={styles.summaryText}>{pageProposition?.ementa}</Text>
        </View>
        <DefaultSeparator />
        <View style={styles.propositionDetails}>
          {typeof pageProposition?.dataApresentacao === "string" && (
            <View style={styles.propositionTopic}>
              <View style={styles.propositionIconWrapper}>
                <Ionicons
                  name="calendar-number-outline"
                  style={styles.propositionIcon}
                />
              </View>
              <View style={styles.topicTextWrapper}>
                <Text style={styles.topicField}>
                  Data de apresentação:{" "}
                  <Text style={styles.topicValue}>
                    {format(
                      new Date(pageProposition?.dataApresentacao),
                      "d 'de' MMMM 'de' yyyy",
                      { locale: ptBR }
                    )}
                  </Text>
                </Text>
              </View>
            </View>
          )}
          <View style={styles.propositionTopic}>
            <View style={styles.propositionIconWrapper}>
              <Ionicons name="document-text" style={styles.propositionIcon} />
            </View>
            <View style={styles.topicTextWrapper}>
              <Text style={styles.topicField}>
                Descrição tramitação:{" "}
                <Text style={styles.topicValue}>
                  {pageProposition?.statusProposicao.descricaoSituacao}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.propositionTopic}>
            <View style={styles.propositionIconWrapper}>
              <FontAwesome5 name="border-all" style={styles.propositionIcon} />
            </View>
            <View style={styles.topicTextWrapper}>
              <Text style={styles.topicField}>
                Regime:{" "}
                <Text style={styles.topicValue}>
                  {pageProposition?.statusProposicao.regime}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.propositionTopic}>
            <View style={styles.propositionIconWrapper}>
              <Ionicons name="document-text" style={styles.propositionIcon} />
            </View>
            <View style={styles.topicTextWrapper}>
              <Text style={styles.topicField}>
                Descrição da situação:{" "}
                <Text style={styles.topicValue}>
                  {pageProposition?.statusProposicao.descricaoSituacao}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.propositionTopic}>
            <View style={styles.propositionIconWrapper}>
              <Feather name="layers" style={styles.propositionIcon} />
            </View>
            <View style={styles.topicTextWrapper}>
              <Text style={styles.topicField}>
                Âmbito:{" "}
                <Text style={styles.topicValue}>
                  {pageProposition?.statusProposicao.ambito}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.propositionTopic}>
            <View style={styles.propositionIconWrapper}>
              <Ionicons name="create" style={styles.propositionIcon} />
            </View>
            <View style={styles.topicTextWrapper}>
              <Text style={styles.topicField}>
                Autores:{" "}
                {propositionAuthors.map((author) => (
                  <Text
                    key={`${author.codTipo}_${author.uri}`}
                    style={[
                      styles.topicValue,
                      { textDecorationLine: "underline" },
                    ]}>
                    <Link
                      href={{
                        pathname: "politician-details",
                        params: {
                          politicianId: /\/(\d+)$/.exec(author.uri)?.[1] || "",
                        },
                      }}>
                      {author.nome}
                    </Link>
                  </Text>
                ))}
              </Text>
            </View>
          </View>
        </View>
        <DefaultSeparator />
        <View
          style={styles.dispatchWrapper}
          darkColor={colors.foreground}
          lightColor={colors.foreground}>
          <Text
            style={styles.dispatchTitle}
            darkColor={colors.textSecondary}
            lightColor={colors.textSecondary}>
            Despacho
          </Text>
          <Text style={styles.dispatchText}>
            {pageProposition?.statusProposicao.despacho}
          </Text>
        </View>
        <View style={styles.buttonsWrapper}>
          {!!pageProposition?.statusProposicao.url && (
            <DefaultButton
              buttonText="Acessar documento"
              onPress={() => {
                Linking.openURL(pageProposition?.statusProposicao.url);
              }}
              additionalStyles={styles.docButton}
              textUnerline
            />
          )}
          {pageProposition?.urlInteiroTeor && (
            <DefaultButton
              buttonText="Acessar na íntegra"
              onPress={() => {
                Linking.openURL(pageProposition?.urlInteiroTeor);
              }}
              additionalStyles={styles.fullDocButton}
              textUnerline
            />
          )}
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.votesButton,
            {
              backgroundColor: colors.foreground,
              marginBottom: showPropositionVotes ? 0 : 43,
            },
          ]}
          onPress={() => setShowPropositionVotes(!showPropositionVotes)}>
          <DefaultView>
            <DefaultView style={styles.voteTitleWrapper}>
              <Text
                style={styles.voteButtonTitle}
                darkColor={colors.textSecondary}
                lightColor={colors.textSecondary}>
                Votação
              </Text>
              <FontAwesome5
                name="vote-yea"
                style={[
                  styles.voteIcon,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              />
            </DefaultView>
            <Text style={styles.votesAmount}>{`${propositionVotes.length} voto${
              propositionVotes.length !== 1 && "s"
            }`}</Text>
          </DefaultView>
          <MaterialIcons
            name="keyboard-arrow-down"
            style={[
              styles.voteButtonArrow,
              {
                color: colors.text,
                transform: showPropositionVotes
                  ? "rotateX(180deg)"
                  : "rotateX(0deg)",
              },
            ]}
          />
        </TouchableOpacity>
        {showPropositionVotes && (
          <View
            style={[
              styles.votesList,
              {
                borderColor: colors.foreground,
                marginBottom: showPropositionVotes ? 43 : 0,
              },
            ]}>
            {propositionVotes.map((propositionVote) => (
              <DefaultView style={styles.voteWrapper}>
                <DefaultView style={styles.voteWrapperHeader}>
                  <Text
                    style={styles.agencyName}
                    darkColor={colors.textSecondary}
                    lightColor={colors.textSecondary}>
                    {propositionVote.siglaOrgao}
                  </Text>
                  <View
                    style={[
                      styles.isApproved,
                      {
                        backgroundColor:
                          propositionVote.aprovacao === 1
                            ? colors.primaryColor
                            : colors.red,
                      },
                    ]}>
                    <Text
                      style={styles.isApprovedText}
                      darkColor={colors.textSecondary}
                      lightColor={colors.textSecondary}>
                      {propositionVote.aprovacao === 1
                        ? "Aprovado"
                        : "Reprovado"}
                    </Text>
                    {propositionVote.aprovacao === 1 ? (
                      <FontAwesome5
                        name="check"
                        style={[
                          styles.isApprovedCheckIcon,
                          { color: colors.textSecondary },
                        ]}
                      />
                    ) : (
                      <Ionicons
                        name="close"
                        style={[
                          styles.isApprovedXIcon,
                          { color: colors.textSecondary },
                        ]}
                      />
                    )}
                  </View>
                </DefaultView>
                <Text style={styles.voteDescription}>
                  {propositionVote.descricao}
                </Text>
              </DefaultView>
            ))}
          </View>
        )}
        <View>
          <Text style={styles.relatedProjectsTitle}>Projetos relacionados</Text>
          {relatedPropositions.map((proposition) => (
            <React.Fragment key={proposition.id}>
              <PropositionCard
                acronym={proposition.siglaTipo}
                documentNumber={proposition.numero}
                documentYear={proposition.ano}
                isFavorite={
                  favoritePropositions.findIndex(
                    (currentProposition) =>
                      currentProposition.id === proposition.id
                  ) !== -1
                }
                onPressFavorite={() => handleFavoriteProposition(proposition)}
                summary={proposition.ementa}
                style={{ width: "100%" }}
                onPress={() => setPropositionPageId(proposition.id.toString())}
              />
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

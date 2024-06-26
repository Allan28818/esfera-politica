interface PropositionProps {
  id: number;
  uri: string;
  siglaTipo: string;
  codTipo: number | string;
  numero: number | string;
  ano: number | string;
  ementa: string;
}

interface PropositionWithVotingProps {
  id: string;
  uri: string;
  data: string;
  dataHoraRegistro: string;
  siglaOrgao: string;
  uriOrgao: string;
  uriEvento: string;
  proposicaoObjeto: string | null;
  uriProposicaoObjeto: string | null;
  descricao: string;
  aprovacao: number;
}

interface PropositionAuthor {
  uri: string;
  nome: string;
  codTipo: number;
  tipo: string;
  ordemAssinatura: number;
  proponente: number;
}

interface DetailedPropositionProps extends PropositionProps {
  dataApresentacao: string;
  uriOrgaoNumerador: string;
  statusProposicao: {
    dataHora: string;
    sequencia: number;
    siglaOrgao: string;
    uriOrgao: string;
    uriUltimoRelator: string;
    regime: string;
    descricaoTramitacao: string;
    codTipoTramitacao: string;
    descricaoSituacao: string;
    codSituacao: number;
    despacho: string;
    url: string;
    ambito: string;
    apreciacao: string;
  };
  uriAutores: string;
  descricaoTipo: string;
  ementaDetalhada: string;
  keywords: string;
  uriPropPrincipal: string | null;
  uriPropAnterior: string | null;
  uriPropPosterior: string | null;
  urlInteiroTeor: string;
  urnFinal: string | null;
  texto: string | null;
  justificativa: string | null;
}

export {
  PropositionProps,
  DetailedPropositionProps,
  PropositionWithVotingProps,
  PropositionAuthor,
};

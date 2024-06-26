interface PoliticalPartyProps {
  id: number;
  sigla: string;
  nome: string;
  uri: string;
}

interface DetailedPoliticalPartyProps extends PoliticalPartyProps {
  status: {
    data: string;
    idLegislatura: string;
    situacao: string;
    totalPosse: string;
    totalMembros: string;
    uriMembros: string;
    lider: {
      uri: string;
      nome: string;
      siglaPartido: string;
      uriPartido: string;
      uf: string;
      idLegislatura: number;
      urlFoto: string;
    };
  };
  numeroEleitoral: string | null;
  urlLogo: string;
  urlWebSite: string | null;
  urlFacebook: string | null;
}

export { PoliticalPartyProps, DetailedPoliticalPartyProps };

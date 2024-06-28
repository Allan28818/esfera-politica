interface DeepSearchProps {
  searchTerm: string;
  stringToAnalyze: string;
}

function deepSearch(props: DeepSearchProps): boolean {
  const { searchTerm, stringToAnalyze } = props;

  const treatedSearchTerm = searchTerm
    .toLowerCase()
    .trim()
    .replaceAll(",", "")
    .replaceAll(".", "");
  const treatedStringToAnalyze = stringToAnalyze
    .toLowerCase()
    .trim()
    .replaceAll(",", "")
    .replaceAll(".", "");

  const searchTermInArray = treatedSearchTerm.split(" ");

  return searchTermInArray.every((searchTerm) => {
    return treatedStringToAnalyze.includes(searchTerm.trim());
  });
}

export { deepSearch };

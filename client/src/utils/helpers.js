const partition = (results, query) => {
  if (query === "") {
    return;
  }
  const titleExact = [];
  const summaryExact = [];
  const labelExact = [];

  results.forEach((item) => {
    const { title, summary, labels } = item;
    const isTitleExactMatch = title.toLowerCase() === query.toLowerCase();
    const isSummaryExactMatch = summary.toLowerCase() === query.toLowerCase();
    const matchingLabels = labels.filter((label) => label.toLowerCase() === query.toLowerCase());

    if (isTitleExactMatch) {
      titleExact.push(item);
    } else if (isSummaryExactMatch) {
      summaryExact.push(item);
    } else if (matchingLabels.length > 0) {
      labelExact.push({ item, matchingLabels });
    }
  });

  return [...titleExact, ...summaryExact, ...labelExact.map((entry) => entry.item)];
}

const checkArrayForImage = (arr) => {
  const hasImage = arr.filter((item) => item.image);
  const noImage = arr.filter((item) => !item.image);
  setHasImage(hasImage);
  setNoImage(noImage);
  console.log("hasImage", hasImage);
  console.log("noImage", noImage);
}

export { partition, checkArrayForImage };
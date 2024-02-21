import { createClient } from "@sanity/client";
const SANITY_API_TOKEN = "sknYR53pYso8HNnC6DGdqIRNPsWPoA5ZqKNaQSoFqq7mvdTA8b4Z9dLCyv4kaYZXpyeA0Tgr6mdd0Rd90F7NZnTmG2uDxPOMOQRJw9lDrVrvTlJXJIJ1uNQTh0bXh0uv0bKWcNVmhRbwFInkarlYjpAvNsoV9ht1Ojtz2EUcwmCWh7Fl6ydC"

// nltk stopwords list
const STOPWORDS = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now']

const config = {
  projectId: "0unlbb72",
  dataset: "dev",
  apiVersion: "2024-02-19",
  token: SANITY_API_TOKEN,
  useCdn: false,
};

const client = createClient(config);

const getOneTest = async (req, res) => {
  try {
    await client.fetch(`*[_id == "c5a18888-3af3-4d8a-8d0e-555241895f90"]`).then((data) => {
      console.log(data[0]);
      res.json(data[0]);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    await client.fetch(`*[_id == "${id}" && developing == false]{
      _id,
      title,
      summary,
      "labels": labels[].value,
      "image": sharingImage19_5x9Url
    }`).then((data) => {
      console.log(data[0]);
      res.json(data[0]);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

const getAllTiles = async (req, res) => {
  try {
    await client.fetch(`*[_type == "tile"]`).then((data) => {
      console.log(data.length);
      res.json(data.length);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

const getStrictestMatches = async (req, res) => {
  try {
    const { queryString } = req.params;
    const keywords = queryString.split(" ").filter(word => !STOPWORDS.includes(word.toLowerCase()));

    const titleFilters = keywords.map(keyword => `title match "${keyword}*"`).join(" || ");
    const labelFilters = keywords.map(keyword => `labels[].value match "${keyword}"`).join(" || ");
    const labelRelaxedFilters = keywords.map(keyword => `labels[].value match "${keyword}*"`).join(" || ");
    const summaryFilters = keywords.map(keyword => `summary match "*${keyword}*"`).join(" || ");

    const query =
      `*[(_type == "tile" &&
      !(summary match "lorem*") &&
      developing == false &&
      !(_id in path("drafts.**")) &&
      status == "published") &&
      ((
        (${labelFilters}) && ((${titleFilters}) || (${summaryFilters}))
      ) ||
      (
        (${titleFilters}) && (${labelRelaxedFilters}) && (${summaryFilters})
      ))]
      {
        _id,
        title,
        summary,
        "labels": labels[].value,
        "image": sharingImage19_5x9Url
      }`;
    const data = await client.fetch(query);
    console.log(data.map(tile => tile.title));
    console.log(data.length);
    console.log(query);
    res.json(data);
  }
  catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

const getStrictImageMatches = async (req, res) => {
  try {
    const { queryString } = req.params;
    const keywords = queryString.split(" ").filter(word => !STOPWORDS.includes(word.toLowerCase()));

    const titleFilters = keywords.map(keyword => `title match "${keyword}*"`).join(" || ");
    const labelFilters = keywords.map(keyword => `labels[].value match "${keyword}"`).join(" || ");
    const labelRelaxedFilters = keywords.map(keyword => `labels[].value match "${keyword}*"`).join(" || ");
    const summaryFilters = keywords.map(keyword => `summary match "*${keyword}*"`).join(" || ");

    const query =
      `*[(_type == "tile" &&
      !(summary match "lorem*") &&
      developing == false &&
      !(_id in path("drafts.**")) &&
      status == "published" &&
      sharingImage19_5x9Url != null) &&
      ((
        (${labelFilters}) || ((${titleFilters}) || (${summaryFilters}))
      ) ||
      (
        (${titleFilters}) && (${labelRelaxedFilters}) && (${summaryFilters})
      ))]
      {
        _id,
        title,
        summary,
        "labels": labels[].value,
        "image": sharingImage19_5x9Url
      }`;
    const data = await client.fetch(query);
    console.log(data.map(tile => tile.title));
    console.log(data.length);
    console.log(query);
    res.json(data);
  }
  catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

const getFromQuery = async (req, res) => {
  try {
    const { queryString } = req.params;
    console.log(queryString);
    const keywords = queryString.split(" ").filter(word => !STOPWORDS.includes(word.toLowerCase()));

    const filters = keywords.map(keyword => `(title match "${keyword}*"  
      || labels[].value match "${keyword}*")`).join(" || ");

    const query = `
      *[_type == "tile" &&
      !(summary match "lorem*") &&
      developing == false &&
      !(_id in path("drafts.*")) &&
      status == "published" &&
      (${filters})]
      {
        _id,
        title,
        summary,
        "labels": labels[].value,
        "image": sharingImage19_5x9Url
      }`;

    const data = await client.fetch(query);
    console.log(data.map(tile => tile.title));
    console.log(data.length);
    console.log(query);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export { client, getOneTest, getById, getAllTiles, getStrictestMatches, getStrictImageMatches, getFromQuery };
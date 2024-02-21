import { createClient } from "@sanity/client";
const SANITY_API_TOKEN = "sknYR53pYso8HNnC6DGdqIRNPsWPoA5ZqKNaQSoFqq7mvdTA8b4Z9dLCyv4kaYZXpyeA0Tgr6mdd0Rd90F7NZnTmG2uDxPOMOQRJw9lDrVrvTlJXJIJ1uNQTh0bXh0uv0bKWcNVmhRbwFInkarlYjpAvNsoV9ht1Ojtz2EUcwmCWh7Fl6ydC"

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
    res.status(500).json({ message: 'There was an error' });
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

const getBySearchTerm = async (req, res) => {
  try {
    const { searchText } = req.params;
    const query =
      `*[
        _type == "tile" &&
        !summary match "lorem*" &&
        devloping == false &&
        !(_id in path("drafts.*")) &&
        status == "published" &&
        (title match "${searchText}*" || labels[].value match "${searchText}")
      ]{
        _id,
        title,
        summary,
        "labels": labels[].value,
        "image": sharingImage19_5x9Url
      }`;
    await client.fetch(query).then((data) => {
      console.log(data);
      res.json(data);
    });
  }
  catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

const getByAbstractSearchTerm = async (req, res) => {
  try {
    const { searchText } = req.params;
    const keywords = searchText.split(" ");

    const filters = keywords.map(keyword => `(title match "${keyword}*"  || labels[].value match "${keyword}")`).join(" || ");

    console.log('Filters:', filters);

    const query = `*[_type == "tile" && !summary match "lorem*" &&  developing == false &&  (${filters})]`;

    const data = await client.fetch(query);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}


console.log('Sanity client created')

export { client, getOneTest, getById, getAllTiles, getBySearchTerm, getByAbstractSearchTerm };
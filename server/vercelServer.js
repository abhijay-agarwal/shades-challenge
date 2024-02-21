import { kv } from "@vercel/kv";

const setLiked = async (req, res) => {
  const id = req.params.id;
  console.log('THIS IS THE ID', id);

  try {
    await kv.set(id, false).then((data) => {
      console.log(data);
      res.json(data);
    });
  } catch (error) {
    res.json(error);
  }
}

const getLiked = async (req, res) => {
  const id = req.params.id;
  try {
    await kv.get(id).then((data) => {
      console.log(data);
      res.json(data);
    });
  } catch (error) {
    res.json(error.message);
  }
}

export { setLiked, getLiked };

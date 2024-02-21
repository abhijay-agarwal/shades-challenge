import { kv } from "@vercel/kv";

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

const setLiked = async (req, res) => {
  const id = req.params.id;
  console.log('THIS IS THE ID', id);

  try {
    await kv.set(id, true).then((data) => {
      console.log(data);
      res.json(data);
    });
  } catch (error) {
    res.json(error);
  }
}

const delLiked = async (req, res) => {
  const id = req.params.id;
  try {
    await kv.del(id).then((data) => {
      console.log(data);
      res.json(data);
    });
  } catch (error) {
    res.json(error.message);
  }
}

export { getLiked, setLiked, delLiked };

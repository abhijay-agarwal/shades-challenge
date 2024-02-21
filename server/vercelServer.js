import { kv } from "@vercel/kv";

const setLike = async (req, res) => {
  const id = req.params.id;
  console.log('THIS IS THE ID', id);
  like = req.params.like;

  try {
    await kv.set(id, like).then((data) => {
      console.log(data);
      res.json(data);
    });
  } catch (error) {
    res.json(error);
  }
}

const getLike = async (req, res) => {
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

export { setLike, getLike };

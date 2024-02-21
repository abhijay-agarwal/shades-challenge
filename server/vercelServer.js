import { kv } from "@vercel/kv";

const getLiked = async (req, res) => {
  const id = req.params.id;
  try {
    const member = await kv.sismember('liked', id);
    res.json(member);
  } catch (error) {
    res.json(error);
  }
}

const setLiked = async (req, res) => {
  const id = req.params.id;

  try {
    const added = await kv.sadd('liked', id);
    res.json(added);
  } catch (error) {
    res.json(error);
  }
}

const delLiked = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await kv.srem('liked', id);
    res.json(deleted);
  } catch (error) {
    res.json(error.message);
  }
}

const getAllLiked = async (req, res) => {
  try {
    const allLiked = await kv.smembers('liked');
    res.json(allLiked);
  } catch (error) {
    res.json(error);
  }
}


export { getLiked, setLiked, delLiked, getAllLiked };

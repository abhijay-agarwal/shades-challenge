import { kv } from "@vercel/kv";

// const setLike = async (req, res) => {
//   id = req.params.id;
//   like = req.params.like;

//   try {
//     await kv.set(id, like);
//   } catch (error) {
//     console.error(error);
//   }
// }

const getLike = async (req, res) => {
  const id = req.params.id;
  try {
    await kv.get(id).then((data) => {
      console.log(data);
      res.json(data);
    });
  } catch (error) {
    res.status(500).json({ message: 'There was an error' });
  }
}

export { getLike };

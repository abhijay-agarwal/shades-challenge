import { kv } from "@vercel/kv";

const setLike = async (id, like) => {
  try {
    await kv.set(id, like);
  } catch (error) {
    console.error(error);
  }
}

const getLike = async (id) => {
  try {
    return await kv.get(id);
  } catch (error) {
    console.error(error);
  }
}

export { setLike, getLike };

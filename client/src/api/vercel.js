import { kv } from "@vercel/kv";

const setLike = async (id, like) => {
  try {
    await kv.set(id, like);
  } catch (error) {
    console.error(error);
  }
}

export { setLike };

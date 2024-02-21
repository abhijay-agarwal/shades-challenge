import { kv } from "@vercel/kv";

async function setLike(id, like) {
  try {
    await kv.set(id, like);
  } catch (error) {
    console.error(error);
  }
}

import axios from "axios";

const url = `https://shades-challenge.vercel.app/`;

const setLike = async (id, like) => {
  try {
    return await axios.post(`${url}set/${id}/${like}`);
  } catch (error) {
    console.error(error);
  }

}

const getLike = async (id) => {
  try {
    return await axios.get(`${url}get/${id}`);
  } catch (error) {
    console.error(error);
  }
}

export { setLike, getLike };

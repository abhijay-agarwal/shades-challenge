import axios from "axios";

// const url = 'http://localhost:8080';

const url = `https://shades-challenge-server.vercel.app`;

const getLike = async (id) => {
  try {
    return await axios.get(`${url}/get/${id}`);
  } catch (error) {
    console.error(error);
  }
}

const setLike = async (id) => {
  try {
    return await axios.put(`${url}/set/${id}`);
  } catch (error) {
    console.error(error);
  }

}

const delLike = async (id) => {
  try {
    return await axios.delete(`${url}/del/${id}`);
  } catch (error) {
    console.error(error);
  }
}

const getAllLiked = async () => {
  try {
    return await axios.get(`${url}/liked`);
  } catch (error) {
    console.error(error);
  }
}

export { getLike, setLike, delLike, getAllLiked };

import axios from "axios";

const url = `https://shades-challenge.vercel.app`;
// const url = 'http://localhost:8080';

const setLike = async (id, like) => {
  console.log(id, like);
  try {
    return await axios.get(`${url}/set/${id}`);
  } catch (error) {
    console.error(error);
  }

}

const getLike = async (id) => {
  try {
    return await axios.get(`${url}/get/${id}`);
  } catch (error) {
    console.error(error);
  }
}

const delLike = async (id) => {
  try {
    return await axios.get(`${url}/del/${id}`);
  } catch (error) {
    console.error(error);
  }
}

export { setLike, getLike };

import axios from "axios";
// const url = `http://localhost:8080`;

// const url = `https://shades-challenge.vercel.app`;

const url = `https://shades-challenge-server.vercel.app`;


const getOneTest = async () => {
  const res = await axios.get(url);
  const { data } = res;
  if (data.length === 0) {
    return ({});
  } else {
    return data;
  }
};

const getById = async (id) => {
  const res = await axios.get(`${url}/id/${id}`);
  const { data } = res;
  if (data.length === 0) {
    return ({});
  } else {
    return data;
  }
}

const getByTitleText = async (searchTerm) => {
  if (searchTerm === "") {
    return (["default"]);
  }
  try {
    const res = await axios.get(`${url}/title/${searchTerm}`);
    const { data } = res;
    if (data.length === 0) {
      return ([]);
    } else {
      return data;
    }
  } catch (err) {
    return ([]);
  }
}

const getByAbstractSearchText = async (searchTerm) => {
  if (searchTerm === "") {
    return (["default"]);
  }
  try {
    const res = await axios.get(`${url}/search/${searchTerm}`);
    const { data } = res;
    if (data.length === 0) {
      return ([]);
    } else {
      return data;
    }
  } catch (err) {
    return ([]);
  }
}

export { getOneTest, getById, getByTitleText, getByAbstractSearchText };

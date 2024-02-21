import axios from "axios";
// const url = `http://localhost:8080`;

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

const getByTitleText = async (queryString) => {
  if (queryString === "") {
    return (["default"]);
  }
  try {
    const res = await axios.get(`${url}/title/${queryString}`);
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

const getStrictestMatches = async (queryString) => {
  if (queryString === "") {
    return (["default"]);
  }
  try {
    const res = await axios.get(`${url}/search/strictest/${queryString}`);
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

const getStrictImageMatches = async (queryString) => {
  if (queryString === "") {
    return (["default"]);
  }
  try {
    const res = await axios.get(`${url}/search/strict/${queryString}`);
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

const getFromQuery = async (queryString) => {
  if (queryString === "") {
    return (["default"]);
  }
  try {
    const res = await axios.get(`${url}/search/${queryString}`);
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

export { getOneTest, getById, getByTitleText, getStrictestMatches, getStrictImageMatches, getFromQuery };

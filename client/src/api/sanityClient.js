import axios from "axios";
// const url = `http://localhost:8080`;

const url = `https://shades-challenge.vercel.app`;

// const getOneTest = async () => {
//   try {
//     const count = await client.fetch(`*[_id == "c5a18888-3af3-4d8a-8d0e-555241895f90"]`).then((data) => {
//       console.log(data[0]);
//       return (data[0]);
//     });
//   } catch (err) {
//     console.error(err);
//     return (err);
//   }
// }

// const getById = async (id) => {
//   try {
//     const count = await client.fetch(`*[_id == "${id}"]`).then((data) => {
//       console.log(data[0]);
//       return (data[0]);
//     });
//   } catch (err) {
//     console.error(err);
//     return (err);
//   }
// }

// const getAllTiles = async () => {
//   try {
//     const count = await client.fetch(`*[_type == "tile"]`).then((data) => {
//       console.log(data.length);
//       return (data.length);
//     });
//   } catch (err) {
//     console.error(err);
//     return (err);
//   }
// }

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

const getBySearchText = async (searchTerm) => {
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

export { getOneTest, getById, getBySearchText };

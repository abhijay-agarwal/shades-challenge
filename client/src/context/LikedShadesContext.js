import React, { createContext, useContext, useState } from 'react';
import { getAll } from '../api/vercelClient';

const LikedShadesContext = createContext();

export const LikedShadesProvider = ({ children }) => {
  const [likedShades, setLikedShades] = useState([]);

  const refreshLikedShades = () => {
    getAll().then((res) => {
      console.log("liked shades ", res.data);
      setLikedShades(res.data);
    });
  }

  return (
    <LikedShadesContext.Provider value={{ likedShades, refreshLikedShades }}>
      {children}
    </LikedShadesContext.Provider>
  );
};

export const useLikedShades = () => useContext(LikedShadesContext);
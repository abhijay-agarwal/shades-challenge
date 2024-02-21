import React, { createContext, useContext, useState } from 'react';
import { getAllLiked } from '../utils/vercelClient';

const LikedShadesContext = createContext();

export const LikedShadesProvider = ({ children }) => {
  const [likedShades, setLikedShades] = useState([]);

  const refreshLikedShades = () => {
    getAllLiked().then((res) => {
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
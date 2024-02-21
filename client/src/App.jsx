import './App.css';
import ShadeSearch from './components/ShadeSearch';
import LikedShades from './components/LikedShades';
import { Group } from '@mantine/core';
import {
  Route, Routes,
} from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path="/" element={
        <Group>
          <ShadeSearch />
          <LikedShades />
        </Group>
      } />
    </Routes>
  );
}

export default App;

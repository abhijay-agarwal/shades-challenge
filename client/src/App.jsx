import './App.css';
import {
  Route, Routes,
} from 'react-router-dom';
import ShadeSearch from './components/ShadeSearch';
import LikedShades from './components/LikedShades';
import { LikedShadesProvider } from './context/LikedShadesContext';
import { Flex, Center } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import '@mantine/core/styles.css';


function App() {
  const { height, width } = useViewportSize();

  return (
    <LikedShadesProvider>
      <Routes>
        <Route path="/" element={
          <Center mx={width * 0.05} h={height} w={width}>
            <Flex
              justify="center"
              align="flex-end"
              direction="row"
              wrap="nowrap"
            >
              <ShadeSearch />
              <LikedShades />
            </Flex>
          </Center>
        } />
      </Routes>
    </LikedShadesProvider>
  );
}

export default App;

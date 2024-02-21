import './App.css';
import {
  Route, Routes,
} from 'react-router-dom';
import ShadeSearch from './components/ShadeSearch';
import LikedShades from './components/LikedShades';
import { LikedShadesProvider } from './context/LikedShadesContext';
import { Flex, Center, Group } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import '@mantine/core/styles.css';


function App() {
  const { height, width } = useViewportSize();

  return (
    <LikedShadesProvider>
      <Routes>
        <Route path="/" element={
          <Center h={height} w={width}>
            {/* <Flex
              justify="center"
              align="flex-end"
              direction="row"
              wrap="nowrap"
              gap={width * 0.05}
            > */}
            <Group justify="space-between" gap={width * 0.05} >
              <ShadeSearch />
              <LikedShades />
            </Group>
            {/* </Flex> */}
          </Center>
        } />
      </Routes>
    </LikedShadesProvider>
  );
}

export default App;

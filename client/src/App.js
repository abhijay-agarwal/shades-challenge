import './App.css';
import Shade from './components/Shade';
import ShadeSearch from './components/ShadeSearch';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path="/" element={<ShadeSearch />} />
    </Routes>
  );
}

export default App;

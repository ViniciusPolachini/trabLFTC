
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import AF from './pages/AF';
import ER from './pages/ER';
import GR from './pages/GR';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="AF" element={<AF />} />
      <Route path="GR" element={<GR />} />
      <Route path="ER" element={<ER />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;

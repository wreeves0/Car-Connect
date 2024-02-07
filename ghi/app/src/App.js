import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianList from './TechnicianList';
import TechnicianForm from './TechnicianForm';
import ManufacturersList from './ManufacturerList';
import ModelsList from './ModelList';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians/" element={<TechnicianList/>} />
          <Route path="/technicians/create" element={<TechnicianForm/>} />
          <Route path="/manufacturers" element={<ManufacturersList/>} />
          <Route path="/models" element={<ModelsList/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

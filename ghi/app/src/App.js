import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import Salespeoplelist from './Salespeoplelist';
import SalespersonForm from './Salespersonform';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/salespeople" element={<Salespeoplelist /> } />
          <Route path="/salespersonform" element={<SalespersonForm /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

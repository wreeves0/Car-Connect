import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespeopleList from './SalespeopleList';
import SalespersonForm from './SalespersonForm';
import TechnicianList from './TechnicianList';
import TechnicianForm from './TechnicianForm';
import ManufacturersList from './ManufacturerList';
import ModelsList from './ModelList';
import CustomerForm from './CustomerForm';
import CustomersList from './CustomerList';
import ManufacturerForm from './ManufacturerForm';
import ModelForm from './ModelForm';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import SalesList from './SalesList';
import SalespersonhistoryList from './SalespersonhistoryList';
import SalesForm from './SalesForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/salespeople" element={<SalespeopleList /> } />
          <Route path="/salespeople/create" element={<SalespersonForm /> } />
          <Route path="/technicians/" element={<TechnicianList/>} />
          <Route path="/technicians/create" element={<TechnicianForm/>} />
          <Route path="/manufacturers" element={<ManufacturersList/>} />
          <Route path="/manufacturers/create" element={<ManufacturerForm/>} />
          <Route path="/models" element={<ModelsList/>} />
          <Route path="/customers/create" element={<CustomerForm/>} />
          <Route path="/customers" element={<CustomersList/>} />
          <Route path="/models/create" element={<ModelForm/>} />
          <Route path="/automobiles" element={<AutomobileList/>} />
          <Route path="/automobiles/create" element={<AutomobileForm/>} />
          <Route path="/sales" element={<SalesList/>}/>
          <Route path="/salespersonhistory" element={<SalespersonhistoryList/>}/>
          <Route path="/sales/create" element={<SalesForm/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

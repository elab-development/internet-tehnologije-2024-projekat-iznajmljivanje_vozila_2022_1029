import './App.css';
import Footer from './components/footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Pocetna from './components/pocetna/Pocetna';
import Cars from './components/cars/Cars';
import CarDetails from './components/cars/CarDetails';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Pocetna />} />
          <Route path="/cars" element={<Cars />}/>
          <Route path="/cars/:id" element={<CarDetails />} />
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;

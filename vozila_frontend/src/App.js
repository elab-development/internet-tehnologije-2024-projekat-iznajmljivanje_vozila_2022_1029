import './App.css';
import Footer from './components/footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Pocetna from './components/pocetna/Pocetna';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Pocetna />} />
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;

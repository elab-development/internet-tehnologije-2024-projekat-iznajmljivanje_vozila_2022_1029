import './App.css';
import Footer from './components/footer/Footer';
import { BrowserRouter, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;

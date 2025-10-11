
import './App.css'
import Navbar from './components/Navbar'
import AddHotelForm from './pages/AddHotelForm';
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from "react-router";  

function App() {
  return (
    <BrowserRouter>
     
       
        <div className="content">
          <Navbar />
          <Routes>
             <Route path='/dashboard' element={<Home/>} />
              <Route path='/add.hotel' element={<AddHotelForm/>} />
          </Routes>
          <Home />
        </div>
      
    </BrowserRouter>
  );
}

export default App;

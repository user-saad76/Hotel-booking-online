
import './App.css'
import Navbar from './components/Navbar'
import AddHotelForm from './pages/AddHotelForm';
import BookingOrders from './pages/BookingOrder';
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from "react-router-dom";  

function App() {
  return (
    <BrowserRouter>
          <Navbar />
          <Routes>
             <Route path='/' element={<Home/>} />
               <Route path='/dashboard' element={<Home/>} />
              <Route path='/add.hotel' element={<AddHotelForm/>} />
               <Route path='/bookingOrder' element={<BookingOrders/>} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;

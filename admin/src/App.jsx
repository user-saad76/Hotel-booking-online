
import './App.css'
import Navbar from './components/Navbar'
import AddHotelForm from './pages/AddHotelForm';
import BookingOrders from './pages/BookingOrder';
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from "react-router-dom";  
import SignInForm from './pages/SignInForm';
import SignUpForm from './pages/SignUpForm';
import AuthProvider from './contexts/AuthProvider';



function App() {

   


  return (
    <AuthProvider>
    <BrowserRouter>
        <Navbar/>
          <Routes>
             <Route path='/' element={<Home/>} />
               <Route path='/dashboard' element={<Home/>} />
              <Route path='/add.hotel' element={ <AddHotelForm/>} />
               <Route path='/bookingOrder' element={<BookingOrders/>} />
                <Route path='/sign-in' element={<SignInForm/>} />
                 <Route path='/sign-up' element={<SignUpForm/>} />
          </Routes>
    </BrowserRouter>
    </AuthProvider>
   
  );
}

export default App;

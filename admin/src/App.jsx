
import './App.css'
import Navbar from './components/Navbar'
import AddHotelForm from './pages/AddHotelForm';
import BookingOrders from './pages/BookingOrder';
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from "react-router-dom";  
import SignInForm from './pages/SignInForm';
import SignUpForm from './pages/SignUpForm';
import AuthProvider from './contexts/AuthProvider';
import AdminProtected from './pages/AdminProtected';




function App() {

   


  return (
     <AuthProvider>
    <BrowserRouter>
        <AdminProtected><Navbar/></AdminProtected>
          <Routes>
             <Route path='/' element={ <AdminProtected><Home/></AdminProtected>} />
               <Route path='/dashboard' element={<AdminProtected><Home/></AdminProtected>} />
              <Route path='/add.hotel' element={<AdminProtected><AddHotelForm/></AdminProtected> } />
               <Route path='/bookingOrder' element={<AdminProtected><BookingOrders/></AdminProtected>} />
                <Route path='/sign-in' element={<SignInForm/>} />
                 <Route path='/sign-up' element={<SignUpForm/>} />
          </Routes>
    </BrowserRouter>
    </AuthProvider>
   
  );
}

export default App;

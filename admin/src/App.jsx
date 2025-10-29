
import './App.css'
import Navbar from './components/Navbar'
import AddHotelForm from './pages/AddHotelForm';
import BookingOrders from './pages/BookingOrder';
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from "react-router-dom";  
import SignInForm from './pages/SignInForm';
import SignUpForm from './pages/SignUpForm';
import AdminAuthProvider from './contexts/AdminAuthProvider';
import ComplainMessage from './pages/ComplainMessage';
import AdminProtected from './pages/AdminProtected';


function App() {

  return (
     <AdminAuthProvider>
    <BrowserRouter>
        <AdminProtected><Navbar/></AdminProtected>
          <Routes>
             <Route path='/' element={<Home/>} />
               <Route path='/dashboard' element={<Home/>} />
              <Route path='/add.hotel' element={<AddHotelForm/>} />
               <Route path='/bookingOrder' element={<BookingOrders/>} />
                <Route path='/sign-in' element={<SignInForm/>} />
                 <Route path='/sign-up' element={<SignUpForm/>} />
                 <Route path='/reports' element={<ComplainMessage/>} />
          </Routes>
    </BrowserRouter>
    </AdminAuthProvider>
   
  );
}

export default App;

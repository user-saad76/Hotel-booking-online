
import './App.css'
import Navbar from './components/Navbar'
import AddHotelForm from './pages/AddHotelForm';
import BookingOrders from './pages/BookingOrder';
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from "react-router-dom";  
import SignInForm from './pages/SignInForm';
import SignUpForm from './pages/SignUpForm';
import AuthProvider from './contexts/AuthProvider';
import { io } from "socket.io-client";
import { useEffect } from 'react';

const socket = io("http://localhost:7000");

function App() {

    useEffect(()=>{
      socket.on(`abc`,(data)=>{
        console.log(data.message);
      })
    },[])
   
    const sendMessage = ()=>{
      socket.emit('chat',{chat:'Hello from the client'})
    }


  return (
    <AuthProvider>
    <BrowserRouter>
          <Navbar />
          <button onClick={sendMessage}>Send message</button>
          <Routes>
             <Route path='/' element={<Home/>} />
               <Route path='/dashboard' element={<Home/>} />
              <Route path='/add.hotel' element={<AddHotelForm/>} />
               <Route path='/bookingOrder' element={<BookingOrders/>} />
                <Route path='/sign-in' element={<SignInForm/>} />
                 <Route path='/sign-up' element={<SignUpForm/>} />
          </Routes>
    </BrowserRouter>
    </AuthProvider>
   
  );
}

export default App;

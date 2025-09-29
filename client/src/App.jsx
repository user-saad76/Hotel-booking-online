
import './App.css'
import Home from './Pages/Home'
import { BrowserRouter ,Routes,Route} from "react-router";
import Booking from './Pages/Booking';
import Navbar from './components/Navbar'
import Rooms from './Pages/Rooms';
import Contect from './Pages/Contect';
//import { hotels } from './hotel-data';
import { useEffect, useState } from 'react';
import HotelDetail from './Pages/HotelDetail';
import { useFetch } from './hook/useFetch';
import SignupForm from './Pages/SignUpForm';
import SignInForm from './Pages/SignInForm';


function App() {
   //const [hotels,setHotels]= useState(hotels)
   //console.log( "hotel-data",hotels);


  const {data:user,error:meError,loading:meLoading} = useFetch('http://localhost:7000/users/me')

  console.log(user)

   const {data:hotels,error,loading} = useFetch('http://localhost:7000/hotels')

 
   
  return (
    <>
    <BrowserRouter>
      <Navbar user={user}/>
    <Routes> 
      <Route path='/home' element = {<Home/>} />
       <Route path='/' element = {<Home/>} />
       <Route path='/booking' element = {<Booking hotels={hotels} />} />
         <Route path='/rooms' element = {<Rooms/>} />
          <Route path='/contect' element = {<Contect/>} />
           <Route path='/hotels/:slug' element = {<HotelDetail hotels={hotels}/>} />
             <Route path='/sign-in' element = {<SignInForm/>} />
             <Route path='/sign-up' element = {< SignupForm/>} />
    </Routes>
  </BrowserRouter>  
    </>
  )
}

export default App

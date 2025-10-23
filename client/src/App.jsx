
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
import AuthProvider from './contexts/AuthProvider';
import Dashboard from './Pages/Dashboard';
import Protected from './Pages/Protected';
import Review from './components/Review';
import PaymentSuccess from './Pages/PaymentSuccess';
import PaymentCancel from './Pages/PaymentCancel';



function App() {
   //const [hotels,setHotels]= useState(hotels)
   //console.log( "hotel-data",hotels);


  //const {data:user,error:meError,loading:meLoading} = useFetch('http://localhost:7000/users/me')


   const {data:hotels,error,loading} = useFetch('http://localhost:7000/hotels')


    const { data: reviews, loading: reviewLoading, error: reviewError } = useFetch("http://localhost:7000/getReview");



   
 
  return (
    <>
    <AuthProvider>
    <BrowserRouter>
      <Navbar/>
    <Routes> 
      <Route path='/home' element = {<Home/>} />
       <Route path='/' element = {<Home/>} />
       <Route path='/booking' element = {<Booking hotels={hotels} />} />
         <Route path='/rooms' element = {<Rooms/>} />
          <Route path='/contect' element = {<Contect/>} />
           <Route path='/hotels/:slug' element = {<Protected><HotelDetail hotels={hotels}/></Protected>} />
             <Route path='/sign-in' element = {<SignInForm/>} />
             <Route path='/sign-up' element = {< SignupForm/>} />
             <Route path='/dashboard' element = {<Protected><Dashboard/></Protected>} />
               <Route path='/review' element = {<Protected><Review reviews={reviews} /></Protected>} />
               <Route path='/success' element = {<PaymentSuccess/>} />
                <Route path='/cancel' element = {<PaymentCancel/>} />
    </Routes>
  </BrowserRouter>
  </AuthProvider>
    </>
  )
}

export default App

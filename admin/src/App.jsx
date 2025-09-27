
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AddHotelForm from './pages/AddHotelForm';
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from "react-router";   // ✅ fixed

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid position-relative d-flex p-0">
        <Sidebar />
        <div className="content">
          <Navbar />
          <Routes>
             <Route path='/dashboard' element={<Home/>} />
              <Route path='/add.hotel' element={<AddHotelForm/>} />
          </Routes>
          <Home />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

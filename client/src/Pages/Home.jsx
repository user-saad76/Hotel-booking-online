import Banner from "../components/Banner"
import HotelCarousel from "../components/HotelCarousel"
import HotelMangement from "../components/HotelMangement"
import HotelQuality from "../components/HotelQuality"
import HotelRequirements from "../components/HotelRequirements"
import Footer from "../components/Footer"
import { useFetch } from "../hook/useFetch"

function Home() {

 const {data:hotels,error,loading} = useFetch('http://localhost:7000/hotels')




    return(
        <>
         <Banner/>
      <HotelRequirements/>
       <HotelMangement/>
       <HotelQuality/>
      <HotelCarousel hotels={hotels} />

      <Footer/>
    
        </>
    )
}
export default Home
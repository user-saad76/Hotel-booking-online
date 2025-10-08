import Banner from "../components/Banner"
import HotelCarousel from "../components/HotelCarousel"
import HotelMangement from "../components/HotelMangement"
import HotelQuality from "../components/HotelQuality"
import HotelRequirements from "../components/HotelRequirements"
import Footer from "../components/Footer"
import AIRecommendations from "../components/AIRecommendations"

function Home() {
    return(
        <>
         <Banner/>
       <AIRecommendations/>
      <HotelRequirements/>
       <HotelMangement/>
       <HotelQuality/>
      <HotelCarousel/>

      <Footer/>
    
        </>
    )
}
export default Home
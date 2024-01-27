import "./style.scss"
import HeroBanner from "./heroBanner/heroBanner";
import Tranding from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";

const home = () => {
  return (
    <div className="homepage">
    <HeroBanner/>
    <Tranding/>
    <Popular/>
    <TopRated/>
      
    </div>
  )
}

export default home

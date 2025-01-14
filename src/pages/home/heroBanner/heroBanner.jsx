import { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Piclix from "../../../assets/piclix-logo.png"
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/LazyloadImage/img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "./style.scss";
const heroBanner = () => {
   const [background, setBackground]=useState(Piclix);
   const [query,setQuery]=useState("");
   const navigate= useNavigate();

   const {url} = useSelector((state) => state.home);

   const {data ,loading } = useFetch('/movie/upcoming');

   useEffect(()=>{
    const bg = url?.backdrop + data?.results[Math.floor(Math.random() * 20 )].backdrop_path

    setBackground(bg);
   },[data])

   const searchQueryHandler =(event) =>{
    if(event.key == "Enter" && query.length > 0){
      navigate(`/search/${query}`)

    }
   }



  return (
    <div className="heroBanner">
    {!loading && <div className="backdrop-img">
      <Img src={background ? background  :  Piclix}/>
    </div>}
    <div className="opacity-layer"></div>
      <ContentWrapper >
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subtitle">
            Millions of movies , TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
             type="text"
             onKeyUp={searchQueryHandler}
             onChange={(e)=>{setQuery(e.target.value)}} placeholder="Search for a movie or tv show..." />

            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default heroBanner;

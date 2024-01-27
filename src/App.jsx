import { useState, useEffect } from "react";
import { fetchDataFromApi } from "./utils/api.js";
import { useSelector, useDispatch } from "react-redux";
import { Routes , Route} from "react-router-dom"
import { getApiConfiguration, getGenres } from "./store/homeSlice/homeSlice.js";
import {BrowserRouter as Router} from 'react-router-dom';

import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/home/home.jsx";
import Details from "./pages/details/details.jsx";
import SearchResult from "./pages/serachResult/SearchResult.jsx";
import Explore from "./pages/explore/explore.jsx";


import pageNotFound from "./pages/404/pageNotFound.jsx";



function App() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.home.url);

  useEffect(() => {
    fetchApiConfig();
    genresCall()
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {

      const url ={
        backdrop:res.images.secure_base_url + "original",
        poster:res.images.secure_base_url + "original",
        profile:res.images.secure_base_url + "original",

      }
      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () =>{
    let promises = []
    let endPoints =  ["tv", "movie"]
    let allGenres ={}


    endPoints.forEach((url)=>{
       promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })


    const data = await Promise.all(promises)


    data.map(({genres}) => {
      return genres.map((item) => (  allGenres[item.id] = item ))

    })

    dispatch(getGenres(allGenres));


  }

  

  return (
    <div className="App" style={{ color: "white" }}>
    <Header/>
      <Routes>
        <Route  path="/"  element={<Home/>}/>
        <Route  path="/:mediaType/:id"  element={<Details/>}/>
        <Route  path="/search/:query"  element={<SearchResult/>}/>
        <Route  path="/explore/:mediaType"  element={<Explore/>}/>
        <Route  path="*"  element={<pageNotFound/>}/>
      </Routes>
     <Footer/>
    </div>
  );
}

export default App;

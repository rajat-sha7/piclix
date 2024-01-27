import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { Navigate, useLocation } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/piclix-logo.png";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate=useNavigate();
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");

  const location = useLocation();

 const controlNavbar = () => {
  if(window.scrollY > 200){
    if(window.scrollY > lastScrollY && !mobileMenu){
      setShow("hide");
    }else{
      setShow("show")
    }
  } else {
    setShow("top")
  }

  setLastScrollY(window.scrollY)
  }
  useEffect(()=>{
    window.scrollTo(0,0)
  },[location])

  useEffect(()=>{
    window.addEventListener('scroll', controlNavbar);
    return  ()=>{
      window.removeEventListener('scroll', controlNavbar);
    }
  },[lastScrollY])



  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchQueryHandler = (event) => {
    if (event.key == "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const navigationHandler = (type) =>{
    if(type == "movie"){
      navigate("/explore/movie");

    }else {
      navigate("/explore/tv");
    }
    setMobileMenu(false)

  }

  // const handleLogo = () =>{
  //   navigate('/')
  // }

  return (
    <header
      className={`header ${mobileMenu ? "mobileView" : ""}
    
        ${show}`}
    >
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" onClick={()=>{navigate('/')}}/>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={()=>{
            navigationHandler('movie')}} 
            >Movies</li>
          <li className="menuItem" onClick={()=>{
            navigationHandler('tv')}} >Tv Shows</li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch}/>
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />

          {mobileMenu ? (
            <VscChromeClose
              onClick={() => {
                setMobileMenu(false);
              }}
            />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>

    { showSearch ?  <div className="searchBar">
        <ContentWrapper>
          <div className="searchInput">
            <input
              type="text"
              onKeyUp={searchQueryHandler}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              placeholder="Search for a movie or tv show..."
            />
            <VscChromeClose style={{color:"black"}}
              onClick={() => {
                setShowSearch(false);
              }}
            />
          </div>
        </ContentWrapper>
      </div> : ""  }
    </header>
  );
};

export default Header;

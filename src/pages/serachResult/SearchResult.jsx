
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss"

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard"
import { useEffect, useState } from "react";
import Spinner  from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum , setPageNum] = useState(1)
  const [loading, setLoding] = useState(false);
  const {query} = useParams();

  const fetchInitialData = ()=>{
    setLoding(true) 
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
    .then((res)=>{
      console.log(res)
      setData(res)
      setPageNum((prev) => prev + 1);
      setLoding(false)
    })
   }

   
   const fecthNextPageData  = ()=>{
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
    .then((res)=>{
      if(data.results){
        setData({
          ...data,results:[...data?.results, ...res.results]
        })
      }  else {
        setData(res)
      }
      setPageNum((prev) => prev + 1)

    })

   }


  useEffect(() => {
    setPageNum(1)
    fetchInitialData()
  }, [query])
  
  return (
    <div className="searchResultsPage">
    {loading && <Spinner initial={true} />}
    {!loading && (
      <ContentWrapper >
      {data?.results.length > 0 ? ( <>
        <div className="pageTitle">
          {`search ${data?.total_results > 1 ? "results" : "result"}
          of '${query}'`}
        </div>
        <InfiniteScroll 
        className="content" 
        dataLength={data?.results?.length  || []}
        
        next={fecthNextPageData}

        hasMore={pageNum  <= data?.total_pages }
        loader={<Spinner/>}
        >
        {data?.results.map((item,index)=>{
          if(item.media_type === "person") return;
          return (
            <MovieCard key={index} data={item} fromSearch ={true} />
          )
        })}

        </InfiniteScroll>
      </>

      ) : (
        <span className="resultNotFound">
          Sorry , Results not found
        </span>
      ) }

      </ContentWrapper>
    )}

 
    </div>
  )
}

export default SearchResult

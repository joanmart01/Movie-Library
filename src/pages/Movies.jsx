import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import no_image_available from "../assets/no-image-available-icon.jpg";
import SearchBar from '../comps/SearchBar';

const Movies = () => {
  const {homeSearchText} = useParams();
  const [state, setState] = useState("LOADING");
  const [movies, setMovies] = useState([]);
  
  let navigate = useNavigate();
  let sortValue;
  const requestAddress = "https://www.omdbapi.com/?apikey=58cf06a9&";
  const searchKey = "s=";

  useEffect(() => {
    fetchMovies();    
  }, [homeSearchText])

  async function fetchMovies() {
    setState("LOADING");
    const {data} = await axios.get(requestAddress + searchKey + homeSearchText);
    let movieData = data.Search;
    if(movieData !== undefined && movieData !== null){
      setMovies(sortData(movieData));
      setTimeout(() => {
        setState("RESULTS");
      }, 200);
      
    }
    else {
      setState("NO_RESULTS");
    }
  }

  function filterMovies(value){
    sortValue = value;
    if(movies !== undefined && movies !== null) 
      setMovies(sortData(movies.slice()));
  }

  function replaceErrorImage(event){
    event.target.src = no_image_available;
  }

  function sortData(movieData) {
    movieData.sort((a, b)=>{
      switch(sortValue){
          case "A_TO_Z":
              return a.Title.localeCompare(b.Title);
          case "Z_TO_A":
              return b.Title.localeCompare(a.Title);
          case "OLD_TO_NEW":
              return a.Year - b.Year;
          case "NEW_TO_OLD":
              return b.Year - a.Year;
        }      
      }
    );
    return movieData;
  }


  return (
    <main id="movies__main">
      <section>
        <div className="container">
          <div className="row">
            <SearchBar 
            sortFunction={filterMovies}
            initialTxt={homeSearchText} 
            />
            <div className="movies">
              {state=="LOADING"?
                new Array(8).fill(0).map((_, index) =>{
                  return (
                    <div className="movie" key={index}>
                      <div className="movie__img--wrapper">
                        <div className="movie__img movie__img--skeleton"></div>
                      </div>
                      <div className="movie__description movie__description--skeleton">
                        <div className="movie__title movie__title--skeleton"></div>
                        <div className="movie__year movie__year--skeleton"></div>
                      </div>
                    </div>
                  )
                })
              :
              state=="NO_RESULTS"?
                <h2 className="movies__no-results--text">Sorry... 0 results</h2>
              :
                movies.map((movie) => (
                  <div className="movie" key={movie.imdbID}>
                    <figure className="movie__img--wrapper">
                      <img className="movie__img" 
                           src={movie.Poster}
                           onClick={() => navigate(`/movie-info/${movie.imdbID}`)}
                           onError={(event) => replaceErrorImage(event)} />
                    </figure>
                    <div className="movie__description">
                      <div className="movie__title">{movie.Title}</div>
                      <div className="movie__year">{movie.Year}</div>
                    </div>
                  </div>
                ))
              }

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Movies;
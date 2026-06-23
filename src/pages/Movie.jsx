import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../comps/SearchBar';
import tomatoImage from "../assets/tomato.svg";
import rottenTomatoesLogo from "../assets/rotten-tomatoes-logo.png";

const Movie = ({cartFunction, searchFunction}) => {
  const {imdbID} = useParams();

  const [movie, setMovie] = useState({});  
  const [loading, setLoading] = useState(true);
  const requestAddress = "https://www.omdbapi.com/?apikey=58cf06a9&";
  const searchKey = "i=";
  let ratingsAvailable = false;
  
  useEffect(() => {
    fetchMovieInfo();    
  }, [])

  async function fetchMovieInfo() {
    const {data} = await axios.get(requestAddress + searchKey + imdbID);
    setMovie(data);
    ratingsAvailable = data.Ratings.length>0;
    setLoading(false);
  }

  function addBookToCart(){
    cartFunction({...movie, price: 19.95});
  }

  function findMovie(){
    return searchFunction(movie.imdbID);
  }

  return (
    <div id="#movie" className="container">
        <div className="row">
            <SearchBar />

            {loading?
            <></>
            :
            <div className="movie__selected">
                <figure className='rating__img--wrapper'>
                    <img src={tomatoImage} className='rating__img' />
                    <div className="rating__text">
                        <h3 className='rating__value'>{ratingsAvailable? movie.Ratings[1].Value.split("%") : "NA"}
                            <span className='rating__value--percent'>{ratingsAvailable && "%"}</span>
                        </h3>
                        <img src={rottenTomatoesLogo} className='rating__source' />
                    </div>
                </figure>
                
                <figure className="movie__selected--figure">
                    <img src={movie.Poster} alt="" className="movie__selected--img" />
                </figure>
                <div className="movie__selected--description">
                    <h2 className="movie__selected--title">{movie.Title}</h2>
                    <div className="movie__summary">
                        <p className="movie__summary--para">{movie.Plot}</p>
                    </div>
                    <div className="movie__other-info">
                        <div className="movie__other-info--line movie__other-info--line1">
                            <p className="movie__other-info--genre">{movie.Genre.split(", ").join(" • ")}</p>
                            <p className="movie__other-info--rated">{movie.Rated}</p>
                            <p className="movie__other-info--year">{movie.Released.split(" ")[2]}</p>
                            <p className="movie__other-info--duration">{movie.Runtime}</p>
                        </div>
                        <p className="movie__other-info--line movie__other-info--line2 movie__cast-info">Cast:&nbsp;&nbsp;<span className="movie__cast-info--actors">{movie.Actors}</span></p>   
                        <div className='movie__selected--bottom'>
                            {findMovie()? 
                            <button className='btn--added' disabled>Added !</button>
                            :
                            <button className="btn--not-added" onClick={addBookToCart}>Add to cart</button>}
                            <h3>$19.95</h3>
                        </div>
                    </div>
                </div>
            </div>
            }
            
        </div>
    </div>
  )
};

export default Movie;

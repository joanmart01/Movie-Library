import {BrowserRouter, Routes, Route} from "react-router-dom";
import React, {useState, useEffect} from "react";
import Nav from "./comps/Nav";
import Footer from "./comps/Footer";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import "./App.css";

function App() {

  const [shoppingActivity, setShopping] = useState({cart: [], 
                                                    totals: {subtotal:0, tax:0, total:0}, 
                                                    number:0});

  function addToCart(movie){
    let newCart = [...shoppingActivity.cart, {...movie, quantity: 1, cost: movie.price}];
    let newTotals = calcTotals(newCart);
    setShopping({cart: newCart, totals: newTotals, number: shoppingActivity.number+1});
  }

  function removeFromCart(movie) {
    let newCart = shoppingActivity.cart.filter((e)=> e.imdbID !== movie.imdbID);
    let newTotals = calcTotals(newCart);
    setShopping({cart: newCart, totals: newTotals, number: shoppingActivity.number-1})
  }

  function calcTotals(cart) {
    let sub = 0;
    for(let i=0; i<cart.length; i++) sub += cart[i].cost;
    let tax = sub * 0.68;
    let total = sub + tax;
    return {subtotal: sub, tax: tax, total: total};
  }

  function changeQuantity(movie, quantity) {
    let newCart = shoppingActivity.cart.map(item => {
      return item.imdbID == movie.imdbID ? 
             {...item, quantity: +quantity, cost: quantity * item.price} 
             : item;
    });
    let newTotals = calcTotals(newCart);
    setShopping({cart: newCart, totals: newTotals, number: shoppingActivity.number + (quantity - movie.quantity)});
  }

  function findMovie(movieID){
    return !!shoppingActivity.cart.find((m)=> m.imdbID == movieID);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Nav cartSize={shoppingActivity.number} />
        <div id="main-container" className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies/:homeSearchText" element={<Movies />} />
            <Route path="/movie-info/:imdbID" 
                   element={<Movie cartFunction={addToCart} searchFunction={findMovie} />} />
            <Route path="/cart" element={<Cart shoppingActivity={shoppingActivity} 
                                          removeFunction={removeFromCart} 
                                          quantityFunction={changeQuantity} />} /> 
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;

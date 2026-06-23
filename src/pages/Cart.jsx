import React from 'react';
import CartItem from '../comps/CartItem';
import SearchBar from '../comps/SearchBar';
import emptyCart from "../assets/empty-cart.svg";

const Cart = ({shoppingActivity, quantityFunction, removeFunction}) => {
    let cost = shoppingActivity.totals;
    let cart = shoppingActivity.cart;

    return (
        <div id="books__body">
            <main id="books__main">
                <div className="books__container">
                    <div className="row">

                        <SearchBar />

                        {cart.length===0?
                            <div className="cart__empty">
                                <h2>You don't have any movies in your cart!</h2>
                                <img src={emptyCart} alt="" className="cart__empty--img" />
                            </div>
                            
                        :
                        <>
                            <div className="book__selected--top">
                                <h2 className="cart__title">Shopping Cart</h2>
                            </div>
                            <div className="cart">
                                <div className="cart__header cart__row">
                                    <span className="cart__movie">Movie</span>
                                    <span className="cart__quantity">Quantity</span>
                                    <span className="cart__total">Price</span>
                                </div>
                                <div className="cart__body">
                                    {cart.map(item => {
                                        return <CartItem 
                                                item={item} 
                                                quantityFunction={quantityFunction}
                                                removeFunction={removeFunction} 
                                                key={item.imdbID} />
                                    })}
                                </div>
                            </div>                        
                        </>}

                        {cart.length>0 && 
                        (<div className="total">
                            <div className="total__item total__sub-total">
                                <span>Subtotal</span>
                                <span>{cost.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="total__item total__tax">
                                <span>Tax</span>
                                <span>{cost.tax.toFixed(2)}</span>
                            </div>
                            <div className="total__item total__price">
                                <span>Total</span>
                                <span>{cost.total.toFixed(2)}</span>
                            </div>
                            <button className="btn btn__checkout no-cursor btn--not-added" onClick={()=>alert("Haven't gotten around to doing this.")}>
                                Proceed to checkout
                            </button>
                        </div>)}

                    </div>
                </div>
            </main>
        </div>  
  )
}

export default Cart;

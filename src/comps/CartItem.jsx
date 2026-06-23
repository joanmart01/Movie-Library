import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const CartItem = ({item, quantityFunction, removeFunction}) => {
    const [fieldQuan, setFieldQuantity] = useState(item.quantity);
    const navigate = useNavigate();

    function adjustQuantity(num) {
        let new_num = fieldQuan + num;
        setFieldQuantity(new_num);
        quantityFunction(item, new_num);
    }
    
    let price = item===undefined? 0 : item.price;

    return (
        <div className="cart__item cart__row">
            <div className='cart__movie'>
                <div>
                    <img src={item.Poster}  
                         className="cart__movie--img" 
                         onClick={() => navigate(`/movie-info/${item.imdbID}`)} 
                         alt="" />
                </div>
                <div className="cart__movie--info">
                    <span className="cart__movie--title">{item.Title}</span>
                    <span className="cart__movie--price">${price.toFixed(2)}</span>
                </div>
            </div>

            <div className="cart__quantity">
                     
                <div className='cart__quantity--comp'>
                    {fieldQuan>1?
                    <button className='btn__green btn__quan btn__quan--left' 
                            onClick={()=> adjustQuantity(-1)}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    :
                    <button className='btn__green btn__quan btn__quan--left' 
                            onClick={()=>removeFunction(item)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                    }
                        
                    <input className='field__quan'
                           type="number"
                           min={0} max={99} 
                           disabled
                           value={fieldQuan} 
                    />
                    <button className='btn__green btn__quan btn__quan--right' 
                            onClick={()=> adjustQuantity(1)}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>
            <div className="cart__total">{item.cost.toFixed(2)}</div>
        </div>
    )
}

export default CartItem;

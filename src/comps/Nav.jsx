import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import libraryLogo from "../assets/library-logo4.svg";
import { faBars, faTimes, faCartShopping } from '@fortawesome/free-solid-svg-icons';


const Nav = ({cartSize}) => {

    let navigate = useNavigate();
    const[cartNum, setCartNum] = useState(0);

    useEffect(()=> {
        setCartNum(cartSize);
    }, [cartSize])

    function openMenu() {
        document.body.classList += "menu--open"
    }

    function closeMenu() {
        document.body.classList.remove("menu--open")
    }

  return (
    <nav>
        <div className="nav__container">
            <div className="logo__container">
                <img className="logo" src={libraryLogo} alt="Movie Library Logo"/>
            </div>
            <ul className="nav__links">
                <li><Link to="/" className="nav__link">Home</Link></li>
                <li><Link className="nav__link">Contact</Link></li>
                <li className='cart__link'>
                    <Link to="/cart" className="nav__link nav__link--primary">
                    <FontAwesomeIcon icon={faCartShopping} /></Link>
                    
                    {cartNum > 0 
                    && (<Link to="/cart"><span className="cart__length">{cartNum}</span></Link>)}
                
                </li>
            </ul>
            <button className="btn__menu" onClick={openMenu}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <div className="menu__backdrop">
                <button className="btn__menu btn__menu--close" onClick={closeMenu}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <ul className="menu__links">
                    <li className="menu__item">
                        <Link to="/" className="menu__link" onClick={closeMenu}>Home </Link>
                    </li>
                    <li className="menu__item">
                        <Link to="/cart" className="menu__link" onClick={closeMenu}>Cart</Link>
                    </li>
                    <li className="menu__item">
                        <Link className="menu__link no-cursor" onClick={closeMenu}>Contacts</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Nav;

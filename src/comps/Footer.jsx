import React from 'react';
import { Link } from 'react-router-dom';
import footerLogo from "../assets/library-logo4.svg";

const Footer = () => {
  return (
    <footer>
        <div className="container">
        <div className="row row__column">
            <div className="footer__list">
              <Link to="/" className="footer__link">Home</Link>
              <Link className="footer__link no-cursor">About</Link>
              <Link className="footer__link no-cursor">Contact</Link>
            </div>
            <figure className='footer__logo'>
              <img className='footer__logo--img' src={footerLogo} />
            </figure>
            <div className="footer__copyright">Copyright &copy; 2021 MovieLibrary</div>
        </div>
        </div>
    </footer>
  )
}

export default Footer;

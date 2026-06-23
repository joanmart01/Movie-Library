import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import SearchField from './SearchField';

const SearchBar = ({sortFunction, initialTxt}) => {
    const navigate = useNavigate();
    const [sortOption, setSort] = useState("Sort");
    const [currentTarget, setTarget] = useState();
    let menuOpen = false;

    useEffect(()=>{
        const initialTarget = document.getElementById("default-menu-item");
        if(initialTarget) initialTarget.classList.add("selected-item");
        setTarget(initialTarget);
    }, []);

    function dropDownSwitch() {
        if(!menuOpen) {
            document.body.classList.add("sort__menu--open");
            document.body.classList.remove("sort__menu--close");
        }    
        else {
            document.body.classList.remove("sort__menu--open");
            document.body.classList.add("sort__menu--close");
        }
        menuOpen = !menuOpen;
    }

    function focusLost(event){
        if(menuOpen) {
            if(event.relatedTarget==null 
                || !event.relatedTarget.className.includes("sort__comp"))
                dropDownSwitch();
        }
    }

    function updateSort(event, value) {
        if(currentTarget !== undefined) 
            currentTarget.classList.remove("selected-item");
        const eventTarget = event.target;
        setTarget(eventTarget);
        eventTarget.classList.add("selected-item");
        setSort(event.target.innerHTML);
        dropDownSwitch();
        sortFunction(value);
    }


    return (
    <div className="search-bar__box">
        <SearchField initialTxt={initialTxt} />
        <div className='search-bar__left'>
            {sortFunction?
            <div id='sorting-box' className='field__box'>
                <input type="text" 
                       readOnly
                       className="field field__search sort__comp"  
                       value={sortOption} 
                       onClick={dropDownSwitch}  />
                <button 
                        className='field field__btn field__btn--right field__hovered-btn sort__comp' 
                        onClick={dropDownSwitch}
                        onBlur={(e) =>focusLost(e)}>
                        <FontAwesomeIcon className='field__btn--icon' icon={faAngleDown} />
                </button>
                <div className='field sort__menu--box' tabIndex="0">
                    <ul className='sort__menu--list'>
                        <li id='default-menu-item'
                            className='sort__menu--item field__hovered-btn sort__comp'
                            tabIndex="0"
                            onClick={(e)=>updateSort(e, "")}
                            onBlur={(e) =>focusLost(e)}>Sort</li>
                        <li className='sort__menu--item field__hovered-btn sort__comp'
                            tabIndex="0"
                            onClick={(e)=>updateSort(e, "A_TO_Z")}
                            onBlur={(e) =>focusLost(e)}>Alphabetical A to Z</li>
                        <li className='sort__menu--item field__hovered-btn sort__comp'
                            tabIndex="0"
                            onClick={(e)=>updateSort(e, "Z_TO_A")}
                            onBlur={(e) =>focusLost(e)}>Alphabetical Z to A</li>
                        <li className='sort__menu--item field__hovered-btn sort__comp'
                            tabIndex="0"
                            onClick={(e)=>updateSort(e, "NEW_TO_OLD")}
                            onBlur={(e) =>focusLost(e)}>Newest to oldest</li>
                        <li className='sort__menu--item field__hovered-btn sort__comp'
                            tabIndex="0"
                            onClick={(e)=>updateSort(e, "OLD_TO_NEW")}
                            onBlur={(e) =>focusLost(e)}>Oldest to newest</li>
                    </ul>
                </div>
            </div>
            
            :
            <></>}

            <div className="field__box">
                <button className='field__btn field__btn--left field__hovered-btn' 
                        onClick={()=> navigate(-1)}>
                    <FontAwesomeIcon className='field__btn--icon' icon={faArrowLeft} />
                </button>
                <button className='field__btn field__btn--right field__hovered-btn' 
                        onClick={()=> navigate(1)}>
                    <FontAwesomeIcon className='field__btn--icon' icon={faArrowRight} />
                </button>
            </div>
        </div>


    </div>
  )
}

export default SearchBar;

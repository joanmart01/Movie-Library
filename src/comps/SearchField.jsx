import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchField = ({initialTxt}) => {
    const [searchText, setSearchText] = useState(initialTxt || "");
    let navigate = useNavigate();

    return (
        <div id="search-input" className='field__box'>
            <input  className="field field__search" 
                    type="text" 
                    placeholder="Search..."
                    value={searchText}
                    autoFocus
                    onChange={(e)=> setSearchText(e.target.value)} 
                    onKeyPress={(e) => e.key === "Enter" && searchText.trim()!=="" && navigate(`/movies/${searchText}`)}  />
            <button className='field field__btn field__btn--right field__hovered-btn'
                    disabled={searchText.trim()===""}
                    onClick={() => navigate(`/movies/${searchText}`)}>
                <FontAwesomeIcon className='field__btn--icon' icon={faMagnifyingGlass} />
            </button>
        </div>
    )
}

export default SearchField;

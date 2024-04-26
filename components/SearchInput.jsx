import React from 'react'
import { CiSearch } from "react-icons/ci";

const SearchInput = ({value, onChange, onClick}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <span className='search-bar-container'>
          <input type="text" className='search-bar' placeholder='Search Products'
          value={value} onChange={onChange} onKeyDown={handleKeyPress}/>
          <button type="submit" className="searchButton" onClick={onClick}>
            <CiSearch className='search-icon'/>
          </button>
    </span>
  )
}

export default SearchInput;
import React from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./search-input.css"

export default function SearchInput({setSearchQuery, placeholder}) {
  return (
    <div className="search-input-container">
        <button className="search-button">
          <FontAwesomeIcon icon={faSearch} color="white" size="1x" />
        </button>
        <input className="search-input" placeholder={placeholder} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
  )
}

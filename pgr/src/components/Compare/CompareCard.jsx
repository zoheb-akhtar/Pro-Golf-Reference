import React from 'react'
import countryCodes from '../../utils/countryCodes'
import "./compare.css"
import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import CompareSearchInput from './CompareSearchInput'

export default function CompareCard({playerSearchQuery, setPlayerSearchQuery, noResults, playerResults, setThisPlayer, player, setPlayerResults, removePlayer, localStorageKey, placeholder}) {
    const navigate = useNavigate()

    function removePlayer() {
        localStorage.removeItem(localStorageKey)
        setThisPlayer(null)
        setPlayerSearchQuery("")
      }

  return (
    <div className="player-container">
      
      {player ? null : <CompareSearchInput 
      playerSearchQuery={playerSearchQuery}
      placeholder={placeholder}
      setPlayerSearchQuery={setPlayerSearchQuery}
      noResults={noResults}
      playerResults={playerResults}
      setPlayerResults={setPlayerResults}
      setThisPlayer={setThisPlayer}
      />}
      {player ? 
      <div className="player-compare-card">
        <button onClick={removePlayer} className="close-button">&#10005;</button>
        <div onClick={() => navigate(`/player/${player.id}`)} className="name-label-click">
        <p className="player-one-name">{player.name}</p>
        <FontAwesomeIcon className="player-arrow" icon={faArrowRight}/>
        </div>
       
        <img className="player-one-img" src={player.img}></img>
        <div className="nation-and-league-compare-container">
          <img className="player-one-flag" src={`/images/flags/${countryCodes[player.nation]}.svg`}></img>
          <p className="player-one-nation">{player.nation.toUpperCase()}</p>
          <img style={player.league === "LIV" ? {width: "80px"} : null}className="player-one-league" src={player.league === "PGA" ? "/images/pga.png" : "/images/liv.png"}></img>
        </div>
      </div>
      : <div className="select-player-box">
        <p className="select-player-text">Select Player One</p>
        </div>}
      </div>
  )
}

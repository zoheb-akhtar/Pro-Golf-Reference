import React from 'react'
import countryCodes from '../../countryCodes.js'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router'
import "./player-card.css"

export default function PlayerCard({player}) {
    const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/player/${player.id}`)} key={player.id} className="player">
          <img style={player.league === "LIV" ? {width: "70px"} : null}className="player-league" src={player.league === "PGA" ? "/images/pga.png" : "/images/liv.png"}></img>
          <img className="player-img" src={player.img}></img>
          <div className="bottom">
            <div className="left-section">
            <p className="player-name">{player.name.toUpperCase()}</p>
            <div className="nation-container">
            <img className="player-nation-img" src={`/images/flags/${countryCodes[player.nation]}.svg`}></img>
            <p className="player-nation">{player.nation.toUpperCase()}</p>
            </div>
            </div>
            <FontAwesomeIcon className="player-arrow" icon={faArrowRight}/>
          </div>
        </div>
  )
}

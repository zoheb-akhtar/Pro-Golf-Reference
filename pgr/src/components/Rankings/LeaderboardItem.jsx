import React from 'react'
import { useNavigate } from 'react-router'
import countryCodes from '../../utils/countryCodes'
import "./rankings.css"


export default function LeaderboardItem({player, selectedStat, isSG, isPercent}) {
    const navigate = useNavigate()

    return (
    <div key={`${player.id}`} className="player-section">
    <div className="leaderboard-left-section">
    <p className="player-leaderboard-rank">{selectedStat === "world_ranking" ? player.world_ranking : player[`${selectedStat}_rank`]}</p>
    <img className="player-leaderboard-img" src={player.img}></img>
    <div className="name-nation-container">
    <p onClick={() => navigate(`/player/${player.id}`)} className="player-leaderboard-name">{player.name.toUpperCase()}</p>
    <div className="leaderboard-nation-and-league">
      <img className="leaderboard-flag-img" src={`/images/flags/${countryCodes[player.nation]}.svg`}></img>
      <p className="leaderboard-nation">{player.nation.toUpperCase()}</p>
      <img style={player.league === "LIV" ? {width: "48px"} : null} className="leaderboard-league" src={player.league === "PGA" ? "/images/pga.png" : "/images/liv.png"}></img>
    </div>
    </div>
    
    </div>
    {selectedStat != "world_ranking" ? <p className="stat-value">{`${isSG && player[selectedStat] > 0 ? "+" : ""}${player[selectedStat]}${isPercent}`}</p> : null}
  </div>
  )
}

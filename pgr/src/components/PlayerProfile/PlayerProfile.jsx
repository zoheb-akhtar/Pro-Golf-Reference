import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import countryCodes from '../../utils/countryCodes'
import "./player-profile.css"

export default function PlayerPage() {
    const { id } = useParams()
    const [player, setPlayer] = useState()

    useEffect(() => {
      async function getPlayerFromID() {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/players/id/${id}`)
          const data = await res.json()
          if (!res.ok){
            throw new Error(data.error)
          }
          setPlayer(data)
        } catch (error) {
          console.error("Error fetching players", error.message)
        }
      }
      getPlayerFromID()
    }, [])

  return (
    <div>
      {player ? <div className="player-page-container">
      <img className="left-image" src={player.img}></img>
          <div className="right-side-container">
            <div className="name-container">
            <p className="player-page-first-name">{player.name.split(" ")[0]}</p><br />
            <p className="player-page-second-name">{player.name.split(" ")[1]}</p>
            <p className="player-page-last-name">{player.name.split(" ")[2]}</p>
            
            </div>
            <div className="player-nation-and-league-container">
            <div className="player-page-nation-container">
              <img className="player-page-flag" src={`/images/flags/${countryCodes[player.nation]}.svg`}></img>
              <p className="player-page-nation">{player.nation.toUpperCase()}</p>
            </div>
            <img style={player.league === 'LIV' ? {width: '100px'} : null}className="player-page-league-logo" src={player.league === 'PGA' ? "/images/pga.png" : "/images/liv.png"}></img>
            </div>
            <p className="player-world-ranking">{`WORLD #${player.world_ranking}`}</p>
            <div className="player-stats-container">

            <div className="stat-tile">
                <p className="stat-title">Scoring Average</p>
                <div className="stat-value">{player.scoring_avg} <span className="player-page-rank">{`(#${player.scoring_avg_rank})`}</span></div>
              </div>

              <div className="stat-tile">
                <p className="stat-title">Birdie Average</p>
                <div className="stat-value">{player.birdie_avg} <span className="player-page-rank">{`(#${player.birdie_avg_rank})`}</span></div>
              </div>

              <div className="stat-tile">
                <p className="stat-title">Driving Average</p>
                <div className="stat-value">{player.driving_avg} <span className="player-page-rank">{`(#${player.driving_avg_rank})`}</span></div>
              </div>

              <div className="stat-tile">
                <p className="stat-title">Fairways Hit</p>
                <div className="stat-value">{`${player.fairways}%`} <span className="player-page-rank">{`(#${player.fairways_rank})`}</span></div>
              </div>

              <div className="stat-tile">
                <p className="stat-title">Greens In Regulation</p>
                <div className="stat-value">{`${player.gir}%`} <span className="player-page-rank">{`(#${player.gir_rank})`}</span></div>
              </div>

              <div className="stat-tile">
                <p className="stat-title">Scrambling</p>
                <div className="stat-value">{`${player.scrambling}%`} <span className="player-page-rank">{`(#${player.scrambling_rank})`}</span></div>
              </div>

              <div className="stat-tile">
                <p className="stat-title">Strokes Gained: Approach</p>
                <div className="stat-value">{`${player.sg_approach > 0 ? '+' : ""}${player.sg_approach}`} <span className="player-page-rank">{`(#${player.sg_approach_rank})`}</span></div>
              </div>

              <div className="stat-tile">
                <p className="stat-title">Strokes Gained: Putting</p>
                <div className="stat-value">{`${player.sg_putting > 0 ? '+' : ""}${player.sg_putting}`} <span className="player-page-rank">{`(#${player.sg_putting_rank})`}</span></div>
              </div>

              <div className="stat-tile">
              <p className="stat-title">Strokes Gained: Total</p>
              <div className="stat-value">{`${player.sg_total > 0 ? '+' : ''}${player.sg_total}`} <span className="player-page-rank">{`(#${player.sg_total_rank})`}</span> </div>
            </div>

            </div>
          </div>
      </div> : 'Loading player...'}
    </div>
  )
}

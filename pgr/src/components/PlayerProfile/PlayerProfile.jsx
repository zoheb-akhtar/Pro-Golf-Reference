import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import countryCodes from '../../utils/countryCodes'
import StatTile from './StatTile'
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

              {[
                { title: "Scoring Average", value: player.scoring_avg, rank: player.scoring_avg_rank },
                { title: "Birdie Average", value: player.birdie_avg, rank: player.birdie_avg_rank },
                { title: "Driving Average", value: player.driving_avg, rank: player.driving_avg_rank },
                { title: "Fairways Hit", value: `${player.fairways}%`, rank: player.fairways_rank },
                { title: "Greens In Regulation", value: `${player.gir}%`, rank: player.gir_rank },
                { title: "Scrambling", value: `${player.scrambling}%`, rank: player.scrambling_rank },
                { title: "Strokes Gained: Approach", value: `${player.sg_approach > 0 ? "+" : ""}${player.sg_approach}`, rank: player.sg_approach_rank },
                { title: "Strokes Gained: Putting", value: `${player.sg_putting > 0 ? "+" : ""}${player.sg_putting}`, rank: player.sg_putting_rank },
                { title: "Strokes Gained: Total", value: `${player.sg_total > 0 ? "+" : ""}${player.sg_total}`, rank: player.sg_total_rank },
              ].map((statTile) => {
                return <StatTile key={statTile.title} statName={statTile.title} stat={statTile.value} statRank={statTile.rank}/>
              })}

            </div>
          </div>
      </div> : 'Loading player...'}
    </div>
  )
}

import React from 'react'

export default function StatTile({statName, stat, statRank}) {
  return (
    <div className="stat-tile">
        <p className="stat-title">{statName}</p>
         <div className="stat-value">{stat} <span className="player-page-rank">#{statRank}</span></div>
    </div>
  )
}

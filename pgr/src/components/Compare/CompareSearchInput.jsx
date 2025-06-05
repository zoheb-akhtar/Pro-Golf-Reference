import React from 'react'


export default function CompareSearchInput({playerSearchQuery, placeholder, setPlayerSearchQuery, noResults, playerResults, player, setPlayerResults, setThisPlayer, localStorageKey}) {

    function handleSelect(player) {
        setThisPlayer(player)
        localStorage.setItem(localStorageKey, JSON.stringify(player))
        setPlayerResults([])
        setPlayerSearchQuery("")
    }

  return (
    <div className="input-box">
      {player ? null : <input value={playerSearchQuery} type="text" placeholder={placeholder} className="player-one-search" onChange={(e) => setPlayerSearchQuery(e.target.value)}/>}
      {playerSearchQuery.length > 0 && !noResults ? <div className="search-results-box">
        <ul className="search-results-list">
          {playerResults.slice(0,3).map((player) => {
            return <li key={player.id} onClick={() => handleSelect(player)} className="search-result">{player.name}</li>
          })}
        </ul>
      </div> : null}
      </div> 
  )
}

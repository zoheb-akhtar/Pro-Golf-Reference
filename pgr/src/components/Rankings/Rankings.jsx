import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import countryCodes from '../../countryCodes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import "./rankings.css"
import LeaderboardItem from '../LeaderboardItem/LeaderboardItem'

export default function Rankings() {
  const [selectedStat, setSelectedStat] = useState("world_ranking")
  const [players, setPlayers] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(1)
  const [showMore, setShowMore] = useState(true)
  const [noResults, setNoResults] = useState(false)

  async function getRankingsByStat(selectedStat) {
    setNoResults(false)
    setShowMore(false)
    try {
      const direction = selectedStat === "world_ranking" || selectedStat === "scoring_avg" ? "asc" : "desc"
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/players/stat?stat=${selectedStat}&direction=${direction}&${searchQuery ? `name=${searchQuery}` : ""}&pageNumber=${pageNumber}`)
      const data = await res.json()

      console.log(data.players)

      if (data.players.length < 25) {
        setShowMore(false)
      } else {
        setShowMore(true)
      }

      if (!res.ok) {
        throw new Error(data.error)
        return data
      }
      
      formatRank(selectedStat, data.players)
    } catch (error) {
      console.error("Error getting players", error.message)
      setNoResults(true)
    }
    
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      setPageNumber(1)
      setShowMore(true)
      setPlayers([])
      getRankingsByStat(selectedStat)
    }, 300)

    return () => {
      clearTimeout(debounce)
    }
    
  }, [searchQuery, selectedStat])

  useEffect(() => {
    getRankingsByStat(selectedStat)
  }, [pageNumber])

  const isPercent = selectedStat === "fairways" || selectedStat === "gir" || selectedStat === "scrambling" ? "%" : ""
  const isSG = selectedStat === "sg_approach" || selectedStat === "sg_putting" || selectedStat === "sg_total"

  function formatRank(selectedStat, players) {
    const updatedPlayers = players.map((player, index) => {
      const prevPlayer = players[index - 1];
      const nextPlayer = players[index + 1];
  
      if ((prevPlayer && prevPlayer[selectedStat] === player[selectedStat]) || 
          (nextPlayer && nextPlayer[selectedStat] === player[selectedStat])) {
        return { 
          ...player, 
          [`${selectedStat}_rank`]: `T${player[`${selectedStat}_rank`]}` 
        };
      } else {
        return player;
      }
    })

    if (pageNumber === 1) {
      setPlayers(updatedPlayers)
    } else {
      setPlayers(prevPlayers => [...prevPlayers, ...updatedPlayers])
    }
  }
  
  function nextPage() {
    setPageNumber(prevPageNumber => prevPageNumber + 1)
  }

  return (
    <>
    <div className="rankings-page-top">
        <h1 className="rankings-header">Rankings</h1>
    <div className="search-input-container">
    <button style={{marginLeft: "32px", marginBottom: "18px"}}className="search-button">
        <FontAwesomeIcon icon={faSearch} color="white" size="1x"/>
      </button>
      <input className="search-input" placeholder="Search the leaderboard" onChange={(e) => setSearchQuery(e.target.value)}/>
    </div>
   
   <div className="select-container">
   <label className="select-label" htmlFor="stat-select">Rank By: </label>
    <select className="select" value={selectedStat} onChange={(e) => setSelectedStat(e.target.value)} id="stat-select">
      <option value="world_ranking">World Ranking</option>
      <option value="scoring_avg">Scoring Average</option>
      <option value="birdie_avg">Birdie Average</option>
      <option value="driving_avg">Driving Average</option>
      <option value="fairways">Fairways Hit</option>
      <option value="scrambling">Scrambling</option>
      <option value="sg_approach">Strokes Gained: Approach</option>
      <option value="sg_putting">Strokes Gained: Putting</option>
      <option value="sg_total">Strokes Gained: Total</option>
    </select>
   </div>
  
    </div>
    <div className="leaderboard-container">
      {players.map((player, index) => {
        return <LeaderboardItem player={player} selectedStat={selectedStat} isSG={isSG} isPercent={isPercent} />
      })}
    </div>
    {noResults ? <p className="error-msg-players">No results found</p> : null}
    {showMore ? <button className="show-more-button-rankings" onClick={nextPage}>Show more</button> : null}
    
    
  </>


  )
}

import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import countryCodes from '../../countryCodes.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import "./compare.css"


export default function Compare() {
  const [playerOneResults, setPlayerOneResults] = useState([])
  const [playerTwoResults, setPlayerTwoResults] = useState([])
  const [playerOneSearchQuery, setPlayerOneSearchQuery] = useState("")
  const [playerTwoSearchQuery, setPlayerTwoSearchQuery] = useState("")
  const [playerOne, setPlayerOne] = useState()
  const [playerTwo, setPlayerTwo] = useState()
  const [noResults, setNoResults] = useState(false)
  const navigate = useNavigate()
  const table = useRef(null)

  useEffect(() => {
    if (playerOne && playerTwo && table.current != null) {
      table.current.scrollIntoView({behavior: "smooth"})
    }
  }, [playerOne, playerTwo])

  useEffect(() => {
    const savedPlayerOne = localStorage.getItem("playerOne")
    const savedPlayerTwo = localStorage.getItem("playerTwo")
  
    if (savedPlayerOne) {
      setPlayerOne(JSON.parse(savedPlayerOne))
    }
    if (savedPlayerTwo) {
      setPlayerTwo(JSON.parse(savedPlayerTwo))
    }
  }, [])

 async function getPlayerFromSearch(searchQuery, setter) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/players?name=${searchQuery.trim()}`)
    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error)
      return data
    }
    setter(data.players)
    setNoResults(false)
  } catch (error) {
    setter([])
    setNoResults(true)
  }
 }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (playerOneSearchQuery.trim() === "") {
        setPlayerOneResults([])
      }
      if (playerOneSearchQuery.trim().length > 0){
        getPlayerFromSearch(playerOneSearchQuery, setPlayerOneResults)
      }
    }, 300)

    return () => {
      clearTimeout(timeout)
    }
    
  }, [playerOneSearchQuery])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (playerTwoSearchQuery.trim() === "") {
        setPlayerTwoResults([])
      }
  
      if (playerTwoSearchQuery.trim().length > 0){
        getPlayerFromSearch(playerTwoSearchQuery, setPlayerTwoResults)
      }
    }, 300)

    return () => {
      clearTimeout(timeout)
    }
    
  }, [playerTwoSearchQuery])

  function setPlayer(player, setter, searchResultsSetter, searchQuerySetter, key) {
    setter(player)
    localStorage.setItem(key, JSON.stringify(player))
    searchResultsSetter([])
    searchQuerySetter("")
  }

  function formatValues(player, statForPlayer) {
    const isPercent = statForPlayer === "gir" || statForPlayer === "fairways" || statForPlayer === "scrambling" ? "%" : ""
    const isSg = (statForPlayer === "sg_approach" || statForPlayer === "sg_putting" || statForPlayer === "sg_total") && player[statForPlayer] > 0 ? "+" : ""
    return `${isSg}${player[statForPlayer]}${isPercent}`
  }

  function createTableRow(statForPlayer, stat) {
    let playerOneClass
    let playerTwoClass
    if (statForPlayer === "world_ranking" || statForPlayer === "scoring_avg") {
      playerOneClass = playerOne[statForPlayer] < playerTwo[statForPlayer] ? "stat-better-than" : "stat-worse-than";
      playerTwoClass = playerTwo[statForPlayer] < playerOne[statForPlayer] ? "stat-better-than" : "stat-less-than"
    } else {
      playerOneClass = playerOne[statForPlayer] > playerTwo[statForPlayer] ? "stat-better-than" : "stat-worse-than";
      playerTwoClass = playerTwo[statForPlayer] > playerOne[statForPlayer] ? "stat-better-than" : "stat-less-than"
    }

    return <tr>
    <td className={playerOneClass}>{formatValues(playerOne, statForPlayer)}</td>
    <td>{stat}</td>
    <td className={playerTwoClass}>{formatValues(playerTwo, statForPlayer)}</td>
  </tr>
  }

  function removePlayer(key, setter) {
    localStorage.removeItem(key)
    setter(null)
  }

  return (

    <>
    <h1 className="compare-header">Compare Players</h1>
    <div className="compare-page-container">
      <div className="players-compare-container">
      <div className="player-one-container">
      <div className="input-box">
      {playerOne ? null : <input value={playerOneSearchQuery} type="text" placeholder="Search for Player One" className="player-one-search" onChange={(e) => setPlayerOneSearchQuery(e.target.value)}/>}
      {playerOneSearchQuery.length > 0 && !noResults ? <div className="search-results-box">
        <ul className="search-results-list">
          {playerOneResults.slice(0,3).map((player) => {
            return <li key={player.id} onClick={() => setPlayer(player, setPlayerOne, setPlayerOneResults, setPlayerOneSearchQuery, "playerOne")} className="search-result">{player.name}</li>
          })}
        </ul>
      </div> : null}
      </div> 
      {playerOne ? 
      <div className="player-compare-card">
        <button onClick={() => removePlayer("playerOne", setPlayerOne)} className="close-button">&#10005;</button>
        <div onClick={() => navigate(`/player/${playerOne.id}`)} className="name-label-click">
        <p className="player-one-name">{playerOne.name}</p>
        <FontAwesomeIcon className="player-arrow" icon={faArrowRight}/>
        </div>
       
        <img className="player-one-img" src={playerOne.img}></img>
        <div className="nation-and-league-compare-container">
          <img className="player-one-flag" src={`../../public/images/flags/${countryCodes[playerOne.nation]}.svg`}></img>
          <p className="player-one-nation">{playerOne.nation.toUpperCase()}</p>
          <img style={playerOne.league === "LIV" ? {width: "80px"} : null}className="player-one-league" src={playerOne.league === "PGA" ? "../../public/images/pga.png" : "../../public/images/liv.png"}></img>
        </div>
      </div>
      : <div className="select-player-box">
        <p className="select-player-text">Select Player One</p>
        </div>}
      </div>
      <div className="vs-middle">
      <div className="vl"></div>
      <div className="vs">V.S.</div>
      <div className="vl"></div>
      </div>
      <div className="player-two-container">
      <div className="input-box">
      {playerTwo ? null : <input value={playerTwoSearchQuery} type="text" placeholder="Search for Player Two" className="player-one-search" onChange={(e) => setPlayerTwoSearchQuery(e.target.value)}/>}
      {playerTwoSearchQuery.length > 0 && !noResults ? <div className="search-results-box">
        <ul className="search-results-list">
          {playerTwoResults.slice(0,3).map((player) => {
            return <li key={player.id} onClick={() => setPlayer(player, setPlayerTwo, setPlayerTwoResults, setPlayerTwoSearchQuery, "playerTwo")} className="search-result">{player.name}</li>
          })}
        </ul>
      </div> : null}
      </div> 
      {playerTwo ? <div className="player-compare-card">
        <button onClick={() => removePlayer("playerTwo", setPlayerTwo)} className="close-button">&#10005;</button>
        <div onClick={() => navigate(`/player/${playerTwo.id}`)} className="name-label-click">
        <p className="player-one-name">{playerTwo.name}</p>
        <FontAwesomeIcon className="player-arrow" icon={faArrowRight}/>
        </div>
        <img className="player-one-img" src={playerTwo.img}></img>
        <div className="nation-and-league-compare-container">
          <img className="player-one-flag" src={`../../public/images/flags/${countryCodes[playerTwo.nation]}.svg`}></img>
          <p className="player-one-nation">{playerTwo.nation.toUpperCase()}</p>
          <img style={playerTwo.league === "LIV" ? {width: "80px"} : null}className="player-one-league" src={playerTwo.league === "PGA" ? "../../public/images/pga.png" : "../../public/images/liv.png"}></img>
        </div>
      </div> : <div className="select-player-box">
        <p className="select-player-text">Select Player Two</p>
        </div>}
      </div>
      </div>
      
      {playerOne && playerTwo ? <div className="table-container">
      <table ref={table}>
      <tr>
        <th>{playerOne.name}</th>
        <th>Stats</th>
        <th>{playerTwo.name}</th>
      </tr>
        {createTableRow("world_ranking", "World Ranking")}
        {createTableRow("scoring_avg", "Scoring Average")}
        {createTableRow("birdie_avg", "Birdie Average")}
        {createTableRow("driving_avg", "Driving Average")}
        {createTableRow("fairways", "Fairways Hit")}
        {createTableRow("gir", "Greens in Regulation")}
        {createTableRow("scrambling", "Scrambling")}
        {createTableRow("sg_approach", "Strokes Gained: Approach")}
        {createTableRow("sg_putting", "Strokes Gained: Putting")}
        {createTableRow("sg_total", "Strokes Gained: Total")}
      </table>
      </div> : null}
      
    </div>
   
   
    
    </>
  )
}

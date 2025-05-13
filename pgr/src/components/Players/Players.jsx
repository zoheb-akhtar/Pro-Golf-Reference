import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState, useEffect} from 'react'
import PlayerCard from '../PlayerCard/PlayerCard'
import countryCodes from '../../countryCodes'
import "./players.css"

export default function Players() {
  const [players, setPlayers] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [noResults, setNoResults] = useState()
  const [leagueFilter, setLeagueFilter] = useState("all")
  const [nationFilter, setNationFilter] = useState("all")
  const [pageNumber, setPageNumbers] = useState(1)
  const [showMore, setShowMore] = useState(true)

  async function getAllPlayers() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/players`)
      const data = await res.json()
      if (!res.ok){
        throw new Error(data.error)
      }
      setPlayers(data.players)
    } catch (error) {
      console.error("Error fetching players", error.message)
    }
  }

  useEffect(() => {
    getAllPlayers()
  }, [])

  useEffect(() => {
    setPageNumbers(1)
    setShowMore(true)
    setPlayers([])
  }, [nationFilter, searchQuery, leagueFilter])
 
  useEffect(() => {
     async function getPlayers() {
      try {
        const params = new URLSearchParams()

        if (nationFilter && nationFilter !== "all"){
          params.append("nation", nationFilter)
        }
        if (leagueFilter && leagueFilter !== "all"){
          params.append("league", leagueFilter)
        }
        if (searchQuery.trim()){
          params.append("name", searchQuery.trim())
        }

        params.append("pageNumber", pageNumber)
        params.append("playerAmount", 25)

        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/players?${params.toString()}`)
        const data = await res.json()

        if (data.players.length < 25) {
          setShowMore(false)
        }

        if (!res.ok) {
          throw new Error(data.error)
          return data
        }
        if (pageNumber === 1){
          setPlayers(data.players)
        } else {
          setPlayers(prevPlayers => [...prevPlayers, ...data.players])
        }
        setNoResults(false)
      } catch (error) {
        setPlayers([])
        setShowMore(false)
        setNoResults(true)
      }
     }

     getPlayers()
  }, [searchQuery, nationFilter, leagueFilter, pageNumber])


  function appendPlayers() {
    setPageNumbers(prevPage => prevPage + 1)
  }


  return (
    <>
    <div className="players-page-top">
      <h1 className="heading-search">Search</h1>
      <button className="search-button">
        <FontAwesomeIcon icon={faSearch} color="white" size="1x"/>
      </button>
      <input className="search-input" placeholder="Search for players" onChange={(e) => setSearchQuery(e.target.value)}/>
      
      <div className="selects-container">
      <label htmlFor="select-nation">Nation: </label>
      <select onChange={(e) => setNationFilter(e.target.value)} id="select-nation" className="select">
        <option value="all">All</option>
        {Object.keys(countryCodes).map((country) => {
          return <option value={country}>{country}</option>
        })}
      </select>
      
      <label htmlFor="select-league">League: </label>
      <select onChange={(e) => setLeagueFilter(e.target.value)} id="select-league" className="select">
        <option value="all">All</option>
        <option value="PGA">PGA</option>
        <option value="LIV">LIV</option>
      </select>
      </div>
      
    </div>
    <div className="players-container">
      {noResults ? <p className="error-msg-players">No results found</p> : players.map((player) => {
        return <PlayerCard key={player.id} player={player} />
      })}
    </div>
    {showMore ? <button className="show-more-button" onClick={appendPlayers}>Show more</button> : null}
    </>
  )
}

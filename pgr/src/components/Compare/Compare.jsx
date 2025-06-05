import React, { useState, useEffect } from 'react'
import CompareCard from './CompareCard.jsx'
import CompareStatsTable from './CompareStatsTable.jsx'
import "./compare.css"


export default function Compare() {
  const [playerOneResults, setPlayerOneResults] = useState([])
  const [playerTwoResults, setPlayerTwoResults] = useState([])
  const [playerOneSearchQuery, setPlayerOneSearchQuery] = useState("")
  const [playerTwoSearchQuery, setPlayerTwoSearchQuery] = useState("")
  const [playerOne, setPlayerOne] = useState()
  const [playerTwo, setPlayerTwo] = useState()
  const [noResults, setNoResults] = useState(false)

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
    const debounce = setTimeout(() => {
      if (playerTwoSearchQuery.trim() === "") {
        setPlayerTwoResults([])
      }
  
      if (playerTwoSearchQuery.trim().length > 0){
        getPlayerFromSearch(playerTwoSearchQuery, setPlayerTwoResults)
      }
    }, 300)

    return () => {
      clearTimeout(debounce)
    }
    
  }, [playerTwoSearchQuery])

  return (

    <>
    <div className="compare-page-container">
    <h1 className="compare-header">Compare Players</h1>
      <div className="players-compare-container">

      <CompareCard 
      playerSearchQuery={playerOneSearchQuery}
      setPlayerSearchQuery={setPlayerOneSearchQuery}
      noResults={noResults}
      playerResults={playerOneResults}
      setThisPlayer={setPlayerOne}
      player={playerOne}
      setPlayerResults={setPlayerOneResults}
      localStorageKey={"playerOne"}
      placeholder={"Search for Player One"}
      />

      <div className="vs-middle">
      <div className="vl"></div>
      <div className="vs">V.S.</div>
      <div className="vl"></div>
      </div>

      <CompareCard 
      playerSearchQuery={playerTwoSearchQuery}
      setPlayerSearchQuery={setPlayerTwoSearchQuery}
      noResults={noResults}
      playerResults={playerTwoResults}
      setThisPlayer={setPlayerTwo}
      player={playerTwo}
      setPlayerResults={setPlayerTwoResults}
      localStorageKey={"playerTwo"}
      placeholder={"Search for Player Two"}
      />
      </div>

      {playerOne && playerTwo ? <CompareStatsTable playerOne={playerOne} playerTwo={playerTwo}/>: null}
      
    </div>
   
   
    
    </>
  )
}

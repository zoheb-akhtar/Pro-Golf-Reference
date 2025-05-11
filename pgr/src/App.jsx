import { useState } from 'react'
import './index.css'
import { Route, Routes } from 'react-router'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Compare from './components/Compare/Compare'
import Players from './components/Players/Players'
import Rankings from './components/Rankings/Rankings'
import PlayerPage from './components/PlayerPage/PlayerPage'


function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/players" element={<Players/>} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/player/:id" element={<PlayerPage />} />
      </Route>
    </Routes>
  )
}

export default App

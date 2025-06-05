import './index.css'
import { Route, Routes } from 'react-router'
import Home from './components/Home/Home'
import Compare from './components/Compare/Compare'
import Players from './components/Players/Players'
import Rankings from './components/Rankings/Rankings'
import PlayerPage from './components/PlayerProfile/PlayerProfile'
import Navbar from './components/Navbar/Navbar'



function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
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

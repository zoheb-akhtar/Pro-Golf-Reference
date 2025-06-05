import React from 'react'
import "./home.css"
import {faArrowsAltH, faListOl, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import HomeFeatureCard from './HomeFeatureCard'

export default function Home() {
  return (
    <>
    <div className="home-page">
      <div className="heading-title fade-in-up">Track the World's Best Golfers</div>
      <p className="subheading fade-in-up">Your home for professional golf stats and information!</p>
      <div className="features-container fade-in-up">
        
      <HomeFeatureCard 
        icon={faArrowsAltH}
        title={"Compare Players"}
        subtitle={"Compare the stats of the world's best players."}
        link={"/compare"}
        />

      <HomeFeatureCard 
        icon={faUserFriends}
        title={"Search for players"}
        subtitle={"Search for your favorite players across all countries and leagues."}
        link={"/players"}
        />

      <HomeFeatureCard 
        icon={faListOl}
        title={"See Player Stat Rankings"}
        subtitle={"See how players compare based on their stats."}
        link={"/rankings"}
        />
        
        
      </div>
    </div>
    
       
    </>
  )
}

import React from 'react'
import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./home.css"
import {faArrowsAltH, faListOl, faUserFriends } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <>
    <div className="home-page">
      <div className="heading-title fade-in-up">Track the World's Best Golfers</div>
      <p className="subheading fade-in-up">Your home for professional golf stats and information!</p>
      <div className="features-container fade-in-up">
        <Link classname="card-link" to="/compare">
        <div className="feature">
            <FontAwesomeIcon icon={faArrowsAltH} color="#D4AF37" size="2x"></FontAwesomeIcon>
            <p className="feature-header">Compare Players</p>
            <div className="feature-text">Compare the stats of the worlds best players.</div>
        </div>
        </Link>
        
        <Link className="card-link" to="/players">
        <div className="feature">
            <FontAwesomeIcon icon={faUserFriends} color="#D4AF37" size="2x"></FontAwesomeIcon>
            <p className="feature-header">Search for players</p>
            <div className="feature-text">Search for your favorite players across all countries and leagues.</div>
        </div>
        </Link>
        <Link className="card-link" to="/rankings">
        <div className="feature">
            <FontAwesomeIcon icon={faListOl} color="#D4AF37" size="2x"/> 
            <p className="feature-header">See Player Stat Rankings</p>
            <div className="feature-text">See how players compare based on their stats.</div>
        </div>
        </Link>
        
      </div>
    </div>
    
       
    </>
  )
}

import React from 'react'
import AltLogo from "../../../public/images/logo2.png"
import { Link } from 'react-router'
import "./home.css"

export default function Home() {
  return (
    <>
    <div className="home-page">
      <img className="alt-logo" src={AltLogo}></img>
      <div className="text-container">
        <h1 className="top-line">Welcome to</h1>
        <h1 className="bottom-line">Pro Golf Reference</h1>
      </div>
      <p className="subheading">Your home for professional golf player stats and information</p>
      <Link to="/compare">
      <button className="home-get-started">Get Started</button>
      </Link>
    </div>
    
       
    </>
  )
}

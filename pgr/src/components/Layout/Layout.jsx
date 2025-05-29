import React, { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router'
import Logo from "/images/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faBars, faClose } from '@fortawesome/free-solid-svg-icons'
import "./layout.css"


export default function Layout() {
  const [showNav, setShowNav] = useState(false)
  return (
    <>
    <div className="header">
      <div className="logo-container">
      <Link className="logo-link" to="/">
            <img className="logo-img" src={Logo}/>
        </Link>
      </div>
        <div className={showNav ? "mobile-show" : "nav"}>
          <NavLink className={({ isActive }) => isActive ? "home-link active" : "home-link"} to="/">
            <p className="link-text">Home</p>
          </NavLink>
          <NavLink className={({ isActive }) => isActive ? "compare-link active" : "compare-link"} to="/compare">
            <p className="link-text">Compare</p>
          </NavLink>
          <NavLink className={({ isActive }) => isActive ? "players-link active" : "players-link"} to="/players">
            <p className="link-text">Players</p>
          </NavLink>
          <NavLink className={({ isActive }) => isActive ? "rankings-link active" : "rankings-link"} to="/rankings">
            <p className="link-text">Rankings</p>
          </NavLink>
          <FontAwesomeIcon onClick={() => setShowNav(false)} icon={faClose} color="black" size="1x" className="close-icon"/>
        </div>
        <FontAwesomeIcon onClick={() => setShowNav(true)}icon={faBars} color="black" size="2x" className="hamburger-icon"/>
    </div>
    <Outlet />
    </>
  )
}

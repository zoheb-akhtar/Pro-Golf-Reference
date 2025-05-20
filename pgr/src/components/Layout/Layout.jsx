import React, { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router'
import Logo from "/images/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faArrowsLeftRight, faHome, faRankingStar, faUser, faBars, faClose } from '@fortawesome/free-solid-svg-icons'
import "./layout.css"


export default function Layout() {
  const [showNav, setShowNav] = useState(false)
  return (
    <>
    <div className="header">
        <Link to="/">
            <h2 className="logo-text">Pro Golf Reference</h2>
        </Link>
        <div className={showNav ? "mobile-show" : "nav"}>
          <NavLink className="home-link" to="/">
            <FontAwesomeIcon className="nav-icon" icon={faHome} color="white" size="2x" />
          </NavLink>
          <NavLink className="compare-link" to="/compare">
            <FontAwesomeIcon className="nav-icon" icon={faArrowsLeftRight} color="white" size="2x"/>
          </NavLink>
          <NavLink className="players-link" to="/players">
            <FontAwesomeIcon className="nav-icon" icon={faUser} color="white" size="2x" />
          </NavLink>
          <NavLink className="rankings-link" to="/rankings">
            <FontAwesomeIcon className="nav-icon" icon={faRankingStar} color="white" size="2x" />
          </NavLink>
          <FontAwesomeIcon onClick={() => setShowNav(false)} icon={faClose} color="white" size="1x" className="close-icon"/>
        </div>
        <FontAwesomeIcon onClick={() => setShowNav(true)}icon={faBars} color="white" size="2x" className="hamburger-icon"/>
    </div>
    <Outlet />
    </>
  )
}

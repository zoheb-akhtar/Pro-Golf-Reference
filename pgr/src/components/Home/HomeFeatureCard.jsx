import React from 'react'
import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./home.css"

export default function HomeFeatureCard({icon, title, subtitle, link}) {
  return (
    <Link className="card-link" to={link}>
        <div className="feature">
            <FontAwesomeIcon icon={icon} color="#D4AF37" size="2x"/> 
            <p className="feature-header">{title}</p>
            <div className="feature-text">{subtitle}</div>
        </div>
    </Link>
  )
}

import React from 'react'
import Nav from './Nav'
import DateTime from './DateTime'
import { Link } from "react-router-dom"
import logo from '../../logo.png'
import  './style.css'

const Header = ({country}) => {
  return (
    <header>
      {/* logo */}
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      </Link>
      {/* navigation */}
      < Nav/>
      {/* date */}
      <DateTime country = {country} />
    </header>
  )
}

export default Header
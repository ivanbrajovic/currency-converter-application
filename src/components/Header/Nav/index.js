import React from 'react'
import {
  NavLink
} from "react-router-dom"
import './style.css'

const Nav = () => {
  return (
      <nav>
        <div className="menu-button" onClick={(event) => {
          event.target.parentNode.children[1].classList.toggle("responsive-menu")
        }}>
          	&#9776;
        </div>
        <ul>
          <li>
            <NavLink exact
              to="/"
              activeClassName="navbar__link--active"
              className="not-active">Home</NavLink>
          </li>
          <li>
            <NavLink
              to="/currency-info"
              activeClassName="navbar__link--active"
              className="not-active" >Currency Info</NavLink>
          </li>
        </ul>
      </nav>
    )
}

export default Nav
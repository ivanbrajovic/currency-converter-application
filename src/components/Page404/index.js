import React from 'react'
import { useLocation } from "react-router-dom"
import './style.css'

const Page404 = () => {
  let location = useLocation()
  return (
    <div className="page404">
      <h1>404 Page not find!</h1>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  )
}

export default Page404
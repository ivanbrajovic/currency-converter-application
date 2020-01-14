import React, { Component } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './style.css'

const Home = () => {
const timeNow = useSelector(state => state.setTime)
  

    return (
      <div className="home">
        <h1>Currency Converter</h1>
        <div className="today">Today, {timeNow}</div>
      </div>
    )
  
}

export default Home

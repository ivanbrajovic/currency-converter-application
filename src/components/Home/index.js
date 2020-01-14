import React  from 'react'
import  ChooseCurrencies from './ChooseCurrencies'
import { useSelector, useDispatch } from 'react-redux'
// impo
import './style.css'

const Home = () => {
  const timeNow = useSelector(state => state.setTime)
  return (
    <div className="home">
      <h1>Currency Converter</h1>
      <div className="today">Today, {timeNow}</div>
      <ChooseCurrencies />
    </div>
  )
  
}

export default Home

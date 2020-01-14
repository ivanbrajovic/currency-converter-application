import React from 'react'
import {
  lang_locale,
  days_localized,
  months_localized } from './language-support'
import { useSelector, useDispatch } from 'react-redux'
import { getPlace } from'../../../actions'
import './style.css'

const DateTime = ({country}) => {
  const date = new Date()
  const day = days_localized[country]
  const month = months_localized[country];
  console.log(days_localized,country)
  return (
    <div className="date">
      { country && (
        <>
          <span className="calendar">&#x1f4c5;</span>
          <span className="day">{day[date.getDay()]}</span>{", "}
          <span className="month">{date.getDate()+". "+month[date.getMonth()]+" "+date.getFullYear()}</span>
          <span className="time">data from: <span>{date.toLocaleTimeString()}</span></span>
        </>
      )}
    </div>
  )
}

export default DateTime

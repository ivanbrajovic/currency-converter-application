import React from 'react'
import {
  lang_locale,
  days_localized,
  months_localized } from './language-support'
import { useSelector, useDispatch } from 'react-redux'
import { setTime } from'../../../actions'
import './style.css'

const DateTime = ({country}) => {
  const date = new Date()
  const day = days_localized[country]
  const month = months_localized[country]
  useDispatch()(setTime())
  const timeNow = useSelector(state => state.setTime)
  return (
    <div className="date">
      { country && (
        <>
          <span className="calendar">&#x1f4c5;</span>
          <span className="day">{day[date.getDay()]}</span>{", "}
          <span className="month">{date.getDate()+". "+month[date.getMonth()]+" "+date.getFullYear()}</span>
          <span className="time">data from: <span>{timeNow.slice(timeNow.lastIndexOf(', ') + 1)}</span></span>
        </>
      )}
    </div>
  )
}

export default DateTime

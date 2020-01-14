import React  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './style.css'

const ChooseCurrencies = () => {
  return (
    <div className="choose-curencies">
      <div class="from-to from">
        <div>from</div>
      </div>
      <div class="invert">
        <div>&#8646;</div>
      </div>
      <div class="from-to to">
        <div>to</div>
      </div>
    </div>
  )
  
}

export default ChooseCurrencies

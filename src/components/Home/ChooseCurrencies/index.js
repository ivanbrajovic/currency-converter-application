
import React, { useState }  from 'react'
import { setCurrencyToConvert, setBase } from '../../../actions'
import { useSelector, useDispatch} from 'react-redux'
import './style.css'

const ChooseCurrencies = () => {
  const json_ = useSelector(state => state.json)
  const allCurrencies = useSelector(state => state.json.allCurrencies)
  const currency = useSelector(state => state.json?.base?.currencies[0])
  const currencyToConvert = useSelector(state =>  state.json?.value?.currencies[0])
  const [fromState, fromsetstate] = useState(false)
  const [toState, tosetstate] = useState(false)
  const dispatch = useDispatch()

  const showDropdownFrom = (event) => {
    fromsetstate(!fromState)
  }

  const showDropdownTo = event => {
    tosetstate(!toState)
  }

  const chooseNewCurrencyFrom = (event, n) => {
    const ct = event.currentTarget
    const cu = n.item|| ct.innerText.slice(0, ct.innerText.indexOf(" "))
    dispatch(setBase(cu))
  }

  const chooseNewCurrencyTo = (event, n) => {
    const ct = event.currentTarget
    const cu = n.item|| ct.innerText.slice(0, ct.innerText.indexOf(" "))
    dispatch(setCurrencyToConvert(cu))
  }
  const invertdata = () => {
    dispatch(setBase(json_?.value))
    dispatch(setCurrencyToConvert(json_?.base))
  }
  
  return (
    <div className="choose-curencies">
      <div className="from-to from">
        <div className="f-t">from</div>
        {
          currency && (
              <div className="currency-text">
                {currency.code} - {currency.name}
                &nbsp;<span>( { currency.symbol } )</span>
                <div className="arrow-down" onClick={showDropdownFrom}> &#9662;</div>
                { fromState && (
                  <ul>
                    { 
                      allCurrencies && (
                        allCurrencies.map((item, index) => (
                          <li
                            key={`${item.currencies[0].code}-${index}`}
                            value={item.currencies[0].code}
                            onClick={(event)=>chooseNewCurrencyFrom(event,{item})}>
                            {item.currencies[0].code} <span>{item.currencies[0].symbol}</span>
                            <div className="list-coutries-name">{item.name.length > 12 ? item.name.slice(0, 12) + '...': item.name}</div>
                          </li>
                        ))
                      )
                    }
                  </ul>)}
              </div>
          )
        }
      </div>
      <div className="invert" onClick={invertdata}>
        <div>&#8646;</div>
      </div>
      <div className="from-to to">
        <div className="f-t">to</div>
        {
          currencyToConvert && (
              <div className="currency-text">
               {currencyToConvert.code} - {currencyToConvert.name}
                &nbsp;<span>( { currencyToConvert.symbol } )</span>
                <div className="arrow-down" onClick={showDropdownTo}> &#9662;</div>
                { toState && (
                  <ul>
                    { 
                      allCurrencies && (
                        allCurrencies.map((item, index) => (
                          <li
                            key={`${item.currencies[0].code}-${index}`}
                            value={item.currencies[0].code}
                            onClick={(event)=>chooseNewCurrencyTo(event,{item})}>
                            {item.currencies[0].code} <span>{item.currencies[0].symbol}</span>
                             <div className="list-coutries-name">{item.name.length > 12 ? item.name.slice(0, 12) + '...': item.name}</div>
                          </li>
                        ))
                      )
                    }
                  </ul>)}
              </div>
          )
        }
      </div>
    </div>
  )
  
}

export default ChooseCurrencies

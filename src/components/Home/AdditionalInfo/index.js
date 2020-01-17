import React, { useState } from "react"
import { useSelector} from "react-redux"
import "./style.css"
import additional_background from '../../../additional_background.jfif'

const AdditionalInfo = () => {
  const all = useSelector(state => state.json)
  const flags = useSelector(state => state.json.allCurrencies)
  const coutriesToCompare = {
    '1': all.base,
    '2': all.value
  }
  const theme = useSelector(state => state.json?.t)
  const currencies = useSelector(state=> state?.json?.rate)
  const from = flags?.find(item => item.name === coutriesToCompare['1'].name)
  const to = flags?.find(item => item.name === coutriesToCompare['2'].name)
  const [toggle, settoggle] = useState(true)
  
  const toggle_hide = () => {
    settoggle(!toggle)
  }

  return (
    <div className="addition-info" style={
      {filter: `invert(${theme ? 1 : 0})`}
    }>
      
      {toggle && currencies && (<div>
      <div className="additional-back">
        <img alt="background" src={additional_background} />
      </div>
      <div className="currency-info">
        <h2><span className="currency-ad">{from.currencies[0].code}</span> - {from.name} &nbsp;&nbsp;&nbsp;
          <span>{from.currencies[0].symbol}</span>
        </h2>
        <div className="addition-image-flags">
          {from && <img alt="flag" src={from.flag} />}
    </div>
        &nbsp;<span style={{color: "lightpink"}}>{
        currencies&& (currencies.rates[from.currencies[0].code] / currencies.rates[to.currencies[0].code]).toFixed(8)}</span>
      </div>
      <div className="currency-info">
        <h2><span className="currency-ad">{to.currencies[0].code}</span> - {to.name}&nbsp;&nbsp;&nbsp;
          <span>{ to.currencies[0].symbol}</span>
        </h2>
        <div className="addition-image-flags">
          {to && <img  alt="flag" src={to.flag}/>}
        </div>
        &nbsp;<span style={{color: "lightpink"}}>
           {currencies && (currencies.rates[to.currencies[0].code] / currencies.rates[from.currencies[0].code]).toFixed(8)}
        </span>
      </div>
      </div>)}
      <div className="reduce" onClick={toggle_hide}>+</div>
    </div>
  )
}

export default AdditionalInfo

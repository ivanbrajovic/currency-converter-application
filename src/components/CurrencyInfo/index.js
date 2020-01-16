import React from 'react'
import { useSelector } from 'react-redux'
import './style.css'

const res = (i, l) => (i / l) || "calculating" 

const CurrencyInfo = () => {
  const currency = useSelector(state => state.json.base)
  const value = useSelector(state =>state.json.rate)
  return (
    <div className="currency-info-component">
      <h1>Currency Info</h1>
      <h2>{currency?.currencies[0].code}
        <span>{currency?.currencies[0].name}</span>
        <span>{currency?.currencies[0].symbol}</span>
      </h2>
      <h4>Country: <span>{currency?.name}</span> </h4>
      <h4>Relative to EUR:&nbsp;
      <span>{value?.rates[currency?.currencies[0].code]}</span></h4>
      <h4>Relative to GBP:&nbsp;
      <span>{res(value?.rates[currency?.currencies[0].code], value?.rates['GBP'])}</span></h4>
      <h4>Relative to USD:&nbsp;
      <span>{res(value?.rates[currency?.currencies[0].code], value?.rates['USD'])}</span></h4>   
     </div>
  )
}

export default CurrencyInfo


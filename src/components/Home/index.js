import React from 'react'
import  ChooseCurrencies from './ChooseCurrencies'
import { useSelector } from 'react-redux'
import TypeValues from './TypeValues'
import  AdditionalInfo  from './AdditionalInfo';
import './style.css'

const Home = () => {
  const timeNow = useSelector(state => state.setTime)

  const getSymb = {
    from: useSelector(state => state?.json?.base?.currencies[0].symbol),
    to: useSelector(state => state?.json?.value?.currencies[0].symbol)
  }

  const currency = {
    base: useSelector(state => state.json.base),
    toConvert: useSelector(state => state.json.value),
    data: useSelector(state => state.json.rate),
    currencyValue: useSelector(state => state.json.currency),
    calculate: function ()  {
      const currencyValue = this.currencyValue
      const res = (r) => ((currencyValue*r[0]) / r[1])
      const x = this.data
      const inputValue = {
        from: this.base.currencies[0],
        to: this.toConvert.currencies[0]
      }
      const y = x && Object.keys(x.rates)
        .filter(item => ~[inputValue.from.code, inputValue.to.code].indexOf(item))
        .map(item =>  ({name: item, value: x.rates[item]}))
      const _y = y && (inputValue.from.code !== y[0].name 
            ? y.map(i=>i.value) 
            : [...y.map(i=>i.value)].reverse())
      
      return y && (res(_y) || (_y.length === 1 ? res(_y.concat(_y[0])) : NaN))
    }
  }

  return (
    <div className="home">
      <h1>Currency Converter</h1>
      <div className="today">Today, {timeNow}</div>
      <ChooseCurrencies />
      { getSymb.from && getSymb.to&& 
        (
          <TypeValues
            fromSign={getSymb.from}
            toSign={getSymb.to}
            res={currency.calculate()}
        />
        )       
      }
      {
        (
          <AdditionalInfo />
        )
      }
    </div>
  )
  
}

export default Home

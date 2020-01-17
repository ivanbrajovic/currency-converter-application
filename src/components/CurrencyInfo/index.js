import React from 'react'
import { useSelector } from 'react-redux'
import SvgPie from './SvgPie'
import './style.css'

const res = (i, l) => (i / l) || "calculating" 

const getPercentages = (i, x) =>  (x * 100 / i)
const getPercentages_ = (i, x) => getPercentages(i, x) > 100
  ? getPercentages(x, i)   
  : getPercentages(i, x)
const createColor = () => '#'+ Math.random().toString(16).slice(2, 8)
const chooseCurrencyRelation = (i, x, y, z) => getPercentages(i, x) > 100 ? y : z

// component

const CurrencyInfo = () => {
  const currency = useSelector(state => state.json.base)
  const value = useSelector(state =>state.json.rate)
  const values = {
  'a': value?.rates[currency?.currencies[0].code],
  'b': value?.rates['GBP'],
  'v': value?.rates['USD']
  }

  const percentage = [
    {
      p: getPercentages(values.a, 1).toFixed(3),
      pc: getPercentages_(values.a, 1).toFixed(3),
      c: {
        fill: createColor(),
        stroke: createColor()
      },
      cur: chooseCurrencyRelation(values.a, values.v, "EUR", currency?.currencies[0].code),
      curToCom: chooseCurrencyRelation(values.a, values.v, currency?.currencies[0].code, "EUR")
    },
    {
      p: getPercentages(values.a, values.b).toFixed(3),
      pc: getPercentages_(values.a, values.b).toFixed(3),
      c: {
        fill: createColor(),
        stroke: createColor()
      },
      cur: chooseCurrencyRelation(values.a, values.v, "GBP", currency?.currencies[0].code),
      curToCom: chooseCurrencyRelation(values.a, values.v, currency?.currencies[0].code, "GBP")
    },
    {
      p: getPercentages(values.a, values.v).toFixed(3),
      pc: getPercentages_(values.a, values.v).toFixed(3),
      c: {
        fill: createColor(),
        stroke: createColor()
      },
      cur: chooseCurrencyRelation(values.a, values.v, "USD", currency?.currencies[0].code),
      curToCom: chooseCurrencyRelation(values.a, values.v, currency?.currencies[0].code, "USD")
    }
  ]

  return (
    <div className="currency-info-component">
      <h1>Currency Info</h1>
      <h2>{currency?.currencies[0].code}
        <span>{currency?.currencies[0].name}</span>
        <span>{currency?.currencies[0].symbol}</span>
      </h2>
      <h4>Country: <span>{currency?.name}</span> </h4>
      <h4>Relative to EUR:&nbsp;
      <span>{values.a}
        <span className="percentag">{percentage[0].p +"%"}</span></span></h4>
      <h4>Relative to GBP:&nbsp;
      <span>{res(values.a, values.b )}
        <span className="percentag"> {percentage[1].p+"%"}</span></span></h4>
      <h4>Relative to USD:&nbsp;
      <span>{res(values.a, values.v )}
        <span className="percentag">{percentage[2].p+"%"}</span></span></h4>
        <div className="svg-charts">
          {percentage.map((item, index) => (
            <SvgPie key={'item'+index} per={item.pc} fill={item.c.fill} stroke={item.c.stroke} c={item.cur} comp={item.curToCom}/>
          ))}   
        </div>
     </div>
  )
}

export default CurrencyInfo


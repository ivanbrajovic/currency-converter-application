import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import "./style.css"
import json from '../../../app-base/historical.json'
import { days_localized } from '../../Header/DateTime/language-support'

const getWidth = () =>  window.innerWidth >= 1280
  ? 750
  : window.innerWidth < 1280 &&  window.innerWidth > 768 
  ? window.innerWidth / 1.5
  : window.innerWidth - 40

const findLargerNumber = (jsonn) => [...jsonn].sort((x, y) => x - y)

const Chart = () => {
  const currency = useSelector(state => state.json?.base)
  const value = useSelector(state =>state.json.rate)
  const [state, setstate] = useState({w:getWidth(), h: window.innerHeight})
  const [circleColor, setcircleColor] = useState(Array.from(
    {length: 12}, (a, z) => ({
    color: 'lightblue', rs: 4 
    }
     )))
  const location = useSelector(state => state.json?.ip?.countryCode)
  const historical_json = json.map(item => ({
    time: item.time,
    values: item.values.find(i=>Object.keys(i)[0] === currency?.currencies[0].code)
  }))
  const higherLowerNumb = currency?.currencies[0].code && findLargerNumber(
    historical_json
    .map(item => item.values)
    .map(item => item[currency.currencies[0].code])
  )

  const heightPotential = 170 - 20 // this is the height of the regular chart area

  const getRelativeOffsetTop = (n,
    de=(higherLowerNumb.slice(-1)[0] - higherLowerNumb[0])) => heightPotential - (
    (((de-(higherLowerNumb.slice(-1)[0] - n)) * 100 / de) * heightPotential) / 100
   )


  useEffect(() => {
    const handleResize = () => {
      setstate({w:getWidth(), h: window.innerHeight})
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })
  
  const setCircleColor = (event, indx)=> setcircleColor(
    circleColor.map((item, index) => index === indx ? ({color: 'lightgreen', rs: 8}): item))
  
  const removeCircleColor = (event, indx)  => setcircleColor(
    circleColor.map((item, index) => index === indx ? ({color: 'lightblue', rs: 4}): item))
  
  // return statement
  return (currency?.currencies[0]) && (
    <div className="chart">  
    {/* header */}
      <h4>chart data :  
        <span> {currency?.currencies[0].code}</span>
      </h4>
      <svg height={200} width={state.w } >
        {historical_json.map((item, index, whole) => (
          <g key={"g-item"+ index}>
          {/* lines */}   
            <line  x1={state.w/whole.length * index + 8} y1={20} x2={state.w/whole.length*index+8} y2={170}
              style={{stroke:'#f4f4f4',strokWidth: '1' }} />
            {/* txt */}
              <text x={state.w/whole.length * index + 8} y='188' fill="#888" style={{fontSize: '10px' }}> {
                (days_localized[location.toLowerCase()][
                new Date(item.time).getDay()]+" ").slice(0, state.w >= 700 ? -1 : 3)} </text>
              <text x={state.w/whole.length*index+8} y='200' fill="#888" style={{ fontSize: '10px'
                }}>{new Date(item.time).toLocaleDateString().slice()} </text>
               {/* data for chart */}
               {/* circle (point) coordinates  */}
                 {/* lines */}
                <line
                  x1={state.w/whole.length * index + 10 }
                  y1={
                    /*20 is default offset from the top*/20 +
                    getRelativeOffsetTop(item.values[currency.currencies[0].code]) 
                    }
                  x2={whole[index + 1] ? state.w/whole.length * (index + 1) + 7.5 : state.w/whole.length * index}
                  y2={
                    whole[index + 1] 
                    ? /*20 is default offset from the top*/20 +
                    getRelativeOffsetTop(whole[index + 1].values[currency.currencies[0].code])  
                    : 20 + getRelativeOffsetTop(item.values[currency.currencies[0].code])
                    }
                  stroke="#888"
                    />
                <circle cx={state.w/whole.length * index + 8}
                  cy={/*20 is default offset from the top*/20 +
                      getRelativeOffsetTop(item.values[currency.currencies[0].code])}
                  r={circleColor[index].rs}
                  fill={circleColor[index].color}
                  stroke="white"
                  strokeWidth="3px"
                  onMouseEnter={(event) => setCircleColor(event, index)}
                  onMouseLeave={(event) =>removeCircleColor(event, index)}/>
                {/* hover text */}
                {circleColor[index].rs === 8 &&(
                  <text x={state.w/whole.length * index + 10} 
                  y={ /*20 is default offset from the top*/20 + 
                  getRelativeOffsetTop(item.values[currency.currencies[0].code]) - 10}
                    fill="#888" style={{ color: '#888', fontSize: '10px',}}>
                    {item.values[currency.currencies[0].code]
                      .toFixed(1)}
                      </text>)}
              
          </g>
        ))}
      </svg>
     </div>
  ) || 
  (<div className="loading-chart">
    loading chart...
  </div>
  )
}

export default Chart


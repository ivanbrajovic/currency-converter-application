import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import "./style.css"

const getWidth = () =>  window.innerWidth >= 1280
  ? 700
  : window.innerWidth < 1280 &&  window.innerWidth > 768 
  ? window.innerWidth / 2
  : window.innerWidth - 40


const Chart = () => {
  const currency = useSelector(state => state.json.base)
  const value = useSelector(state =>state.json.rate)
  const [state, setstate] = useState({w:getWidth(), h: window.innerHeight})

  useEffect(() => {
    const handleResize = () => {
      setstate({w:getWidth(), h: window.innerHeight})
      console.log(state)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <div className="chart">
      <h4>chart</h4>
      <svg height={200} width={state.w } style={{background: '#117'}}>
        
      </svg>
     </div>
  )
}

export default Chart

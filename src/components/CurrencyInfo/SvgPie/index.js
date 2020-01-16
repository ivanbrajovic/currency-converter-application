import React from 'react'

const SvgPie = ({per, fill, stroke, comp, c}) => (
  <svg height="150" width="100">
    <circle r="50" cx="50" cy="50" fill={fill} />
    <circle r="25" cx="50" cy="50" fill="transparent"
      stroke={stroke}
      strokeWidth="50"
      strokeDasharray={`calc(2 * 25 * ${Math.PI} * ${per} / 100), calc(2 * 25 * ${Math.PI})`}
        />
    <circle cx="8" cy='120' r="4" fill={fill}/>
    <text x="25" y='125' fill="#777" style={{fontSize: '12px'}}> rest from {comp}</text>
    <circle cx="8" cy='135' r="4" fill={stroke}/>
    <text x="25" y='140' fill="#777" style={{fontSize: '14px'}}>{c}</text>
 </svg>
) 

export default SvgPie

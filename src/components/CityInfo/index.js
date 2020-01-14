import React from "react"
import { useDispatch , useSelector} from "react-redux"
import json from '../../countries.json'
import { setCity } from '../../actions'
import "./style.css"

const CityInfo = () => {
  const cities = json
    .filter(city => city.capital.length > 0)
    .map(item => ({
      city: item.capital.replace(/\s/g,''),
      all: item
    }))
 
  const dispatch  = useDispatch()

  const search = event => {
    const key = event.keyCode || event.charCode
    if (key === 13) {
      const list = event.target.parentNode.parentNode.nextElementSibling
      list.scrollTop = 
        Array.from(list.children[1].children)
        .filter(item => item.textContent
          .toLowerCase().
          includes(event.target.value.toLowerCase()))
        .map(n=>n.offsetTop)[0] - 100
    }
  }

  const findCity = (city) => city.replace(/\s/g, '').toLowerCase()

  const chooseCity = (event) => {
    const city = event.currentTarget.textContent,
    cityName =  json.find(item=> findCity(item.capital).includes(findCity(city)))
    dispatch(setCity(cityName))
  }

  return (
    <div className="city-info">
    {/* header */}
      <div className="city-info-header">
        <h2>
          <span className="cursor-svg">
            &#x2B9E;
          </span>
          &nbsp;
          <input
            type="text"
            placeholder="Choose Your City"
            spellCheck="false"
            onKeyPress={search} />
        </h2>
      </div>
      {/* content */}
      <div className="city-list">
        <h2>Choose City</h2>
        <ul>
          {
            cities.map((item, index) => (
              <li key={`${item.city}-${index}`}>
                <label onClick={chooseCity}>
                  {item.city.length > 10 ? item.city.slice(0, 10) : item.city}
                <div className="label">
                  <input type="radio" id={`${item.city}-${index}`} name="choose-city" />
                  <span></span>
                </div>
                </label>
              </li>
           ))
          }
        </ul>
      </div>
    </div>
  );
};

export default CityInfo
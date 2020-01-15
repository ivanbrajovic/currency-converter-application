import { combineReducers } from 'redux'
import { setTime, getCity, json } from './reducers'

const allReducers = combineReducers({
 setTime,
 getCity,
 json
})

export default allReducers 
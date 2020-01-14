import { combineReducers } from 'redux'
import { setTime, getCity } from './reducers'

const allReducers = combineReducers({
 setTime,
 getCity
})

export default allReducers 
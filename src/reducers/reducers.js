const getCity = (state = 'London', action) => (action.type==='city' ? action.payload || state)

const setTime = (state = '', action) => (action.type==='time'?action.payload || state)

export {
  setTime,
  getCity

}
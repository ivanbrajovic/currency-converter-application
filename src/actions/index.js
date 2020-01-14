const setTime = () => ({
  type: 'time',
  payload: new Date().toLocaleString()
})

const setCity = (city) => ({
  type: 'city',
  payload: city
})

export {
  setTime,
  setCity
}
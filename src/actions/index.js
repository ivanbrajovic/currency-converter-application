const setTime = () => ({
  type: 'time',
  payload: new Date().toLocaleString()
})

export {
  setTime
}
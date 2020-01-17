const action = (type, payload) => ({
  type,
  payload
})
const setTime = () => action('time',new Date().toLocaleString())
const setCity = city => action('city', city)
const getIp = ip => action('ip', ip)
const setBase = base => action('base', base)
const setCurrencyToConvert = value => action('value', value)
const getAllCuurencies = allCurrencies => action('allCurrencies', allCurrencies)
const getCurrentExRate = rate => action('rate', rate)
const valueToCalculate = currency => action('currency', currency)
const setthemeInvert = t => action('t', t)
export { 
  setTime,
  setCity,
  setBase,
  getIp,
  setCurrencyToConvert,
  getAllCuurencies,
  getCurrentExRate,
  valueToCalculate,
  setthemeInvert
}

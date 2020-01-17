const findItem = (item, { type, payload }, state) => type === item ? payload : state
const getCity = (state = 'London', action) => findItem('city', action, state)
const setTime = (state = '', action) => findItem('time', action, state)
const json = (state = {
  'ip': null,
  'base': null,
  'value': null,
  'allCurrencies': null,
  'rate': null,
  'currency': null,
  't': false }, action) => ({
  ...state,
    'ip':  findItem('ip', action, state.ip),
    'base':findItem('base', action, state.base),
    'value': findItem('value', action, state.value),
    'allCurrencies': findItem('allCurrencies', action, state.allCurrencies),
    'rate': findItem('rate', action, state.rate),
    'currency': findItem('currency', action, state.currency),
    't': findItem('t', action, state.t)
})

export {
  setTime,
  getCity,
  json
}
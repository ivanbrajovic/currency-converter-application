const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const config = require('./config')
require('dotenv').config()
//create historical data test

/*this part is only for the test
* in production mode historical db will be created from the real data
*/
const date = new Date().getTime()
const currencyList = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'src', 'app-base', 'db.json'))
)
const testHistoricaldb = Array.from({length: 12}, (x, y) => ({
  time: date + (y * (1000 * 60 * 60 * 24)),
  values: Object.keys(currencyList.rates).map( item => ({
    [item]:currencyList.rates[item] * Math.random() //random Excnhange rate
  }))
}))
//run only if config.mode is `development

config.mode === 'development' && (
    fs.writeFile(path.join(__dirname, 'src', 'app-base', 'historical.json'),
    JSON.stringify(testHistoricaldb), (error) => {
    console.log( error && 'error' || 'success')
  })
)

//update main currency-list json - db.json
// *fixer api provides only hourly data
const update = () => {
  setTimeout(() => {
    fetch(`http://data.fixer.io/api/latest?access_key=${process.env.API_KEY}`)
    .then(res => res.json())
    .then(res => (
      fs.writeFile(path.join(__dirname, 'src', 'app-base','db.json'),
      JSON.stringify(res), (error) => {
      console.log( error && 'error' || 'success')
    })
    ))
  }, 1000 * 60 * 60)
}

update()

//historical data goes here...



const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
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
  time: date + (y * (1000 * 60 * 60 * 24 * 30)),
  values: Object.keys(currencyList.rates).map( item => ({
    [item]:currencyList.rates[item] * Math.random() //random Excnhange rate
  }))
}))

fs.writeFile(path.join(__dirname, 'src', 'app-base', 'historical.json'),
  JSON.stringify(testHistoricaldb), (error) => {
   console.log( error && 'error' || 'success')
})

//update main currency json - db.json

// fetch('')
console.log(process.env.API_KEY)
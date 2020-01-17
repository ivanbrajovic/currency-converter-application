import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './components/Header'
import Home from './components/Home'
import Page404 from './components/Page404'
import CityInfo from './components/CityInfo'
import CurrencyInfo from './components/CurrencyInfo'
import countries from './countries.json'
import data_base from './app-base/db.json'
import theme_invert from './theme-invert.png'
import {
  getIp,
  setBase,
  setCity,
  getAllCuurencies,
  setCurrencyToConvert,
  getCurrentExRate,
  setthemeInvert
  } from './actions'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import './App.css'

class App extends Component {
  state = {
    place: null,
    themeInvert: false
  }

  componentDidMount () {
    const reducers = (...actions) => (
      actions.map(n => this.props.dispatch(n))
    )

    fetch(`http://ip-api.com/json/`)
    .then(res => res.json())
    .then(res =>{
      this.setState({
        place: res.countryCode.toLowerCase()
      })
      reducers(getIp(res),
        setBase(countries.find(item => item.name === res.country)),
        setCurrencyToConvert(countries.find(item => item.name === "Germany")), //default conversion currency - euro
        setCity(res.city),
        getAllCuurencies(countries),
        getCurrentExRate(data_base))
    })
  }

  themeInvert = () => {
    this.setState({
      themeInvert: !this.state.themeInvert
    })
    this.props.dispatch(setthemeInvert(!this.state.themeInvert))
  }
  
  render () {
    return (
      <Router>
      <div className="App" style={{
        filter: `invert(${this.state.themeInvert? 1 : 0})`
      }}>
        <div className="App-container">
        <div className="theme-inv" onClick={this.themeInvert}>
          <img src={theme_invert} alt="invert" />
        </div>
          <Header country={this.state.place}/>
          <Switch> 
            <Route path="/" exact component={Home}/>
            <Route path="/currency-info" component={CurrencyInfo}/>
            <Route component={Page404} />
        </Switch>
        <CityInfo />
        </div>
      </div>
      </Router>
    )
  }
}
const mapStateToProps = state => {
 return {}
}

export default connect(mapStateToProps)(App)

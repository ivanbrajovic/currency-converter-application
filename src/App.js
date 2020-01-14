import React, { Component } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import Page404 from './components/Page404'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import './App.css'
const CurrencyInfo = () => {
  return (
    <div> info </div>
  )
}
export default class App extends Component {

  state = {
    place: null
  }

  componentDidMount () {
    fetch(`http://ip-api.com/json/`)
    .then(res => res.json())
    .then(res =>this.setState({
       place: res.countryCode.toLowerCase()
    }))
  }
  render () {
    return (
      <Router>
      <div className="App">
        <div className="App-container">
          <Header country={this.state.place}/>
          <Switch> 
            <Route path="/" exact component={Home}/>
            <Route path="/currency-info" component={CurrencyInfo}/>
            <Route component={Page404} />
        </Switch>
        
        </div>
      </div>
      </Router>
    )
  }
}


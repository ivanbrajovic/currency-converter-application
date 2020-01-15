
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { valueToCalculate } from '../../../actions'
import './style.css'

class TypeValus extends Component {

  state = {
    inputValue: 0,
    convertTo: 0,
    currencySign: [
      this.props.fromSign,
      this.props.toSign
    ],
    fontSize: 70,
    error: false
  }

 componentWillReceiveProps(nextProps) {
   this.setState({
     currencySign: Object.values(nextProps),
     fontSize: nextProps.res.toFixed(3).length > 7 ? 30 : 70,
     convertTo: nextProps.res.toFixed(3)})
  }

  changeValue = event => {
    const newValue = event.currentTarget.value
    const test = (/^[\d\.]*?$/.test(newValue) && newValue.split('.').length<3)
    this.setState({
      inputValue: newValue,
      fontSize: this.state.inputValue.length > 5 ? 30 : 70,
      error: test || 'wrong number'  
    })
    this.props.dispatch(valueToCalculate(test && +newValue))
  }

  render () {
    return (
      <div className="typeValues">
        <div className='type-valueHere'>
        <div className="symbol">{this.state.currencySign[0]}</div>
          <input  
            type="text"
            value = {this.state.inputValue}
            style={{fontSize: this.state.fontSize}}
            onChange ={this.changeValue}
            />
          <div className="error">{this.state.error}</div>
        </div>
        <div className='type-valueHere'>
          <div className="symbol">{this.state.currencySign[1]}</div>
          <input  
            type="text"
            value = {this.state.convertTo === "NaN" ? ":)" : this.state.convertTo}
            style={{fontSize: this.state.fontSize + 'px'}}
            disabled
          />
        </div>
      </div>
    )
  }
} 
const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps)(TypeValus)

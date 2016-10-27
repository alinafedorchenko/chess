import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import Board from '../components/Board'
import Input from '../components/Input'
import { connect } from 'react-redux'
import * as inputActions from '../actions/InputActions'

class App extends Component {
  render() {
    const { size, result, clear_result } = this.props.state
    const { setSize, setResult } = this.props.inputActions

    return (
        <div id="app">
          <Input setSize={setSize} setResult={setResult} result={result}/>
          <Board size={size} result={result} clear_result={clear_result}/>
          <div className="wale"></div>
        </div>
    )
  }
}

function mapStateToProps (state) {
    return {
        state: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        inputActions: bindActionCreators(inputActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

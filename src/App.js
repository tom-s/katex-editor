import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import Mathlive from 'mathlive'
import 'mathlive/dist/mathlive.core.css'
import 'mathlive/dist/mathlive.css'

console.log("debug Mathlive", Mathlive)

class App extends Component {
  state = {
  }
  render() {
    const { katex, jixx, jixxExport } = this.state

    return (
      <div className="App">
        <div id="mathfield" style={{
          position: 'relative',
          top: 20,
          left: 20,
          border: '1px solid black',
          width: 200
        }}></div>
      </div>
    )
  }
  componentDidMount() {
    const mathfield = Mathlive.makeMathField('mathfield');
    mathfield.insert("f{x}", {})
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as MyScriptJS from 'myscript'
import 'myscript/dist/myscript.min.css';
import get from 'lodash/get'
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const editorStyle = {
  'minWidth': '500px',
  'minHeight': '500px',
};

class App extends Component {
  state = {
    katex: ''
  }
  render() {
    const { katex } = this.state
    console.log("debug katex", katex)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Katexstructor</h1>
        </header>
        <div style={{height: 50}}>
        {katex && <button onClick={this.clear}>Effacer</button>}
        {katex && <BlockMath math={katex} />}
        </div>
        <div style={editorStyle} ref="editor">
        
        </div>
      </div>
    );
  }
  clear = () => {
    this.editor.clear()
  }
  onValue = (e) => {
    const katex = get(e, ['detail', 'exports', 'application/x-latex'])
    console.log("debug katex", katex, e)
    this.setState({
      katex
    })
  }
  componentDidMount() {
    this.editor = MyScriptJS.register(this.refs.editor, {
      text: {
        smartGuide: true
      },
       /*
      // for rest only
      triggers: {
        exportContent: 'QUIET_PERIOD'
      },*/
      recognitionParams: {
        type: 'MATH',
        protocol: 'WEBSOCKET',
        apiVersion: 'V4',
        server: {
          scheme: 'https',
          host: 'webdemoapi.myscript.com',
          applicationKey: '8a57fcf6-96cb-4dbd-9a1b-300b33d60787',
          hmacKey: '89c5e734-e5c8-4ac2-ba27-7616321d3305',
        },
        v4: {
          math: {
            mimeTypes: ['application/x-latex']
          }
        }
      },
    });
    this.refs.editor.addEventListener('exported', this.onValue)
    window.addEventListener("resize", () => {this.editor.resize()});
  }
}

export default App;

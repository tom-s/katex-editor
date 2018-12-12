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
    katex: '',
    jixx: '',
    jixxExport: ''
  }
  render() {
    const { katex, jixx, jixxExport } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Katexstructor</h1>
        </header>
        <div style={{height: 100}}>
        {jixxExport && <button onClick={this.import}>Import</button>}
        {jixx && <button onClick={this.export}>Export</button>}
        {katex && <button onClick={this.clear}>Effacer</button>}
        {katex && <BlockMath math={katex} />}
        </div>
        <div style={editorStyle} ref="editor"></div>
      </div>
    )
  }
  clear = () => {
    this.editor.clear()
  }
  export = () => {
    console.log("debug export", prevState.jixx)
    this.setState(prevState => ({
      jixxExport: prevState.jixx 
    }))
  }

  import = () => {
    this.editor.clear()
    this.editor.import_(this.state.jixxExport, 'application/vnd.myscript.jiix')
  }
  onValue = (e) => {
    const katex = get(e, ['detail', 'exports', 'application/x-latex'])
    const jixx = get(e, ['detail', 'exports', 'application/vnd.myscript.jiix'])
    this.setState({
      katex,
      jixx
    })
  }
  componentDidMount() {
    this.editor = MyScriptJS.register(this.refs.editor, {
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
          alwaysConnected: true,
          math: {
            mimeTypes: ['application/x-latex', 'application/vnd.myscript.jiix']
          },
          export: {
            jiix: {
              strokes: true,
            }
          }
        }
      },
    });
    this.refs.editor.addEventListener('exported', this.onValue)
    window.addEventListener("resize", () => {this.editor.resize()});
  }
}

export default App;

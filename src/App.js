import React, { Component } from 'react';
import './App.css';
import WaveProgress from './WaveProgress';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WaveProgress r={50} />
      </div>
    );
  }
}

export default App;

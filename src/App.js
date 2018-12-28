import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }
  drawCircle = (x, y, r) => {
    this.ctx.fillStyle = 'rgba(46,129,206,1)';
    this.ctx.beginPath();
    this.ctx.arc(50, 50, 50, 0, 2 * Math.PI, true);
    this.ctx.closePath();
    this.ctx.fill();
  }
  drawWave = () => {
    const offset = (Date.now() % 1000) / 10 - 50;
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'blue';
    this.ctx.moveTo(0 + offset, 50);
    this.ctx.quadraticCurveTo(25 + offset, 25, 50 + offset, 50);
    this.ctx.quadraticCurveTo(75 + offset, 75, 100 + offset, 50);
    this.ctx.stroke();
  }
  componentDidMount() {
    const canvas = this.canvas.current;
    if (canvas.getContext) {
      this.ctx = canvas.getContext('2d');
      this.drawCircle();
      window.requestAnimationFrame(this.drawWave);
    }
  }
  render() {
    return (
      <div className="App">
        <canvas ref={this.canvas}></canvas>
      </div>
    );
  }
}

export default App;

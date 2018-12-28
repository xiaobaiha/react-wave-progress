import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.offset = 0;
  }
  drawCircle = (x, y, r) => {
    this.ctx.fillStyle = 'rgba(46,129,206,1)';
    this.ctx.beginPath();
    this.ctx.arc(50, 50, 50, 0, 2 * Math.PI, true);
    this.ctx.closePath();
    this.ctx.fill();
  }
  drawWave = () => {
    this.offset += 1;
    if (this.offset === 100) {
      this.offset = 0;
    }

    console.log(this.offset);
    const r = 50;
    const offsetHeight = 15;
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'blue';
    this.ctx.moveTo(-2 * r + this.offset, r);
    this.ctx.quadraticCurveTo(-3 * r / 2 + this.offset, r - offsetHeight, -r + this.offset, r);
    this.ctx.quadraticCurveTo(-r / 2 + this.offset, r + offsetHeight, 0 + this.offset, r);
    this.ctx.quadraticCurveTo(r / 2 + this.offset, r - offsetHeight, r + this.offset, r);
    this.ctx.quadraticCurveTo(3 * r / 2 + this.offset, r + offsetHeight, 2 * r + this.offset, r);
    this.ctx.stroke();
  }
  draw = () => {
    this.ctx.clearRect(0, 0, 100, 100);
    this.drawCircle();
    this.drawWave();
    requestAnimationFrame(this.draw);
  }
  componentDidMount() {
    const canvas = this.canvas.current;
    if (canvas.getContext) {
      this.ctx = canvas.getContext('2d');
      requestAnimationFrame(this.draw);
    }
  }
  render() {
    return (
      <div className="App">
        <canvas ref={this.canvas} width="100" height="100"></canvas>
      </div>
    );
  }
}

export default App;

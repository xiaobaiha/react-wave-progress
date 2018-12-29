import React, { Component } from 'react';

class WaveProgress extends Component {
    constructor(props) {
        super(props);
        if (props.r && !isNaN(+props.r)) {
            this.r = +props.r;
        } else {
            console.error("Invalid radius(props.r):", props.r);
            this.r = 50;
        }
        this.canvas = React.createRef();
        this.borderCanvas = React.createRef();
        this.offset = 0;
    }
    clipCircle = (r) => {
        this.ctx.beginPath();
        this.ctx.arc(this.r, this.r, r, 0, 2 * Math.PI, true);
        this.ctx.closePath();
        this.ctx.clip();
    }
    drawCircle = (r) => {
        this.border.fillStyle = 'white';
        const lineWidth = 2;
        this.border.lineWidth = lineWidth;
        this.border.beginPath();
        this.border.arc(this.r, this.r, this.r - lineWidth / 2, 0, 2 * Math.PI, true);
        this.border.closePath();
        this.border.stroke();
    }
    drawWave = () => {
        this.offset += this;
        if (this.offset === 2 * this.r) {
            this.offset = 0;
        }
        console.log(this.offset)
        const offsetHeight = this.r / 5;
        this.ctx.beginPath();
        this.ctx.fillStyle = '#B0E2FF';
        this.ctx.moveTo(-2 * this.r + this.offset, this.r);
        this.ctx.quadraticCurveTo(-3 * this.r / 2 + this.offset, this.r - offsetHeight, -this.r + this.offset, this.r);
        this.ctx.quadraticCurveTo(-this.r / 2 + this.offset, this.r + offsetHeight, 0 + this.offset, this.r);
        this.ctx.quadraticCurveTo(this.r / 2 + this.offset, this.r - offsetHeight, this.r + this.offset, this.r);
        this.ctx.quadraticCurveTo(3 * this.r / 2 + this.offset, this.r + offsetHeight, 2 * this.r + this.offset, this.r);
        this.ctx.lineTo(2 * this.r + this.offset, 2 * this.r);
        this.ctx.lineTo(-2 * this.r + this.offset, 2 * this.r);
        this.ctx.lineTo(-2 * this.r + this.offset, this.r);
        this.ctx.closePath();
        this.ctx.fill();
    }
    draw = () => {
        this.ctx.clearRect(0, 0, this.r * 2, this.r * 2);
        this.drawWave();
        requestAnimationFrame(this.draw);
    }
    componentDidMount() {
        const canvas = this.canvas.current;
        if (canvas.getContext) {
            this.ctx = canvas.getContext('2d');
            this.border = this.borderCanvas.current.getContext('2d');
            this.clipCircle(this.r - 5);
            this.drawCircle(this.r);
            requestAnimationFrame(this.draw);
        }
    }
    render() {
        return (
            <div style={{ position: 'relative' }}>
                <canvas style={{ position: 'absolute' }} ref={this.canvas} width={this.r * 2} height={this.r * 2}></canvas>
                <canvas style={{ position: 'absolute' }} ref={this.borderCanvas} width={this.r * 2} height={this.r * 2}></canvas>
            </div>
        );
    }
}

export default WaveProgress;

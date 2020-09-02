import React from 'react';
import ship_left from './assets/images/ship_left.png';

class EnemyShip extends React.Component {
    constructor(props) {
        super(props);
        this.state = { alive: true, directionX: true, posX: 0, posY: 0 };
        this.width = 16;
        this.height = 16;
        this.container_width = 0;
        this.container_height = 0;
        this.increments = this.width;
    }

    moveShip() {
        this.setState(state => ({ posX: state.posX + this.increments }));
        if ((this.state.directionX && this.state.posX >= this.container_width - this.width) || (!this.state.directionX && this.state.posX <= 0)) {
            this.setState(state => ({ directionX: !state.directionX, posY: state.posY + this.height }));
            this.increments = -this.increments;
        }

        if (this.state.posY >= 16) {
            this.die();
        }
    }

    fire() {
        console.log('fire');
        clearInterval(this.fireId);
        const randTime = Math.random() * (1000, 3000) + 1000;
        console.log('arand: ', randTime);
        this.fireId = setInterval(() => { this.fire() }, randTime);
    }

    die() {
        console.log('died');
        this.setState({ alive: false });
        clearInterval(this.timerId);
        clearInterval(this.fireId);
    }

    componentDidMount() {
        const container = document.getElementById('arena');
        this.container_width = container.clientWidth;
        this.container_height = container.clientHeight;
        this.timerId = setInterval(() => {
            this.moveShip();
        }, 600);
        const randTime = Math.random() * (1000, 3000) + 1000;
        console.log('randomTime: ', randTime);
        this.fireId = setInterval(() => { this.fire() }, randTime);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        const display = this.state.alive ? 'block' : 'none';
        return (<img style={{ position: 'absolute', top: this.state.posY + 'px', left: this.state.posX + 'px', display }} src={ship_left} alt="enemy" />);
    }
}

export default EnemyShip;
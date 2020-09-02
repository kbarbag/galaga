import React from 'react';
import ship_left from './assets/images/ship_left.png';

class EnemyShip extends React.Component {
    constructor(props) {
        super(props);
        this.width = 16;
        this.height = 16;
        this.container_width = 0;
        this.container_height = 0;
        this.increments = this.width;
        this.x = props.x;
        this.y = props.y;
        this.ticks = 0;
        this.state = { alive: true, directionX: true, posX: 0 + (this.x * 16) + (this.x * 5), posY: 0 + (this.y * this.height) + (this.y * 5), tick: 0 };
    }

    moveShip() {
        this.setState(state => ({ posX: state.posX + this.increments, tick: state.tick + 1 }));
        // if ((this.state.directionX && this.state.posX >= this.container_width - this.width) || (!this.state.directionX && this.state.posX <= 0)) {
        if(this.state.tick % (this.ticks) === 0 ) {
            this.setState(state => ({ directionX: !state.directionX, posY: state.posY + 4 * (this.height) }));
            this.increments = -this.increments;
        }

        if (this.state.posY >= this.container_height) {
            this.die();
        }
    }

    fire() {
        console.log('fire');
        clearInterval(this.fireId);
        const randTime = Math.random() * (1000, 3000) + 1000;
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
        this.ticks = Math.floor(this.container_width / this.width)-12;
        this.timerId = setInterval(() => {
            this.moveShip();
        }, 100);
        const randTime = Math.random() * (1000, 3000) + 1000;
        this.fireId = setInterval(() => { this.fire() }, randTime);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        if (!this.state.alive) {
            return null;
        }
        return (<img style={{ position: 'absolute', top: this.state.posY + 'px', left: this.state.posX + 'px' }} src={ship_left} alt="enemy" />);
    }
}

export default EnemyShip;
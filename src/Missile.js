import React from 'react';
import missile from './assets/images/missile_up.png';
import constantVars from './Constants';

class Missile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { alive: props.alive, posX: props.posX, posY: props.posY };
        this.moveUp = this.moveUp.bind(this);
    }

    moveUp() {
        console.log('missile move up: ', this.state.posY);
        const arena = document.getElementById('arena');
        this.arena_width = arena.clientWidth;
        this.arena_height = arena.clientHeight;
        let alive = this.state.alive;
        if (this.state.posY >= this.arena_height) {
            alive = false;
            this.setState({ alive: false });
            return;
        }
        this.setState((state) => ({ posY: state.posY + constantVars.ENEMY_HEIGHT, alive }));
        setTimeout(() => { requestAnimationFrame(this.moveUp) }, 200);
    }

    componentDidMount() {
        // this.timerId = setInterval(() => { this.moveUp();}, 200);
        requestAnimationFrame(this.moveUp);
    }
    
    // componentWillUnmount() {}

    render() {
        if (!this.state.alive) {
            return null;
        }
        return (<img style={{ position: 'absolute', bottom: this.state.posY + 'px', left: this.state.posX + 'px' }} src={missile} alt="missile up" />);
    }
}

export default Missile;
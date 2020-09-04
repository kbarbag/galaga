import React from 'react';
import ship_left from './assets/images/ship_left.png';

class EnemyShip extends React.Component {
    render() {
        if (!this.props.alive) {
            return null;
        }
        return (<img style={{ position: 'absolute', top: this.props.posY + 'px', left: this.props.posX + 'px' }} src={ship_left} alt="enemy" />);
    }
}

export default EnemyShip;
import React from 'react';
import ship_left from './assets/images/ship_left.png';

class Player extends React.Component {
    render() {
        if (!this.props.alive) {
            return null;
        }
        return (<img id='player' style={{ position: 'absolute', bottom: this.props.posY + 'px', left: this.props.posX + 'px' }} src={ship_left} alt="enemy" />);
    }
}

export default Player;
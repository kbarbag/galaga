import React from 'react';
import EnemyShip from './EnemyShip';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = { posX: 0, posY: 0 };
    }

    componentDidMount() {
        const rootEle = document.getElementById('App');
        const sw = rootEle.offsetLeft;
        this.setState({ posX: sw });
        console.log('posX: ', sw);
    }

    render() {
        return (
            <div id="arena" className="col-6 offset-3 text-center" style={{ background: 'blue' }}>
                <EnemyShip />
            </div>
        );
    }
}

export default Game;
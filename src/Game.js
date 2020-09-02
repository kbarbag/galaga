import React from 'react';
import EnemyShip from './EnemyShip';

class Game extends React.Component {
    constructor(props) {
        super(props);
        let enemies = [];
        for (let i = 0; i < 10; i++) {
            enemies.push([]);
            for (let j = 0; j < 10; j++) {
                enemies[i].push(true);
            }
        }
        this.state = Object.assign({}, { posX: 0, posY: 0, enemies });
        console.log(this.state);
    }

    render() {
        const items = [];
        for (let i = 0; i < this.state.enemies.length; i++) {
            for (let j = 0; j < this.state.enemies[0].length; j++) {
                items.push(<EnemyShip key={i+"_"+j} x={j} y={i} />);
            }
        }
        return (
            <div id="arena" className="col-6 offset-3 text-center" style={{ background: 'blue' }}>
                {items}
            </div>
        );
    }
}

export default Game;
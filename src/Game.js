import React from 'react';
import EnemyShip from './EnemyShip';
import constantVars from './Constants';

class Game extends React.Component {
    constructor(props) {
        super(props);
        let enemies = [];
        for (let i = 0; i < 2; i++) {
            enemies.push([]);
            for (let j = 0; j < 10; j++) {
                enemies[i].push({ alive: true, directionX: true, posX: (j * constantVars.ENEMY_WIDTH) + (j * constantVars.ENEMY_PADDING_X), posY: (i * constantVars.ENEMY_HEIGHT) + (i * constantVars.ENEMY_PADDING_X), tick: 0, position: { x: 0, y: 0 } });
            }
        }
        this.state = { tick: 0, enemyDirectionRight: true, enemies, positions: [] }
        this.modTicks = 0;
        this.increments = constantVars.ENEMY_WIDTH + constantVars.ENEMY_PADDING_X;
        this.arena_height = 0;
        this.updateEnemies = this.updateEnemies.bind(this);
    }

    updateEnemies() {
        let currTick = this.state.tick + 1;
        if (currTick % this.modTicks === 0) {
            this.increments *= -1;
        }
        let tempEnemies = Object.assign([], this.state.enemies);
        let anyAlive = false;
        for (let i = 0; i < tempEnemies.length; i++) {
            for (let j = 0; j < tempEnemies[i].length; j++) {
                tempEnemies[i][j]['posX'] += this.increments;
                if (currTick % this.modTicks === 0) {
                    tempEnemies[i][j]['posY'] += constantVars.ENEMY_HEIGHT;
                    if (tempEnemies[i][j]['posY'] >= this.arena_height - (10 * constantVars.ENEMY_HEIGHT)) {
                        tempEnemies[i][j]['alive'] = false;
                    }
                }
                if (tempEnemies[i][j]['alive']) {
                    anyAlive = true;
                }
            }
        }
        if(currTick % this.modTicks === 0){
            currTick += 1;
        }
        this.setState({ tick: currTick, enemies: tempEnemies });
        if (!anyAlive) { return;}
        setTimeout(() => { requestAnimationFrame(this.updateEnemies); }, 200);
    }

    componentDidMount() {
        const arena = document.getElementById('arena');
        const arena_width = arena.clientWidth;
        this.arena_height = arena.clientHeight;
        const horizontalPositions = Math.floor(arena_width / constantVars.ENEMY_WIDTH);
        const verticalPositions = Math.floor(this.arena_height / constantVars.ENEMY_HEIGHT);

        this.modTicks = Math.floor((arena_width + (2*constantVars.ENEMY_PADDING_X) - ((this.state.enemies[0].length-1) * (constantVars.ENEMY_WIDTH + constantVars.ENEMY_PADDING_X))) / (constantVars.ENEMY_WIDTH + constantVars.ENEMY_PADDING_X));
        let tempPositions = [];
        for (let i = 0; i < verticalPositions; i++) {
            tempPositions.push(new Array(horizontalPositions));
            for (let j = 0; j < horizontalPositions; j++) {
                tempPositions[i][j] = false;
            }
        }
        this.setState({ positions: tempPositions });
        requestAnimationFrame(this.updateEnemies);
        // this.timerId = setInterval(() => { this.updateEnemies(); }, 250);
    }

    render() {
        const items = [];
        for (let i = 0; i < this.state.enemies.length; i++) {
            for (let j = 0; j < this.state.enemies[0].length; j++) {
                items.push(<EnemyShip key={i + "_" + j} x={j} y={i} posX={this.state.enemies[i][j]['posX']} posY={this.state.enemies[i][j]['posY']} alive={this.state.enemies[i][j]['alive']} />);
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
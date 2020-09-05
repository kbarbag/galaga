import React from 'react';
import EnemyShip from './EnemyShip';
import Player from './Player';
import Missile from './Missile';
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
        this.state = { tick: 0, enemyDirectionRight: true, enemies, positions: [], player: { alive: true, posX: 0, posY: 0}, missiles: [] }
        this.modTicks = 0;
        this.missileCount = 0;
        this.increments = constantVars.ENEMY_WIDTH + constantVars.ENEMY_PADDING_X;
        this.arena_height = 0;
        this.arena_width = 0;
        this.updateEnemies = this.updateEnemies.bind(this);
        this.playerKeyDown = this.playerKeyDown.bind(this);
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

    playerKeyDown(evt) {
        console.log('event:');
        console.log(evt.keyCode);
        const player = this.state.player;
        let missiles = this.state.missiles;
        if (evt.keyCode === 37) {
            player.posX = Math.max(0, player.posX - 16);
        }
        if (evt.keyCode === 39) {
            player.posX = Math.min(this.arena_width - constantVars.ENEMY_WIDTH, player.posX + 16);
        }
        if (evt.keyCode === 40) {
            player.posY = Math.max(0, player.posY - constantVars.ENEMY_HEIGHT);
        }
        if (evt.keyCode === 38) {
            player.posY = Math.min(this.arena_height - (1 * constantVars.ENEMY_HEIGHT
            ), player.posY + constantVars.ENEMY_HEIGHT);
        }
        if (evt.keyCode === 32) {
            //create missile
            this.missileCount += 1;
            missiles.push({alive: true, key: 'missile_'+this.missileCount, posX: this.state.player.posX, posY: this.state.player.posY + constantVars.ENEMY_HEIGHT})
        }
        this.setState({player, missiles});
        return;
    }

    componentDidMount() {
        const arena = document.getElementById('arena');
        this.arena_width = arena.clientWidth;
        this.arena_height = arena.clientHeight;
        const horizontalPositions = Math.floor(this.arena_width / constantVars.ENEMY_WIDTH);
        const verticalPositions = Math.floor(this.arena_height / constantVars.ENEMY_HEIGHT);

        this.modTicks = Math.floor((this.arena_width + (2*constantVars.ENEMY_PADDING_X) - ((this.state.enemies[0].length-1) * (constantVars.ENEMY_WIDTH + constantVars.ENEMY_PADDING_X))) / (constantVars.ENEMY_WIDTH + constantVars.ENEMY_PADDING_X));
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
        const missileItems = this.state.missiles.map(missile => <Missile key={missile.key} alive={missile.alive} posX={missile.posX} posY={missile.posY} />);
        return (
            <div id="arena" tabIndex="0" onKeyDown={this.playerKeyDown} className="col-6 offset-3 text-center" style={{ background: 'blue', 'outlineWidth': '0' }}>
                {items}
                {missileItems}
                <Player key='da' alive={true} posX={this.state.player.posX} posY={this.state.player.posY} />
            </div>
        );
    }
}

export default Game;
import React, {
    Component,
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';

import {TILECOUNT, VALUES} from '../../config';

import Tile from '../Tile';

class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tileSize: this.calculateTilesize(),
            tiles: this.generateTiles(),
            prevTile: null,
        };

        this.handleTilePress = this.handleTilePress.bind(this);
    } 

    calculateTilesize() {
        const {width, height} = Dimensions.get('window');
        const boardSize = width-(width * 0.05);
        const tileSize = boardSize / Math.sqrt(TILECOUNT);
        return tileSize;
    }

    generateTiles() {
        let tiles = [];
        let counter = TILECOUNT;
        while (counter) {
            const randomValue = Object.keys(VALUES)[Math.floor(Math.random() * Object.keys(VALUES).length)];
            const tileA = {id: tiles.length, value: randomValue, visible: false, solved: false};
            const tileB = {id: tiles.length+1, value: randomValue, visible: false, solved: false};
            tiles = tiles.concat([tileA, tileB]);
            counter = counter - 2;
        }
        tiles = this.shuffleTiles(tiles);
        return tiles;
    }

    shuffleTiles(tiles) {
        for (let i = tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = tiles[i];
            tiles[i] = tiles[j];
            tiles[j] = tmp;
        }
        return tiles;
    }

    updateTileById(tiles, id, property, value) {
        const oldTiles = tiles.slice(0);
        const newTiles = oldTiles.map(tile => {
            if (tile.id === id) {
                if (value !== undefined) {
                    tile[property] = value;
                } else {
                    tile[property] = !tile[property];
                }
            }
            return tile;
        })
        return newTiles;
    }

    isGameOver() {
        return this.state.tiles.every(tile => tile.solved === true);
    }

    handleTilePress(id) {
        if (this.state.prevTile && this.state.prevTile.id === id) {
            return;
        }

        const tile = this.state.tiles.find(tile => id === tile.id);
        let prevTile = tile;
        let newTiles = this.updateTileById(this.state.tiles, id, "visible", true);

        if (this.state.prevTile) {
            this.props.incrementAttempts();

            newTiles = this.updateTileById(newTiles, this.state.prevTile.id, "visible", false);

            if (this.state.prevTile.value === tile.value) {
                newTiles = this.updateTileById(newTiles, id, "solved");
                newTiles = this.updateTileById(newTiles, this.state.prevTile.id, "solved");
                prevTile = null;
            } else {
                newTiles = this.updateTileById(newTiles, this.state.prevTile.id, "visible", false);
            }
        }

        this.setState({
            tiles: newTiles,
            prevTile: prevTile,
        }, () => {
            if (this.isGameOver()) {
                this.props.navigator.push({
                    name: 'GameOverScene',
                });
            }
        });
    }

    render() {
        return (
            <View style={styles.board}>
                {this.state.tiles.map(tile => {
                    return (
                        <Tile 
                            id={tile.id}
                            value={tile.value}
                            visible={tile.visible}
                            size={this.state.tileSize}
                            onPress={this.handleTilePress}
                            solved={tile.solved}
                            key={tile.id} 
                        />
                    );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    board: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});

export default Board;
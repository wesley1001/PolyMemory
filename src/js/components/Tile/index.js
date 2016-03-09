import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
} from 'react-native';

import {VALUES} from '../../config';

class Tile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                padding: this.props.size * 0.1,
                width: this.props.size,
                height: this.props.size,
            }}>
                {!this.props.solved ?
                    <TouchableHighlight
                        style={[styles.tile, {
                            borderRadius: Math.floor(this.props.size / 2),
                            elevation: this.props.visible ? 1 : 4,
                            shadowColor: 'gray',
                            shadowRadius: 2,
                            shadowOpacity: this.props.visible ? 0.2 : 0.4,
                            padding: 5,
                        }]}
                        onPress={() => this.props.onPress(this.props.id)}
                        underlayColor="white"
                    >
                        {this.props.visible ?
                            <Image source={VALUES[this.props.value]} resizeMode="contain" style={{
                                flex: 1,
                                width: this.props.size,
                                height: this.props.size,
                            }} />
                        : <Text style={styles.tileText}>p</Text>}
                    </TouchableHighlight>
                : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tile: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tileText: {
        color: '#ddd',
    },
});

export default Tile;
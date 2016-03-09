import React, {
    Component,
    StyleSheet,
    Text,
    View,
} from 'react-native';

class Stats extends Component {
    render() {
        return(
            <View style={styles.statsContainer}>
                {this.props.attempts !== 0 ?
                    <Text style={styles.stats}>Versuche: {this.props.attempts}</Text>
                : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    stats: {
        fontSize: 25,
        color: 'white',
    }
});

export default Stats;
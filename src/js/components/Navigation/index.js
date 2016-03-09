import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.handleOnPress = this.handleOnPress.bind(this);
    }

    handleOnPress() {
        this.props.resetAttempts();
        this.props.navigator.push({
            name: 'GameScene',
        });
    }

    render() {
        return(
            <View style={styles.buttonWrapper}>
                <TouchableHighlight
                    onPress={this.handleOnPress}
                    style={styles.buttonContainer}
                    underlayColor="#FA6900"
                >
                        <Text style={styles.button}>Neues Spiel</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',  
    },
    buttonContainer: {
        backgroundColor: '#FA6900',
        elevation: 3,
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: 18,
        paddingRight: 18,
        borderRadius: 3,
    },
    button: {
        fontSize: 22,
        color: 'white',
    },
});

export default Navigation;
import React, {
    Component,
    StyleSheet,
    Text,
    View,
} from 'react-native';

class Logo extends Component {
    render() {
        return(
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>Poly<Text style={styles.logoBold}>Memory</Text></Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    logo: {
        fontSize: 50,
        color: 'white',
    },
    logoBold: {
        fontWeight: 'bold',
    }
});

export default Logo;
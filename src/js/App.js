import React, {
    Component,
    Navigator,
    StyleSheet,
    View,
} from 'react-native';

import {Values} from './config';
import Logo from './components/Logo';
import Board from './components/Board';
import Stats from './components/Stats';
import Navigation from './components/Navigation';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            attempts: 0,
        };

        this.incrementAttempts = this.incrementAttempts.bind(this);
        this.resetAttempts = this.resetAttempts.bind(this);
    }

    incrementAttempts() {
        this.setState({
            attempts: ++this.state.attempts,
        });
    }

    resetAttempts() {
        this.setState({
            attempts: 0,
        });
    }

    render() {
        return (
            <Navigator
                initialRoute={{name: 'GameScene'}}
                configureScene={(route, routeStack) => {
                    return Navigator.SceneConfigs.FloatFromBottom;
                }}
                renderScene={(route, navigator) => {
                    let scene;
                    switch (route.name) {
                        case "GameScene":
                            scene = (
                                <View style={styles.container}>
                                    <Logo />
                                    <Board
                                        attempts={this.state.attempts}
                                        incrementAttempts={this.incrementAttempts}
                                        navigator={navigator}
                                    />
                                    <Stats attempts={this.state.attempts} />
                                </View>
                            );
                            break;
                        case "GameOverScene":
                            scene = (
                                <View style={styles.container}>
                                    <Logo />
                                    <Navigation
                                        resetAttempts={this.resetAttempts}
                                        navigator={navigator} 
                                    />
                                    <Stats attempts={this.state.attempts} />
                                </View>
                            );
                            break;
                    }
                    return scene;
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#69D2E7',
    },
});

export default App;

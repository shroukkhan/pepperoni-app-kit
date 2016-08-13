/**
 * Created by KHAN on 8/11/2016.
 */
var React = require('react');
var ReactNative = require('react-native');
const {
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} = ReactNative;
import DrawerLayout from 'react-native-drawer-layout';


var DrawerLayoutExample = React.createClass({

    getInitialState() {
        return {
            drawerLockMode: 'unlocked',
        };
    },

    render: function () {
        const {
            drawerLockMode,
        } = this.state;

        const navigationView = (
            <View style={[styles.container, {backgroundColor: '#fff'}]}>
                <Text>Hello there!</Text>
                <DrawerLockModeSwitches value={drawerLockMode}
                                        onValueChange={value => this.setState({drawerLockMode: value})}/>
                <TouchableHighlight onPress={() => this.drawer.closeDrawer()}>
                    <Text>Close drawer</Text>
                </TouchableHighlight>
            </View>
        );

        return (
            <DrawerLayout
                onDrawerSlide={(e) => this.setState({drawerSlideOutput: JSON.stringify(e.nativeEvent)})}
                onDrawerStateChanged={(e) => this.setState({drawerStateChangedOutput: JSON.stringify(e)})}
                drawerWidth={300}
                drawerLockMode={drawerLockMode}
                ref={(drawer) => {
                    return this.drawer = drawer
                }}
                keyboardDismissMode="on-drag"
                renderNavigationView={() => navigationView}>
                <View style={styles.container}>
                    <Text style={styles.welcome}>Content!</Text>
                    <DrawerLockModeSwitches value={drawerLockMode}
                                            onValueChange={value => this.setState({drawerLockMode: value})}/>
                    <Text>{this.state.drawerStateChangedOutput}</Text>
                    <Text>{this.state.drawerSlideOutput}</Text>
                    <TouchableHighlight onPress={() => this.drawer.openDrawer()}>
                        <Text>Open drawer</Text>
                    </TouchableHighlight>
                    <TextInput style={styles.inputField}/>
                </View>
            </DrawerLayout>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    inputField: {
        backgroundColor: '#F2F2F2',
        height: 40,
    },
    split: {
        flexDirection: 'row',
    },
    spacedLeft: {
        paddingLeft: 10,
    }
});

module.exports = DrawerLayoutExample;
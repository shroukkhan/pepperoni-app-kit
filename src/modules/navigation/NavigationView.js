import React, {PropTypes} from 'react';
import {
    NavigationExperimental,
    View,
    Platform,
    StyleSheet,
    TouchableHighlight,
    Image,
    Switch,
    Text,
    TextInput,
} from 'react-native';
const {
    CardStack: NavigationCardStack,
    Header: NavigationHeader,
    PropTypes: NavigationPropTypes
} = NavigationExperimental;
import AppRouter from '../AppRouter';
import DrawerLayout from 'react-native-drawer-layout';


// Height duplicated from React Native NavigationHeader component
const APP_BAR_HEIGHT = Platform.OS === 'ios' ? 64 : 56;
// Customize bottom tab bar height here if desired
const TAB_BAR_HEIGHT = 50;

var DrawerLockModeSwitches = React.createClass({

    render: function () {
        const {
            value,
            onValueChange,
        } = this.props;

        return (
            <View>
                <View style={[styles.container, styles.split]}>
                    <Switch onValueChange={value => value ? onValueChange('unlocked') : onValueChange('unlocked')}
                            value={value === 'unlocked'}/>
                    <Text style={styles.spacedLeft}>Unlocked</Text>
                </View>
                <View style={[styles.container, styles.split]}>
                    <Switch onValueChange={value => value ? onValueChange('locked-closed') : onValueChange('unlocked')}
                            value={value === 'locked-closed'}/>
                    <Text style={styles.spacedLeft}>locked-closed</Text>
                </View>
                <View style={[styles.container, styles.split]}>
                    <Switch onValueChange={value => value ? onValueChange('locked-open') : onValueChange('unlocked')}
                            value={value === 'locked-open'}/>
                    <Text style={styles.spacedLeft}>locked-open</Text>
                </View>
            </View>
        );
    }
});

const NavigationView = React.createClass({
    propTypes: {
        onNavigateBack: PropTypes.func.isRequired,
        onNavigateCompleted: PropTypes.func.isRequired,
        navigationState: PropTypes.shape({
            tabs: NavigationPropTypes.navigationState.isRequired,
            HomeTab: NavigationPropTypes.navigationState.isRequired,
            ProfileTab: NavigationPropTypes.navigationState.isRequired
        }),
        switchTab: PropTypes.func.isRequired,
        pushRoute: PropTypes.func.isRequired
    },
    // NavigationHeader accepts a prop style
    // NavigationHeader.title accepts a prop textStyle


    renderHeader(sceneProps) {
        return (
            <NavigationHeader
                {...sceneProps}
                onNavigateBack={this.props.onNavigateBack}
                renderTitleComponent={() => {
                    return (
                        <NavigationHeader.Title>
                            {sceneProps.scene.route.title}
                        </NavigationHeader.Title>
                    );
                }}
                renderRightComponent={() => {
                    return ( <TouchableHighlight onPress={()=>this.drawer.openDrawer()}>
                        <Image resizeMode='contain'
                               height="15" width="15"
                               source={require('../../../images/menu-alt-512.png')}/>
                    </TouchableHighlight>)
                }}
            />
        );
    },
    renderScene(sceneProps) {
        // render scene and apply padding to cover
        // for app bar and navigation bar
        return (
            <View style={styles.sceneContainer}>
                {AppRouter(sceneProps)}
            </View>
        );
    },

    getInitialState() {
        return {
            drawerLockMode: 'unlocked',
        };
    },
    render() {
        const {tabs} = this.props.navigationState;
        const tabKey = tabs.routes[tabs.index].key;
        const scenes = this.props.navigationState[tabKey];

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
                    {/*<TabBar*/}
                    {/*height={TAB_BAR_HEIGHT}*/}
                    {/*tabs={tabs}*/}
                    {/*currentTabIndex={tabs.index}*/}
                    {/*switchTab={this.props.switchTab}*/}
                    {/*/>*/}
                    <NavigationCardStack
                        key={'stack_' + tabKey}
                        onNavigateBack={this.props.onNavigateBack}
                        navigationState={scenes}
                        renderOverlay={this.renderHeader}
                        renderScene={this.renderScene}
                    />
                </View>
            </DrawerLayout>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sceneContainer: {
        flex: 1,
        marginTop: APP_BAR_HEIGHT,
        //marginBottom: TAB_BAR_HEIGHT
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

export default NavigationView;

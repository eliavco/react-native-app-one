import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            time: Date(),
            refreshing: false,
        };
    }

    // Update STATE
    updateTime() {
        this.setState({ time: Date() });
    }

    // Create Components
    createWelcomeContainer() {
        return (
            <View style={styles.welcomeContainer}>
                <Image
                    source={
                        __DEV__
                            ? require('../assets/images/robot-dev.png')
                            : require('../assets/images/robot-prod.png')
                    }
                    style={styles.welcomeImage}
                />
            </View>
        );
    }

    createGetStartedContainer() {
        return (
            <View style={styles.getStartedContainer}>
                <DevelopmentModeNotice />

                <Text style={styles.getStartedText}>{this.state.time}</Text>

                <Text style={styles.getStartedText}>
                    This is another app made with {'<3'} by
                </Text>

                <View
                    style={[
                        styles.codeHighlightContainer,
                        styles.homeScreenFilename,
                    ]}
                >
                    <MonoText>ELCO Apps</MonoText>
                </View>

                <Text style={styles.getStartedText}>
                    Go around the app and experience it
                </Text>
            </View>
        );
    }

    createHelpContainer() {
        return (
            <View style={styles.helpContainer}>
                <TouchableOpacity
                    onPress={handleHelpPress}
                    style={styles.helpLink}
                >
                    <Text style={styles.helpLinkText}>
                        Learn more about React Native!
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    createCoverImage() {
        return (
            <View>
                <Image
                    source={require('../assets/images/Me.jpg')}
                    style={styles.imageMe}
                />
            </View>
        );
    }

    createBottomMessage() {
        return (
            <View style={styles.tabBarInfoContainer}>
                <Text style={styles.tabBarInfoText}>
                    Eliav Cohen's Calculator
                </Text>

                <View
                    style={[
                        styles.codeHighlightContainer,
                        styles.navigationFilename,
                    ]}
                >
                    <MonoText style={styles.codeHighlightText}>menu</MonoText>
                </View>
            </View>
        );
    }

    // Create Features
    refreshControl() {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
            />
        );
    }

    onRefresh() {
        console.log('refreshing');
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 5000);
    }

    // RENDER
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    refreshControl={this.refreshControl()}
                >
                    {this.createWelcomeContainer()}

                    {this.createGetStartedContainer()}

                    {this.createHelpContainer()}

                    {this.createCoverImage()}
                </ScrollView>

                {this.createBottomMessage()}
            </View>
        );
    }
}

HomeScreen.navigationOptions = {
    header: null,
};

function DevelopmentModeNotice() {
    if (__DEV__) {
        const learnMoreButton = (
            <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
                Learn more
            </Text>
        );

        return (
            <Text style={styles.developmentModeText}>
                Development mode is enabled: your app will be slower but you can
                use useful development tools. {learnMoreButton}
            </Text>
        );
    } else {
        return (
            <Text style={styles.developmentModeText}>
                Your app will run at full speed.
            </Text>
        );
    }
}

function handleLearnMorePress() {
    WebBrowser.openBrowserAsync('https://docs.expo.io/');
}

function handleHelpPress() {
    WebBrowser.openBrowserAsync('https://docs.expo.io/');
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    imageMe: {
        width: '100%',
        height: 380,
    },
});

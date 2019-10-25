import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Colors from '../constants/Colors';

export default class LinksScreen extends Component {
    constructor() {
        super();
        this.state = {
            result: '0',
            display: '0',
            calculated: false,
            fadeUp: new Animated.Value(1),
        };
    }

    // Update STATE
    updateResult = dig => {
        return () => {
            let result = this.state.result + dig;

            if (this.state.result == 0) result = dig;

            if (this.state.calculated && dig * 1 == dig) {
                result = this.state.result + '+' + dig;
            }

            if (
                this.state.result.endsWith('+0') ||
                this.state.result.endsWith('-0') ||
                this.state.result.endsWith('*0') ||
                this.state.result.endsWith('/0')
            ) {
                result =
                    this.state.result.substring(
                        0,
                        this.state.result.length - 1
                    ) + dig;
            }

            if (
                (this.state.result.endsWith('+') ||
                    this.state.result.endsWith('-') ||
                    this.state.result.endsWith('*') ||
                    this.state.result.endsWith('/')) &&
                dig * 1 != dig
            ) {
                result = this.state.result;
            }

            this.setState({
                result,
                calculated: false,
                display: result
                    .split('+')
                    .join('+\n')
                    .split('-')
                    .join('-\n')
                    .split('*')
                    .join('*\n')
                    .split('/')
                    .join('/\n'),
            });
        };
    };

    fadeUp = () => {
        return Animated.timing(this.state.fadeUp, {
            toValue: 0,
            duration: 4000,
        }).start();
    };

    calculateResult = () => {
        this.setState({
            result: `${eval(this.state.result)}`,
            calculated: true,
            display: `${eval(this.state.result)}`,
        });
    };

    clearResult = () => {
        this.setState({ result: '0', display: '0', calculated: false });
    };

    // Create Components
    createButtonDigit = (
        color = Colors.buttonOne,
        num = '1',
        small = false
    ) => {
        return (
            <TouchableOpacity
                style={
                    small
                        ? [styles.button(color), styles.buttonSmall]
                        : styles.button(color)
                }
                onPress={this.updateResult(num)}
            >
                <Text style={styles.buttonText}>{num}</Text>
            </TouchableOpacity>
        );
    };

    createButtonOperation = (op = '+') => {
        return (
            <TouchableOpacity
                style={styles.buttonOp}
                onPress={this.updateResult(op)}
            >
                <Text style={[styles.buttonText, styles.buttonTextBlack]}>
                    {op}
                </Text>
            </TouchableOpacity>
        );
    };

    createButtonCalculate = () => {
        return (
            <TouchableOpacity
                style={[styles.buttonOp, styles.buttonFull]}
                onPress={this.calculateResult}
            >
                <Text style={[styles.buttonText, styles.buttonTextBlack]}>=</Text>
            </TouchableOpacity>
        );
    };

    createButtonClear = () => {
        return (
            <TouchableOpacity
                style={[styles.buttonOp, styles.buttonFull]}
                onPress={this.clearResult}
            >
                <Text style={[styles.buttonText, styles.buttonTextBlack]}>
                    Clear
                </Text>
            </TouchableOpacity>
        );
    };

    // RENDER
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                        <Text
                            style={
                                this.state.calculated
                                    ? [styles.result, styles.resultTint]
                                    : styles.result
                            }
                        >
                            {this.state.display}
                        </Text>
                    <View style={styles.buttonRow}>
                        {this.createButtonDigit(Colors.buttonFour, '1')}
                        {this.createButtonDigit(Colors.buttonOne, '2')}
                        {this.createButtonDigit(Colors.buttonThree, '3')}
                    </View>
                    <View style={styles.buttonRow}>
                        {this.createButtonDigit(Colors.buttonOne, '4')}
                        {this.createButtonDigit(Colors.buttonFour, '5')}
                        {this.createButtonDigit(Colors.buttonOne, '6')}
                    </View>
                    <View style={styles.buttonRow}>
                        {this.createButtonDigit(Colors.buttonThree, '7', true)}
                        {this.createButtonDigit(Colors.buttonOne, '8', true)}
                        {this.createButtonDigit(Colors.buttonFour, '9', true)}
                        {this.createButtonDigit(Colors.buttonThree, '0', true)}
                    </View>
                    <View style={[styles.buttonRow, styles.buttonRowSeparate]}>
                        {this.createButtonOperation('+')}
                        {this.createButtonOperation('-')}
                        {this.createButtonOperation('*')}
                        {this.createButtonOperation('/')}
                    </View>
                    <View style={styles.buttonRow}>
                        {this.createButtonCalculate()}
                        {this.createButtonClear()}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

LinksScreen.navigationOptions = {
    title: 'Calculator',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 15,
        backgroundColor: '#fff',
    },
    result: {
        fontSize: 47,
        color: Colors.gray,
        lineHeight: 55,
        backgroundColor: 'rgba(0,0,0,0.05)',
        padding: 4,
        marginLeft: 8,
        marginRight: 8,
    },
    resultTint: {
        color: Colors.tintColor,
    },
    button: color => {
        return {
            width: 120,
            height: 120,
            backgroundColor: color,
            marginTop: 8,
            justifyContent: 'center',
        };
    },
    buttonSmall: {
        width: 90,
        height: 90,
    },
    buttonOp: {
        width: 90,
        height: 90,
        backgroundColor: Colors.buttonTwo,
        marginTop: 8,
        justifyContent: 'center',
    },
    buttonFull: {
        width: '49%',
        height: 70,
        backgroundColor: `${Colors.buttonTwo}40`, // Last digits is transparency
    },
    buttonText: {
        textAlign: 'center',
        color: Colors.white,
        fontSize: 40,
    },
    buttonTextBlack: {
        color: Colors.gray,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 8,
        marginLeft: 8,
    },
    buttonRowSeparate: {
        marginTop: 10,
    },
});

// const adStyles = EStyleSheet.create({
//     'buttonOp:last-child': {
//         marginRight: 0,
//     },
// })

import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'

export default class LinksScreen extends Component {
    constructor() {
        super()
        this.state = {
            result: 0,
            operation: '+',
        }
    }

    updateResult = num => {
        return () => {
            // Plus
            if (this.state.operation === '+') {
                this.setState({ result: this.state.result + num });

                // Minus
            } else if (this.state.operation === '-') {
                this.setState({ result: this.state.result - num });

                // Multiply
            } else if (this.state.operation === '*') {
                this.setState({ result: this.state.result * num });

                // Divide
            } else if (this.state.operation === '/') {
                this.setState({ result: this.state.result / num });
            }
        }
	}
	
    updateOperation = op => {
        return () => {
            this.setState({ operation: op });
        }
    }

    createButtonDigit = (color = Colors.buttonOne, num = 1) => {
        return (
            <TouchableOpacity
                style={styles.button(color)}
                onPress={this.updateResult(num)}
            >
                <Text style={styles.buttonText}>{num}</Text>
            </TouchableOpacity>
        )
    }

    createButtonOperation = (op = '+') => {
        return (
            <TouchableOpacity
                style={styles.buttonSmall}
                onPress={this.updateOperation(op)}
            >
                <Text style={styles.buttonTextBlack}>{op}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.result}>{this.state.result}</Text>
                <View style={styles.buttonRow}>
                    {this.createButtonDigit(Colors.buttonFour, 1)}
                    {this.createButtonDigit(Colors.buttonOne, 2)}
                    {this.createButtonDigit(Colors.buttonThree, 3)}
                </View>
                <View style={styles.buttonRow}>
                    {this.createButtonDigit(Colors.buttonOne, 4)}
                    {this.createButtonDigit(Colors.buttonFour, 5)}
                    {this.createButtonDigit(Colors.buttonOne, 6)}
                </View>
                <View style={styles.buttonRow}>
                    {this.createButtonDigit(Colors.buttonThree, 7)}
                    {this.createButtonDigit(Colors.buttonOne, 8)}
                    {this.createButtonDigit(Colors.buttonFour, 9)}
                </View>
                <View style={styles.buttonRowLarge}>
                    {this.createButtonOperation('+')}
                    {this.createButtonOperation('-')}
                    {this.createButtonOperation('*')}
                    {this.createButtonOperation('/')}
                </View>
            </View>
        )
    }
}

LinksScreen.navigationOptions = {
    title: 'Calculator',
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
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
    button: color => {
        return {
            width: 120,
            height: 120,
            backgroundColor: color,
            marginLeft: 8,
            marginTop: 8,
            justifyContent: 'center',
        }
    },
    buttonSmall: {
        width: 90,
        height: 90,
        backgroundColor: Colors.buttonTwo,
        marginRight: 4,
        marginTop: 8,
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: Colors.white,
        fontSize: 40,
    },
    buttonTextBlack: {
        textAlign: 'center',
        color: Colors.gray,
        fontSize: 40,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
		marginRight: 8,
    },
    buttonRowLarge: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
		marginLeft: 8,
		marginRight: 4,
    },
})

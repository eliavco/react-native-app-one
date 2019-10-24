import React from 'react'
import { Platform } from 'react-native'
import {
    createStackNavigator,
    createBottomTabNavigator,
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'

import HomeScreen from '../screens/HomeScreen'
import CalculatorScreen from '../screens/CalculatorScreen'
import SettingsScreen from '../screens/SettingsScreen'

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
})

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
    },
    config
)

HomeStack.navigationOptions = {
    tabBarLabel: 'Info',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
}

HomeStack.path = ''

const CalculatorStack = createStackNavigator(
    {
        Calculator: CalculatorScreen,
    },
    config
)

CalculatorStack.navigationOptions = {
    tabBarLabel: 'Calculator',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-calculator' : 'md-calculator'}
        />
    ),
}

CalculatorStack.path = ''

const SettingsStack = createStackNavigator(
    {
        Settings: SettingsScreen,
    },
    config
)

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
    ),
}

SettingsStack.path = ''

const tabNavigator = createBottomTabNavigator(
    {
        HomeStack,
        CalculatorStack,
        SettingsStack,
    },
    { initialRouteName: 'CalculatorStack' }
)

tabNavigator.path = ''

export default tabNavigator

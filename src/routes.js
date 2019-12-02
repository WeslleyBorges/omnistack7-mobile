import React from 'react'
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Image } from 'react-native'

import Feed from "./pages/Feed";
import New from './pages/New'
import logo from './assets/logo.png'

export default createAppContainer(
    createStackNavigator({
        Feed,
        New
    }, {
        defaultNavigationOptions: {
            headerTitle: <Image style={{ marginHorizontal: 20 }} source={logo}></Image>,
            headerBackTitle: null,
            headerTintColor: '#000'
        },
        mode: "modal"
    })
)
import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native'

import camera from '../assets/camera.png'
import api from '../services/api'

export default class Feed extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <TouchableOpacity style={{ marginRight: 20 }} onPress={({ navigation }) => 
                navigation.navigate('New')}>
                <Image source={camera}></Image>
            </TouchableOpacity>
        )
    })

    state = {
        feed: []
    }

    async componentDidMount() {
        const response = await api.get('posts')
        console.log(response.data)
        this.setState({ feed: response.data })
    }

    render() {
        return (
            <View>
                <FlatList data={ this.state.feed }
                    keyExtractor={ post => post._id }
                    renderItem={({ item }) => (
                    <Text>{ item.author }</Text>
                    )}>

                </FlatList>
            </View>
        )
    }
}

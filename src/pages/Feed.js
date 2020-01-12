import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet
} from 'react-native'
import io from 'socket.io-client'

import camera from '../assets/camera.png'
import api from '../services/api'
import more from '../assets/more.png'
import like from '../assets/like.png'
import comment from '../assets/comment.png'
import send from '../assets/send.png'

export default class Feed extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <TouchableOpacity style={{ marginRight: 20 }} 
                onPress={() => navigation.navigate('New')}>
                <Image source={camera}></Image>
            </TouchableOpacity>
        )
    })

    state = {
        feed: []
    }

    async componentDidMount() {
        this.registerToSocket()
        const response = await api.get('posts')
        console.log(response.data)
        this.setState({ feed: response.data })
    }

    registerToSocket = () => {
        const socket = io('http://10.0.3.2:5000')
    
        socket.on('post', newPost => {
          this.setState({ feed: [newPost, ...this.state.feed] })
        })
    
        socket.on('like', likedPost => {
          const newBagulhos = this.state.feed.map(post => 
            likedPost._id === post._id ? likedPost : post
          )
    
          this.setState({ feed: newBagulhos })
        })
    }

    handleLike = postId => api.post(`/posts/${postId}/like`)

    render() {
        return (
            <View style={styles.container}>
                <FlatList data={ this.state.feed }
                    keyExtractor={ post => post._id }
                    renderItem={({ item }) => (
                    <View style={styles.feedItem}>
                        <View style={styles.feedItemHeader}>
                            <View style={styles.userInfo}>
                                <Text style={styles.name}>{item.author}</Text>
                                <Text style={styles.place}>{item.place}</Text>
                            </View>
                            <Image source={more}></Image>
                        </View>
                        <Image style={styles.feedImage} source={{ uri: `http://10.0.3.2:5000/${item.image}` }}></Image>
                        <View style={styles.feedItemFooter}>
                            <View style={styles.actions}>
                                <TouchableOpacity style={styles.action} 
                                    onPress={() => this.handleLike(item._id)}>
                                    <Image source={like}></Image>
                                </TouchableOpacity >
                                <TouchableOpacity style={styles.action} onPress={() => {}}>
                                    <Image source={comment}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.action} onPress={() => {}}>
                                    <Image source={send}></Image>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.likes}>{item.likes} curtidas</Text>
                            <Text style={styles.description}>{item.description}</Text>
                            <Text style={styles.hashtags}>{item.hashtags}</Text>
                        </View>
                    </View>
                    )}>

                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    feedItem: {
        marginTop: 20
    },

    feedItemHeader: {
        paddingHorizontal: 15,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    name: {
        fontSize: 14,
        color: '#000'
    },

    place: {
        fontSize: 12,
        color: '#666',
        marginTop: 2
    },

    feedImage: {
        width: '100%',
        height: 400,
        marginVertical: 15
    },

    feedItemFooter: {
        paddingHorizontal: 15
    },

    actions: {
        flexDirection: 'row'
    },

    action: {
        marginRight: 8
    },

    likes: {
        marginTop: 15,
        fontWeight: 'bold',
    },

    description: {
        lineHeight: 18
    },

    hashtags: {
        color: '#7159c1'
    }
})
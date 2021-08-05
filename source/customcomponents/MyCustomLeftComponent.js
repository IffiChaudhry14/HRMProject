import React, { Component } from 'react'
import { Text, View,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
export default class MyCustomLeftComponent extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity>
               <Icon name="menu-sharp" color='#fff' size={30}/>
               </TouchableOpacity>
            </View>
        )
    }
}

import React, { Component } from 'react'
import { Text, View,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

export default class MyCustomLeftComponent extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
               <Icon name="menu" color='#fff' size={20}/>
               </TouchableOpacity>
            </View>
            
        )
    }
}

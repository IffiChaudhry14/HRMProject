import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View>
        <Text style={{fontFamily:"Ubuntu-Regular"}}> textInComponent </Text>
<View><Text  style={{fontFamily:'Montserrat-Bold'}}>Hello</Text></View>
      </View>
    )
  }
}

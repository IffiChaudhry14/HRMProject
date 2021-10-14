import React, { Component } from 'react'
import { Text, View, Button, TextInput } from 'react-native'

export default class PhoneNumber extends Component {
    state = {
        phoneNumber: ''
    }
    render() {
        return (
            <View style={{ flex: 1,justifyContent:'center' ,marginHorizontal:20 }}>
                <View style={{marginVertical:15}}>
                    <TextInput
                    style={{backgroundColor:'skyblue',paddingHorizontal:10}}
                    placeholder={"Phone No"}
                        value={this.state.phoneNumber}
                        onChangeText={(text) => this.setState({ phoneNumber: text })}
                    />
                </View>
                <Button
                 title="Phone Number Sign In" onPress={() =>
                    this.props.onSubmit(this.state.phoneNumber)} />
            </View>
        )
    }
}

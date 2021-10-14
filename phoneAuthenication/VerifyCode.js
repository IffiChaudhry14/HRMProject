import React from 'react'
import { View, Text,TextInput,Button } from 'react-native'

const VerifyCode = (props) => {
    const [code, setCode] = React.useState();
    return (
        <View style={{flex:1}}>
            
            <View style={{marginVertical:15}}>
                    <TextInput
                    style={{backgroundColor:'skyblue',paddingHorizontal:10}}
                    placeholder={"Enter Verification Code"}
                        value={code}
                        onChangeText={(text) => setCode(text)}
                    />
                </View>
            <Button title="Confirm OTP" onPress={() => props.onSubmit(code)} />
        </View>
    )
}

export default VerifyCode

import React from 'react'
import { View, Text,Button } from 'react-native'
import auth from '@react-native-firebase/auth';

const AuthScreen = () => {
   
    
    return (
        <View>
           <Button title="Signout" onPress={() => auth().signOut()} />
        </View>
    )
}

export default AuthScreen
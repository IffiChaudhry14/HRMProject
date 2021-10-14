import React, { useState,useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import { View, Text, Button } from 'react-native'

import PhoneNumber from './PhoneNumber';
import VerifyCode from './VerifyCode';
import AuthScreen from './AuthScreen';
const PhoneNo = () => {
  const [confirm, setConfirm] = useState();
  const [authenticated, setAutheticated] = useState(false);
  
  useEffect(() => {
    auth().currentUser
    auth().onAuthStateChanged((user) => {
    if(user) {
      setAutheticated(true);
    }
    else {
      setAutheticated(false);
    }
  })
  })
  async function signIn(phoneNumber) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      alert(error);
    }
  }

  async function confirmVerificationCode(code) {
        try {
          await confirm.confirm(code);
          setConfirm(null);
        } catch (error) {
          alert('Invalid code');
        }
      }

function Confirmation (){
  if (authenticated) {
    return <AuthScreen />}
  if (confirm) {
    return <VerifyCode onSubmit={confirmVerificationCode} />
    
  } else {
    return <PhoneNumber onSubmit={signIn} />
  }
  
}
  



  return (
    <View style={{ flex: 1 }}>
      {/* <PhoneNumber onSubmit={signIn} /> */}
      {Confirmation()}
    </View>
  )
}



export default PhoneNo

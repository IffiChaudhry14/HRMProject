import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ForgetPassword from '../authscreens/ForgetPassword';
import BottomNavigation from './BottomNavigation'
import LoginScreen from '../authscreens/LoginScreen';
import Menu from '../appscreens/Menu';
import UserProfile from '../appscreens/UserProfile';
import UploadImage from '../appscreens/UploadImage';
import PhoneNo from '../../phoneAuthenication/PhoneNo';
const Stack = createStackNavigator();
const MainStackNavigator = () => {
    return (
            
            <Stack.Navigator screenOptions={{headerMode:false}}>
                <Stack.Screen name="PhoneNo" component={PhoneNo}/>
                 <Stack.Screen name="UploadImage" component={UploadImage}/>
                <Stack.Screen name="UserProfile" component={UserProfile}/>
               
            {/* <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            <Stack.Screen name="ForgetPassword" component={ForgetPassword}/>
            <Stack.Screen name="Home" component={BottomNavigation}/>*/}
            <Stack.Screen name="Menu" component={Menu}/> 
            
            </Stack.Navigator>

        
    );

}
export { MainStackNavigator };
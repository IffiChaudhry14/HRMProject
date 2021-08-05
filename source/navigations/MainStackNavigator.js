import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Notifications from '../appscreens/Notifications';
import DashBoard from '../appscreens/DashBoard';

const Stack = createStackNavigator();
const MainStackNavigator = () => {
    return (
            <Stack.Navigator screenOptions={{headerMode:false}}>
            
                <Stack.Screen name="Home" component={DashBoard} />
                <Stack.Screen name="Notifications" component={Notifications} />
            </Stack.Navigator>
        
    );

}


export { MainStackNavigator };
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashBoard from '../appscreens/DashBoard';
import AppDashboard from '../appscreens/AppDashboard';

const Stack = createStackNavigator();
const MainStackNavigator = () => {
    return (
            <Stack.Navigator screenOptions={{headerMode:false}}>
               {/* <Stack.Screen name="DashBoard" component={DashBoard}/> */}
                <Stack.Screen name="AppDashboard" component={AppDashboard}/>
            </Stack.Navigator>
        
    );

}
export { MainStackNavigator };
import React from "react";
import { createBottomTabNavigator,createAppContainer } from '@react-navigation/bottom-tabs';
import AppDashboard from "../appscreens/AppDashboard";
import DashBoard from '../appscreens/DashBoard'
import Leave from '../appscreens/Leave'
import Notifications from "../appscreens/Notifications";
import { StyleSheet,Text,View,Image,TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
    
     <View>         
          
    <TouchableOpacity onPress={onPress} style={{ top: -25, justifyContent: 'center', alignSelf: 'center', ...styles.shadow}}>
        <View style={{backgroundColor:'#022C43', width: 50, height: 50,borderRadius:25 }}>
            {children}
        </View>
    </TouchableOpacity>
    </View>
);


const BottomNavigation=()=> {
    return (
        <Tab.Navigator 
        initialRouteName="AppDashboard"
        screenOptions={{
            headerShown:false,
            tabBarStyle:{
                position:'absolute',
                elevation:3,
                backgroundColor:'#FFFFFF',
                height:60,
                ...styles.shadow,
                bottom:10,
                left:10,
                right:10,
                borderRadius:12,
            }
        }
        

        }
        >
          <Tab.Screen name="Dashboard" component={DashBoard}
            options={{
                tabBarShowLabel:false,
                tabBarIcon: ({ focused }) => (<View style={{alignItems:'center',justifyContent:'center'}}><Image source={require('../../assets/images/notes.png')}
                 resizeMode='contain' style={{ tintColor: focused ? '#1D132B' : '#022C43', width: 40, height: 40, }} /></View>) }}
    
            />
          <Tab.Screen name="Notifications" component={Notifications}
           options={{
            tabBarShowLabel:false,
            tabBarIcon: ({ focused }) => (<View style={{alignItems:'center',justifyContent:'center'}}><Image source={require('../../assets/images/bell.png')}
                 resizeMode='contain' style={{ tintColor: focused ? '#1D132B' : '#022C43', width: 35, height: 35, }} /></View>) }}
       
           />
          <Tab.Screen name="AppDashboard" component={AppDashboard}
           options={{
               
            tabBarShowLabel:false,
            tabBarIcon: ({ focused }) => (
            
            <Image source={require('../../assets/images/Home.png')}
                 resizeMode='contain' 
                 style={{ tintColor:'#fff' , width: 30, height: 30 }}
                  />),
                tabBarButton:(props)=>(
                    <CustomTabBarButton {...props}/>
                )
                }}
        />
          <Tab.Screen name="Leave" component={Leave}
        options={{
            tabBarShowLabel:false,
            tabBarIcon: ({ focused }) => (<View style={{alignItems:'center',justifyContent:'center'}}><Image source={require('../../assets/images/papers.png')}
                 resizeMode='contain' style={{ tintColor: focused ? '#1D132B' : '#022C43', width: 30, height: 30, }} /></View>) }}
           
           />
          {/* <Tab.Screen name="Profile" component={Profile}
        options={{
            tabBarShowLabel:false,
            tabBarIcon: ({ focused }) => (<View style={{alignItems:'center',justifyContent:'center'}}><Image source={require('../../assets/images/man.png')}
                 resizeMode='contain' style={{ tintColor: focused ? '#1D132B' : '#022C43', width: 30, height: 30, }} /></View>) }}
           /> */}
             
         </Tab.Navigator>
    );
}
export default BottomNavigation;

const styles=StyleSheet.create({
    shadow:{
        shadowColor:'#7F5DF0',
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity:0.30,
        shadowRadius:3.5,
        elevation:5
    }
})


function Notes(){
    return(
        <View>
            <Text>Notes</Text>
        </View>
    )
}
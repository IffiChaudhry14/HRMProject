import React, { Component } from 'react'
import { Header } from 'react-native-elements';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import MyCustomLeftComponent from '../customcomponents/MyCustomLeftComponent';
export default class DashBoard extends Component{
    constructor(props){
        super(props)
    }
    render() {
        return (
            <View style={styles.dbContainer}>
                <View >
                    <Header containerStyle={{
                        height:80,
                        justifyContent: 'space-around',
                        paddingHorizontal:15,
                        alignItems:'center'
                        
                    }}
                        leftComponent={<MyCustomLeftComponent {...this.props}/>}
                        centerComponent={{ text: 'Dashboard', style: { color: '#fff', fontFamily: 'Ubuntu-Bold', fontSize: 18 } }}
                    />
                </View>
                <View style={styles.ImageView1}>
                    <Image source={require('../../assets/images/logo.png')}
                        style={styles.Imagelogo} />
                </View>

                <View style={styles.dashboardContainer}>
                    <View style={styles.dashbaordItem} >
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('AppDashboard')}
                        style={styles.touchView}>
                            <Icon name="notifications-sharp" size={50} color={'#FFFFFF'} style={{ backgroundColor: '#022C43', borderRadius: 30, padding: 5, width: 60 }} />
                            <Text style={styles.ItemText}>Notifications</Text>
                        </TouchableOpacity>
                    </View>
                    <View></View>
                    <View style={styles.dashbaordItem}>
                        <TouchableOpacity style={styles.touchView}>
                            <Icon2 name="calendar-clock" size={50} color={'#FFFFFF'} style={{ backgroundColor: '#022C43', borderRadius: 30, padding: 5, width: 60 }} />
                            <Text style={styles.ItemText}>Attendance</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.dashboardContainer}>
                    <View style={styles.dashbaordItem} >
                        <TouchableOpacity style={styles.touchView}>
                            <Icon1 name="person" size={50} color={'#FFFFFF'} style={{ backgroundColor: '#022C43', borderRadius: 30, padding: 5, width: 60 }} />
                            <Text style={styles.ItemText}>Employee Details</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dashbaordItem}>
                        <TouchableOpacity style={styles.touchView}>
                            <Icon1 name="add-task" size={50} color={'#FFFFFF'} style={{ backgroundColor: '#022C43', borderRadius: 30, padding: 5, width: 60 }} />
                            <Text style={styles.ItemText}>My Tasks</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    dbContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    ImageView1: {
        marginTop: 50,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    dashboardContainer: {
        elevation: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 25,
        marginTop:30,
    },
    dashbaordItem: {
        elevation: 3,
        backgroundColor: '#FFFFFF',
        borderRadius: 35,
        justifyContent: 'center',
        paddingVertical: 10,
        marginHorizontal: 10,
        paddingHorizontal: 3,
        height: 150,
        width: '45%'
    },
    ItemText: {
        paddingVertical: 10,
        color: '#2F2F2F',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        textAlign: 'center'
    },
    touchView: {
        alignItems: 'center'
    }

})
import React, { Component } from 'react'
import { Header } from 'react-native-elements';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Fontisto'
import MyCustomLeftComponent from '../customcomponents/MyCustomLeftComponent';
export default class DashBoard extends Component {
    render() {
        return (
            <View style={styles.dbContainer}>
                <View style={{ alignItems: 'center' }}>
                    <Header containerStyle={{
                        height:80,
                        backgroundColor: '#4F9DBC',
                        justifyContent: 'space-around',
                        paddingHorizontal:10
                    }}
                        leftComponent={<MyCustomLeftComponent />}
                        centerComponent={{ text: 'DashBoard', style: { color: '#fff', fontFamily: 'Roboto-Bold', fontSize: 18 } }}
                    />
                </View>
                <View style={styles.ImageView1}>
                    <Image source={require('../../assets/images/logo.png')}
                        style={styles.Imagelogo} />
                </View>
                <View style={styles.dashboardContainer}>
                    <View style={styles.dashbaordItem} >
                        <TouchableOpacity style={styles.touchView}>
                            <Icon name="notifications-sharp" size={50} color={'#FFFFFF'} style={{ backgroundColor: '#022C43', borderRadius: 30, padding: 5, width: 60 }} />
                            <Text style={styles.ItemText}>Notifications</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dashbaordItem}>
                        <TouchableOpacity style={styles.touchView}>
                            <Icon name="menu-sharp" size={50} color={'#FFFFFF'} style={{ backgroundColor: '#022C43', borderRadius: 30, padding: 5, width: 60 }} />
                            <Text style={styles.ItemText}>Annoucements</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.dashboardContainer}>
                    <View style={styles.dashbaordItem} >
                        <TouchableOpacity style={styles.touchView}>
                            <Icon1 name="person" size={50} color={'#FFFFFF'} style={{ backgroundColor: '#022C43', borderRadius: 30, padding: 5, width: 60 }} />
                            <Text style={styles.ItemText}>Employee Management</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dashbaordItem}>
                        <TouchableOpacity style={styles.touchView}>
                            <Icon1 name="add-task" size={50} color={'#FFFFFF'} style={{ backgroundColor: '#022C43', borderRadius: 30, padding: 5, width: 60 }} />
                            <Text style={styles.ItemText}>Create Task</Text>
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
        marginTop: 10,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    Imagelogo: {
        height: 200,
        width: '100%'
    },
    dashboardContainer: {
        elevation: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 25,
        marginVertical: 10,
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
        padding: 10,
        color: '#2F2F2F',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        textAlign: 'center'
    },
    touchView: {
        alignItems: 'center'
    }

})
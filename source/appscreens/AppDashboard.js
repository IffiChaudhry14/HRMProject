import React, { Component } from 'react'
import { Text, View, Image, ImageBackground, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class AppDashboard extends Component {
    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>

                    <ImageBackground source={require('../../assets/images/back.png')}
                        style={{ height: 278, width: '100%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Image style={{ position: 'absolute', top: 15, left: 10, zIndex: 1 }}
                                source={require('../../assets/images/logooo.png')} />
                            <Icon name="notifications-sharp" size={30} color={'#FFFFFF'}
                                style={{ position: 'absolute', top: 15, right: 10, zIndex: 1 }} />
                            <Text style={{
                                position: 'absolute', top: 100, left: 20,
                                textShadowOffset: { width: 2, height: 3 },
                                textShadowRadius: 10,
                                textShadowColor: 'blue',
                                zIndex: 1, color: '#FFFFFF', fontSize: 28, fontFamily: 'Ubuntu-Bold'
                            }}>
                                Dashboard</Text>
                        </View>
                    </ImageBackground>


                    <View elevation={3} style={{
                        marginHorizontal: 25, paddingVertical: 10, flexDirection: 'row',
                        paddingHorizontal: 15, backgroundColor: "#F6F5FD",
                        borderRadius: 15, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Text style={{ position: 'absolute', top: 5, left: 10, fontSize: 21, fontFamily: 'Ubuntu-Light' }}>
                            Check</Text>
                        <TouchableOpacity>
                            <View style={{
                                backgroundColor: '#E4D5FA', height: 96, width: 96, borderRadius: 48,
                                justifyContent: 'center', alignItems: 'center', marginStart: 30,
                            }}>
                                <Text style={{ fontSize: 36, fontFamily: 'Ubuntu-Light', color: '#1D132B' }}>
                                    In</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={{
                                backgroundColor: '#E4D5FA', height: 70, width: 70, borderRadius: 48,
                                justifyContent: 'center', alignItems: 'center', marginStart: 20, backgroundColor: '#1D132B'
                            }}>
                                <Text style={{ fontSize: 22, fontFamily: 'Ubuntu-Light', color: '#FFFFFF' }}>Out</Text>
                            </View>

                        </TouchableOpacity>
                    </View>

                    <Text style={{ marginTop: 20, marginStart: 30, fontSize: 18, fontFamily: 'Ubuntu-Light', color: '#1D132B' }}>
                        Location</Text>
                    {/* <View elevation={0} style={{marginHorizontal:25,marginTop:10}}>
                    <Image source={require('../../assets/images/map.png')}
                    style={{height:'100%',width:'100%'}}/>
                    </View>
                    <View style={{marginHorizontal:25,marginTop:10}}>
                    <Image source={require('../../assets/images/map.png')}
                    resizeMode={'stretch'}
                    style={{height:'100%',width:'100%'}}/>
                    </View> */}

                    <Text style={{ marginTop: 20, marginStart: 30, fontSize: 18, fontFamily: 'Ubuntu-Light', color: '#1D132B' }}>
                        Annoucements</Text>
                        {/* <TouchableOpacity>
                        <View elevation={1} style={{
                        marginHorizontal: 25, paddingVertical: 30, paddingHorizontal: 25, flexDirection: 'row',
                        backgroundColor: "#F6F5FD", marginTop: 15, borderRadius: 15,alignItems:'center'
                    }}>
                        <View style={{height:60,width:60,padding:5,justifyContent:'center',alignItems:'center',backgroundColor:'#951939',borderRadius:30,}}>
                            <Text  style={{ fontSize: 16, fontFamily: 'Ubuntu-Light', color: '#FFFFFF' }}>25</Text>
                        </View>
                        <Text style={{paddingHorizontal:10,width:240}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</Text>
                    </View>
                        </TouchableOpacity> */}
                  


                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
})
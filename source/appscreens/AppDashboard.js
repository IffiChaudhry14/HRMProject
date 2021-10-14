import React, { Component } from 'react'
import { Text, View, Image, Dimensions, ImageBackground, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import Icon1 from 'react-native-vector-icons/Fontisto'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import WebHandler from '../remote/WebHandler';
import Routes from '../remote/Routes';
import moment from 'moment';

const colors = ['tomato', 'thistle', 'skyblue', 'teal'];
export default class AppDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            Response:[],
            AllMenus: [],
            TodayMenu: '',
            TodayDate: '',
            TodayNotify:null,
            setdescription: [],
            AllDates: [],
            notificationtime: [],
            allNotifications:[],
            allDescriptions:[],
            allNotifyTime:[]
        })
    }
    componentDidMount() {
        const webHandler = new WebHandler();

        webHandler.sendGetDataRequest(Routes.NOTIFICATONS, null,
            (resp) => {
                let response=JSON.stringify(resp);
                let allnotify=resp.notifications.map(a=>a.notification) ;
                let alldescript=resp.notifications.map(a=>a.description);
                let alltime=resp.notifications.map(a=>a.time);
                let notify = resp.notifications.slice(0, 4);
                let checkdata = notify.map(a => a.notification);
                let notifytime = notify.map(a => a.time);
                this.setState({
                    Response:response,
                    TodayNotify: checkdata,
                    notificationtime: notifytime,
                    allNotifications:allnotify,
                    allDescriptions:alldescript,
                    allNotifyTime:alltime,
                })
                console.log("All Data",this.state.Response)
                console.log("All Notifications",allnotify)
                console.log("All Description",alldescript)
                console.log("Check Data", checkdata)
                console.log("notifytime", notifytime)
            }
        )
        webHandler.sendGetDataRequest(Routes.TODAY_MENU, null,
            (respJson) => {
                let response = respJson.menu[0].menu;
                let todaydate = respJson.menu[0].created_at;
                let result = respJson.menu.map(a => a.menu);
                let descript = respJson.menu.map(a => a.description);
                let menudate = respJson.menu.map(a => a.created_at);
                this.setState({
                    TodayMenu: response,
                    TodayDate: todaydate,
                    AllDates: menudate,
                    AllMenus: result,
                    setdescription: descript
                })

                console.log("Today Menu Response:", response)
                console.log("All Menu Response:", result)
                console.log("Menu description", descript)
                console.log("date", todaydate)
            })



    }

    render() {


        return (

            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Image source={require('../../assets/images/back.png')}
                        style={{ width: '100%' }}
                    />
                    <View style={{ position: 'absolute', top: 90, }}>
                        <Image style={{ position: 'absolute', bottom: 0, left: 10, zIndex: 1 }}
                            source={require('../../assets/images/logooo.png')} />
                        <TouchableOpacity style={{ position: 'absolute', bottom: 25, left: 310, zIndex: 1 }}
                            onPress={() => alert('click')}>
                            <Icon1 name="power" size={35} color={'#FFFFFF'}
                            />
                        </TouchableOpacity>
                        <Text style={{
                            position: 'absolute', top: 50, left: 20,
                            textShadowOffset: { width: 1, height: 2 },
                            textShadowRadius: 10,
                            textShadowColor: 'white',
                            zIndex: 1, color: '#FFFFFF', fontSize: 28, fontFamily: 'Ubuntu-Bold'
                        }}>
                            Dashboard</Text>
                    </View>



                    <View elevation={3} style={{
                        marginHorizontal: 25, paddingVertical: 10, flexDirection: 'row',
                        paddingHorizontal: 15, backgroundColor: "#f8f8f8", marginTop: 10,
                        borderRadius: 15, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Text style={{ position: 'absolute', top: 5, left: 10, fontSize: 21, fontFamily: 'Ubuntu-Regular' }}>
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

                    <View style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 25 }}>
                        <Text style={{ marginStart: 10, fontSize: 21, fontFamily: 'Ubuntu-Regular', color: '#1D132B' }}>
                            Notifications</Text>
                        {this.state.Response && 
                        <SwiperFlatList
                        autoplay
                        data={this.state.Response}
                        autoplayDelay={1.5}
                        autoplayLoop
                        index={0}
                        showPagination
                        paginationStyle={{ bottom: -30 }}
                        // paginationStyleItemActive={{width:20}}
                        paginationDefaultColor={'black'}
                        paginationActiveColor={'skyblue'}

                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Notifications',
                            {Notifications:this.state.allNotifications,
                                Descriptions:this.state.allDescriptions,
                                Time:this.state.allNotifyTime}
                            )}>

                                <View elevation={2.5}
                                    style={[styles.child, { backgroundColor: '#f8f8f8' }]}>
                                    <View  style={styles.item}>
                                        <Text style={styles.text}>murshad</Text>
                                    </View>
                                    <Text style={styles.notifications}>jani</Text>

                                    <View style={{ position: 'absolute', bottom: 5, zIndex: 1, right: 10 }}>
                                        <Text style={styles.notifytime} >bhai</Text>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        )}
                    />


                        }
                    </View>
                    <Text style={{ marginTop: 15, marginStart: 30, fontSize: 21, fontFamily: 'Ubuntu-Regular', color: '#1D132B' }}>
                        Today Menu</Text>
                    <View elevation={3} style={{
                        marginHorizontal: 25, paddingVertical: 15,
                        paddingHorizontal: 0, backgroundColor: "#f8f8f8", marginTop: 10, marginBottom: 100,
                        borderRadius: 15, alignItems: 'center', justifyContent: 'center'
                    }}>

                        <TouchableOpacity onPress={() =>
                            this.props.navigation.navigate('Menu',
                                {
                                    GetAllMenus: this.state.AllMenus,
                                    GetDescription: this.state.setdescription,
                                    GetAllDates: this.state.AllDates
                                })
                        }>
                            
                            <Text style={{ fontSize: 18, fontFamily: 'Ubuntu-Regular', color: '#1D132B', paddingRight: 20 }}>
                                Enjoy Your Meal  With
                            </Text>
                            <Text style={{ fontSize: 16, fontFamily: 'Ubuntu-Light', color: '#1D132B', textAlign: 'center', paddingTop: 5 }}>
                                {this.state.TodayMenu}
                            </Text>
                        </TouchableOpacity>           
                        <View style={{ position: 'absolute', bottom: 2, zIndex: 1, right: 10,paddingTop:5 }}>
                                            <Text style={styles.notifytime} >{this.state.TodayDate}</Text>
                                        </View>
                    </View>
                </ScrollView>
            </View>

        )
    }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginBottom: 30
    },
    child: {
        marginTop: 10, borderRadius: 20, height: 100, paddingVertical: 15, paddingStart: 15, marginStart: 5, marginRight: 10,
        backgroundColor: 'red', width: width * 0.86, flexDirection: 'row', alignItems: 'center',marginBottom:5
    },
    item: {
        height: 60, width: 60, backgroundColor: 'grey', borderRadius: 30, justifyContent: 'center'
    },
    text: { fontSize: 22, textAlign: 'center' },
    notifications: { fontSize: 16, textAlign: 'center', paddingHorizontal: 10, flexShrink: 1, },
    notifytime: { fontSize: 14, textAlign: 'center' ,color:'red'},
})
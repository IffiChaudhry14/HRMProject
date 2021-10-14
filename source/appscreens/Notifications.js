import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements';

export default class Notifications extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            search: '',
            selectedItem: '',
            AllNotifications: this.props.route.params?.Notifications ?? null,
            AllDescriptions: this.props.route.params?.Descriptions ?? null,
            AllTimes: this.props.route.params?.Time ?? null,
        })
    }

    updateSearch = (search) => {
        this.setState({ search });
    };
    componentDidMount() {
        let { AllNotifications, AllDescriptions, AllTimes } = this.state;
        let ShowNotifications = AllNotifications
        let ShowDescriptions = AllDescriptions
        let ShowTime = AllTimes
        this.setState({
            AllNotifications: ShowNotifications,
            AllDescriptions: ShowDescriptions,
            AllTimes: ShowTime,
        })
        console.log("All Menus", AllNotifications)
        console.log("all descriptions:", AllDescriptions)
        console.log("Show All Dates" + this.state.AllDates)
    }

    render() {
        const { search } = this.state;
        return (
            <View style={{ marginBottom: 30, flex: 1 }}>
               
                    <Image source={require('../../assets/images/back.png')} style={styles.image} />
                    <SearchBar
                        placeholder="Search"
                        onChangeText={this.updateSearch}
                        value={search}
                        searchIcon={{ color: '#000', size: 26, marginTop: -3.5 }}
                        containerStyle={{ backgroundColor: "white", width: "80%", alignSelf: "center", borderRadius: 20, height: 50, marginTop: 36 }}
                        inputContainerStyle={{ backgroundColor: 'color', height: 40, }}
                        clearIcon={{ color: '#000', size: 26, }}
                    />
                    <Text style={styles.notification}>Notifications</Text>
                    <View style={{ flex: 1, marginTop: 80, marginHorizontal: 10 }}>
                        <FlatList contentContainerStyle={{ flexGrow: 1, paddingBottom: 100, }}
                            data={this.state.AllNotifications}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => this.NOTIFICATIONS(item, index)}
                            keyExtractor={(item, index) => index.toString()} />
                    </View>

              
            </View>
        )
    }
    NOTIFICATIONS = (item, index) => {
        return (
            <TouchableOpacity key={index}
                onPress={() => this.setState({ selectedItem: item.title })} >
                <View elevation={2.5}
                    style={{
                        backgroundColor: '#f8f8f8',
                        borderRadius: 20, marginTop: 25, marginHorizontal: 10, paddingStart: 15,
                         paddingVertical: 15, alignItems: 'center', justifyContent: 'center'
                    }}>
                  
                    <Text style={{ fontSize: 18, fontFamily: 'Ubuntu-Regular', color: '#1D132B', paddingRight: 20 }}>
                        {this.state.AllNotifications[index]}
                    </Text>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    
                    <View style={styles.item}>
                        <Text style={styles.text}>{item[0]}</Text>
                    </View>
                    
                    <Text style={{
                        fontSize: 16, fontFamily: 'Ubuntu-Light', color: '#1D132B',paddingHorizontal:10,
                        paddingTop: 5, paddingBottom: 10,flexShrink:1,alignSelf : "center",
                    }}>
                        {this.state.AllDescriptions[index]}
                    </Text>
                    </View>
                    <Text style={{ fontSize: 12, fontFamily: 'Ubuntu-Regular', color: 'green', position: 'absolute', right: 20, bottom: 8 }}>
                        {this.state.AllTimes[index]}
                    </Text>

                </View>

            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({
    image: {
        alignItems: 'center',
        resizeMode: 'stretch',
        width: '100%',
        position: 'absolute'
    },
    notification: {
        fontFamily: 'Ubuntu-Bold', textAlign: 'center',
        fontSize: 28.2,
        color: '#fff',
        marginTop: 26,
        textShadowColor: '#F6F5Fd',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 7,
    },
    shadowstyle: {
        backgroundColor: '#F6F5FD',
        width: "70%",
        alignSelf: 'center',
        alignItems: 'center',
        height: 100,
        borderRadius: 20,
        marginBottom: 20
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 6,
    },
    date: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 14,
    },
    item: {
        height: 70, width: 70, backgroundColor: 'grey', borderRadius: 35, justifyContent: 'center'
        ,alignItems:'center',
    },
    text: { fontSize: 22, textAlign: 'center' },
})


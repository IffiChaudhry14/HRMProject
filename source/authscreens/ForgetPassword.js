import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity, Linking ,ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import WebHandler from '../remote/WebHandler';
import Routes from '../remote/Routes';
export default class ForgetPassword extends Component {
    state = {
        url: 'https://hwsuite.itsumar.com',
        email: '',
        isLoading: false,
    }
    render() {
        return (

            <View style={{ flex: 1 }}>
                <Image source={require('../../assets/images/background.jpg')} style={{ width: '100%', height: "100%" }} />
                <View style={{ ...styles.shadow, ...styles.shadowstyle }}>
                    <Text style={styles.login}>Password Reset</Text>
                    <Text style={{ fontWeight: 'bold', alignSelf: 'center', color: "#1D132B" }}>Please enter your registered email for</Text>
                    <View style={{ marginTop: 50 }}>
                        <View style={styles.container} >
                            <Icon name="mail" style={styles.icon2} size={20} color="#000" />   
                            <TextInput
                                value={this.state.email}
                                secureTextEntry={this.email}
                                placeholder="Email"
                                onChangeText={(txt) => this.setState({ email: txt })}
                                placeholderTextColor="black"
                                style={styles.textinput}
                            />
                            
                        </View>
                        {this.state.isLoading &&
                            <ActivityIndicator size={"large"} animating={true} color={"black"}  style={{opacity:1}} />
                        }
                        <View style={{ justifyContent: 'center', marginTop: 70, }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Ubuntu-Bold', fontSize: 14, color: '#1D132B' }}>Any Query?  Contact us</Text>
                            <TouchableOpacity onPress={this.loadInBrowser}>
                                <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'Ubuntu-Bold', marginBottom: 0, color: '#CC33CC' }}>https://hwsuite.itsumar.com</Text>
                       
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {!this.state.isLoading &&
                 
                <TouchableOpacity onPress={this.SubmitEmail}
                    style={styles.button} activeOpacity={0.5}>
                    <Text style={styles.text2}>Submit</Text>
                </TouchableOpacity>
    }
            </View>

        )
    }
    loadInBrowser = () => {
        Linking.openURL(this.state.url).catch(err => console.error("Couldn't load page", err));
    };
    SubmitEmail = () => {

        let { email } = this.state;
        const bodyParams = new FormData();
        bodyParams.append('email', email)
        let webHandler = new WebHandler();
        webHandler.sendPostDataRequest(Routes.FORGET_PASSWORD, bodyParams,
            (resp) => {
              console.log(JSON.stringify(resp))
              alert("Please Check your email for Verification")
            },
            (error) => {
                if('email'!=email)
                {
                    alert("You have entered an invalid email address!")
                }
                else{
                    alert("Something went wrong...")
                }
              
            }
          )
    }
}
const styles = StyleSheet.create({
    shadow: {
        shadowColor: "grey",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 4,
    },
    shadowstyle: {
        position: 'absolute', backgroundColor: '#F6F5FD', width: "80%",
        marginBottom: '30%',
        borderRadius: 20,
        alignSelf: "center",
        marginTop: '40%'
    },
    login: {
        color: '#1D132B',
        fontSize: 27,
        marginTop: 50,
        textAlign: 'center',
        fontFamily: 'Roboto-Bold'
    },
    textinput: {
        paddingHorizontal: 15,
        fontFamily: 'Ubuntu-Regular'
    },
    container: {
        marginTop: 5,
        flexDirection: 'row',
        height: 55,
        alignItems:'center',
        borderRadius: 10,
        borderBottomWidth: 1,
        borderColor: "#7B7B7B",
        width: "78%",
        alignSelf: "center",
    },
    
    icon2: {
        color: '#1D132B'
    },
    button: {
        position: 'absolute',
        bottom: 50,
        height: 50,
        zIndex:1,
        width: "45%",
        borderColor: "white",
        borderWidth: 2,
        alignSelf: "center",
        borderTopLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        paddingVertical: 3,
        justifyContent:'center'
    },
    text2: {
        color: 'white',
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'Ubuntu-Regular'
    },
})
import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity,ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import PrefHandler from '../data/PrefHandler'
import Routes from '../remote/Routes'
import WebHandler from '../remote/WebHandler';
import { CommonActions } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

export default class extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            // showPassword: '',
            isLoading: false,
            userData:[],
            loggedIn: false,
        }
    }
    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View>
                    <ScrollView>
                        <Image source={require('../../assets/images/background.jpg')} style={styles.image} />
                        <View style={{ ...styles.shadowstyle, ...styles.shadow }}>
                            
                            <Text style={styles.text}>Login</Text>
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
                                <View style={styles.container} >
                                    <Icon name="lock" style={styles.icon2} size={20} color="#000" />
                                    <TextInput
                                        value={this.state.password}
                                        secureTextEntry={this.state.showPassword}
                                        placeholder="Password"
                                        onChangeText={(txt) => this.setState({ password: txt })}
                                        placeholderTextColor="black"
                                        style={styles.textinput}
                                    />
                                    <TouchableOpacity onPress={() => this.setState({ showPassword: !this.state.showPassword })}>
                                        <Icon name={this.state.showPassword == true ? 'eye-with-line' : 'eye'} style={styles.icon3} size={20} />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('ForgetPassword')}>
                                <Text style={styles.text3}>Forget Password?</Text>
                                {this.state.isLoading &&
                            <ActivityIndicator size={"large"} color={"red"} />
                        }</TouchableOpacity>
                            </View>
                        </View>
                       
                         {!this.state.isLoading &&   
                        <TouchableOpacity onPress={() => this.handleLogin()}
                            style={styles.button} activeOpacity={0.5}>
                            <Text style={styles.text2}>Submit</Text>
                        </TouchableOpacity>
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }

    handleLogin=async ()=> {
        const {email,password} = this.state
    
        if (email == "" || password=="") {
            alert("empty field not allowed")
            return
        }

        else if(password.length<8){
            alert("Try one with at least 8 characters.")
        }
        else{
        this.setState({ isLoading: true })
        const webHandler = new WebHandler()
               // const bodyParams = { email:email, password: password }
        const bodyParams=new FormData()
        bodyParams.append("email",email)
        bodyParams.append("password",password) 
        const prefs = new PrefHandler() 
                                                  
        webHandler.sendPostDataRequest(Routes.LOGIN_USER, bodyParams,
             (resp) => { 
                    
                if(email && password){
                    prefs.createSession(resp.data, resp.token, (isCreated) => {
                        if (isCreated) {
                            console.log("Employee Data:",resp.data),
                            console.log("Employee Token",resp.token)
                            this.props.navigation.dispatch(
                                StackActions.replace('Home')
                              );
                              
                        } else {
                            alert("something went wrong...")
                        }
                    }) 
                }    
            }, (errorData) => {
                 if('email'!=email || 'password'!=password){
                     alert("Invalid Credentials!")
                 }
               
                else{
                    alert("Something went Wrong...")
                }
            this.setState({ isLoading: false })
        })   
        }
  
    }
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
    },
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
        height: "50%",
        marginBottom: 50,
        borderRadius: 20,
        alignSelf: "center",
        marginTop: '40%'
    },
    text: {
        color: '#1D132B',
        fontSize: 40,
        fontFamily: 'Ubuntu-Bold',
        textAlign: 'center',
        marginTop: '18%'
    },
    textinput: {
        marginStart: 12,
        flex: 1,
        fontFamily: 'Ubuntu-Regular'
    },
    container: {
        marginTop: 5,
        flexDirection: 'row',
        height: 55,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10,
        borderBottomWidth: 1,
        borderColor: "#7B7B7B",
        width: "75%",
        alignSelf: "center",
    },
    icon3: {
        color: '#1D132B',
    },
    icon1: {
        color: '#1D132B',
    },
    icon2: {
        color: '#1D132B',
    },
    text3: {
        textAlign: "center",
        marginTop: "10%",
        marginBottom: 60,
        fontFamily: 'Ubuntu-Regular',
        color: '#1D132B',
    },
    button: {
        position: 'absolute',
        height: 50,
        width: "45%",
        bottom: 140,
        borderColor: "white",
        borderWidth: 2,
        alignSelf: "center",
        borderTopLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        justifyContent:'center'
    },
    text2: {
        color: 'white',
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'Ubuntu-Regular'
    },
})
import React, { Component } from 'react'
import { Image, ScrollView, Text, TextInput, View, StyleSheet, Alert, Button, TouchableOpacity, Platform } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import {
    AccessToken,
    AuthenticationToken,
    Profile,
    LoginManager
} from 'react-native-fbsdk-next';

export default class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fname: '',
            lname: '',
            email: '',
            phone: '',
            address: '',
            designation: '',
            imagePath: '',
            userData: [],
            loggedIn: false,
            fblogin: false,
            userInfo: ''

        }
    }

    componentDidMount() {

        GoogleSignin.configure({
            webClientId: '217552337705-ddi7bs65tucgv11ecfnu5tsr34tktqiq.apps.googleusercontent.com',
            offlineAccess: true,
            hostedDomain: '',
            forceConsentPrompt: true,
        });

        AsyncStorage.getItem('profile')
            .then((imagePath) => {
                if (this.state.imagePath !== null) {
                    this.setState({ imagePath: imagePath })
                    console.log("Get image succesfully ------->", imagePath);
                }
            })
        this.getCurrentUser();

    }


    fbLogin = async () => {
        try {

            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions(
                ['public_profile', 'email'],
                'limited',
                'my_nonce'
              );
              console.log("Result",result);

            if (result.isCancelled) {
                throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();
            console.log("Data",data?.accessToken);
            if (!data) {
                throw 'Something went wrong obtaining access token';
            }


            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
            // Sign-in the user with the credential
            await auth().signInWithCredential(facebookCredential);
            this.setState({
                fblogin: true,
            })
           
            
            Profile.getCurrentProfile().then(
            (currentProfile)=> {
              if (currentProfile) {
                  this.setState({
                      fname:currentProfile.name,
                      email:currentProfile.userID
                  })
                alert("The current logged user is: " +
                  currentProfile.name
                  + ". His profile id is: " +
                  currentProfile.userID
                );
              }
            }
          );

        }
        catch (error) {
            console.log(error)
        }
    }

    fbLogout = async () => {
        try {
            await LoginManager.logOut()
            this.setState({
                loggedIn: false,
                fname:null,
                email:null
            });
            alert('logout successfull')
        } catch (error) {
            console.error(error);
        }
    };


    getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        this.setState({ currentUser });
    };
    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({
                userInfo: userInfo,
                loggedIn: true,
                imagePath: userInfo.user.photo,
                fname: userInfo.user.name,
                email: userInfo.user.email,
                designation: userInfo.user.id,

            });


            //  this.props.navigation.navigate('Menu')
        } catch (error) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                alert('SignIn Cancelled')
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('SignIn is in Progress')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('PlayServices not available')
            } else {
                alert("Error Occoured", error)
            }
        }

    };

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({
                user: null,
                loggedIn: false,
                imagePath: null,
                fname: null,
                email: null
            });
        } catch (error) {
            console.error(error);
        }
    };

    getImageFromGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            // console.log(image);
            console.log('Data Successfully stored ------>', this.state.imagePath)
            this.setState({ imagePath: image.path })
            AsyncStorage.setItem('profile', this.state.imagePath)
        }).catch((error) => { error });
    }
    getCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            this.setState({ imagePath: image.path })
            console.log('Data Successfully stored ------>', this.state.imagePath)
            AsyncStorage.setItem('profile', this.state.imagePath)
        });
    }
    createThreeButtonAlert = () =>
        Alert.alert(
            "",
            "to image from Gallery and Camera",
            [
                {
                    text: "Gallery",
                    onPress: () => this.getImageFromGallery()
                },
                {
                    text: "Camera",
                    onPress: () => this.getCamera(),
                    // style: "cancel"
                },
                { text: "Cancel", onPress: () => console.log("ok Pressed") }
            ]
        );
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flexGrow: 1 }}>


                    <Image source={require('../../assets/images/back.png')} style={styles.image} />
                    <Text style={styles.profile}>Edit Profile</Text>
                    <View style={{
                        marginTop: 20,
                        alignSelf: 'center'
                    }} >
                        {console.log('within render ------>', this.state.imagePath)}
                        <Image
                            style={{ height: 90, width: 90, borderRadius: 45, backgroundColor: "white", }}
                            source={this.state.imagePath ? { uri: this.state.imagePath } : null}
                        />
                        <View style={{ ...styles.shadow, ...styles.shadowstyle, }}>
                            <FontAwesome name="camera" size={16} style={{ paddingHorizontal: 5, marginTop: 6, color: "black" }} onPress={() => { this.createThreeButtonAlert() }} />
                        </View>
                    </View>

                    <View style={{
                        marginHorizontal: 10, alignItems: 'center',
                        marginTop: 80, marginBottom: 30
                    }}>
                        <View>
                            <GoogleSigninButton
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Dark}
                                onPress={this._signIn}
                                disabled={this.state.isSigninInProgress} />
                        </View>
                        <Button
                            title="Sign in With Facebook"
                            onPress={() => this.fbLogin().then(() =>
                                console.log('Signed in with Facebook Successfull!'))}
                        />

                    </View>
                    <View >
                        <View style={styles.buttonContainer}>
                            {this.state.loggedIn && <Button onPress={this.signOut}
                                title="Signout"
                                color="#841584">
                            </Button>}
                        </View>
                        <View style={styles.buttonContainer}>
                            {this.state.fblogin && <Button onPress={this.fbLogout}
                                title="FaceBook Logout"
                                color="#841584">
                            </Button>}
                        </View>

                    </View>

                    <View>
                        <View style={styles.textinput}>
                            <Text style={styles.heading}>First Name</Text>
                            <TextInput
                                style={{ marginStart: 5 }}
                                value={this.state.fname}
                                onChangeText={(text) => this.setState({ fname: text })}
                            />
                        </View>
                        {/* <View style={styles.textinput}>
                            <Text style={styles.heading}>Last Name</Text>
                            <TextInput
                                style={{ marginStart: 5 }}
                                value={this.state.lname}
                                onChangeText={(text) => this.setState({ lname: text })}
                            />
                        </View> */}
                        <View style={styles.textinput}>
                            <Text style={styles.heading}>Email</Text>
                            <TextInput
                                style={{ marginStart: 5 }}
                                value={this.state.email}
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                        </View>
                        <View style={styles.textinput}>
                            <Text style={styles.heading}>Phone #</Text>
                            <TextInput
                                style={{ marginStart: 5 }}
                                value={this.state.phone}
                                onChangeText={(text) => this.setState({ phone: text })}
                            />
                        </View>
                        <View style={styles.textinput}>
                            <Text style={styles.heading}>Address</Text>
                            <TextInput
                                style={{ marginStart: 5 }}
                                value={this.state.address}

                                onChangeText={(text) => this.setState({ address: text })}
                            />
                        </View>
                        <View style={styles.textinput}>
                            <Text style={styles.heading}>Designation</Text>
                            <TextInput
                                style={{ marginStart: 5 }}
                                value={this.state.designation}

                                onChangeText={(text) => this.setState({ designation: text })}
                            />
                        </View>

                    </View>
                    <TouchableOpacity onPress={
                        () => alert('Upload Successful')
                    }
                        style={styles.button} activeOpacity={0.5}>
                        <Text style={styles.text2}>Save</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View >
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
    textinput: {
        marginTop: 5,
        borderRadius: 10,
        borderBottomWidth: 1,
        borderColor: "#7B7B7B",
        width: "84%",
        alignSelf: "center",
        marginBottom: 26
    },
    button: {
        height: 50,
        width: "45%",
        marginVertical: '10%',
        backgroundColor: '#1D132B',
        alignSelf: "center",
        justifyContent: 'center',
        borderTopLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text2: {
        color: 'white',
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'Ubuntu-Regular'
    },
    heading: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 14.14,
        marginLeft: 10,
        marginTop: 5
    },
    profile: {
        fontFamily: 'Ubuntu-Bold', textAlign: 'center',
        fontSize: 28.2,
        color: '#fff',
        marginTop: 30,
        textShadowColor: '#F6F5Fd',
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 10,
    },
    shadow: {
        shadowColor: "grey",
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 4,
    },
    shadowstyle: {
        width: "30%",
        height: 30,
        borderRadius: 40,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginLeft: 70,
        marginTop: -24
    },
    savebutton: {
        height: 40,
        width: "45%",
        backgroundColor: '#1D132B',
        borderTopLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 0
    },
    savetext: {
        color: '#fff',
        fontFamily: 'Ubuntu-Bold',
        textAlign: 'center',
        fontSize: 18,
        marginTop: 6
    }
})
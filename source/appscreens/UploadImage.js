import React, { Component } from 'react'
import { Image, ScrollView, Text, TextInput, View, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebHandler from '../remote/WebHandler';
import Routes from '../remote/Routes';
import ImageResizer from 'react-native-image-resizer';

export default class UploadImage extends Component {
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

        }
    }

    componentDidMount() {
 
        AsyncStorage.getItem('profile')
            .then((imagePath) => {
                if (this.state.imagePath !== null) {
                    this.setState({ imagePath: imagePath })
                    console.log("Get image succesfully ------->", imagePath);
                }
            })


    }

    async uploadmedia() {
        const webHandler = new WebHandler()

        const resimage = await ImageResizer.createResizedImage(this.state.imagePath, 720, 1080, "JPEG", 0.7)
        console.log("Image Resize",resimage)
        const form = new FormData()

        form.append("image", {
            uri: resimage.uri,
            name: "profile_pic.jpeg",
            type: "image/jpeg"
        })
         form.append("id", "1")
        // form.append("proflle_pic", {
        //     uri: this.state.image1,
        //     name: "profile_pic.jpeg",
        //     type: "video/mp4"
        // })

      // form.append("proflle_pic", {
        //     uri: this.state.image1,
        //     name: "profile_pic.mp3",
        //     type: "audio/mp3"
        // })
        // form.append("proflle_pic", "hghjgj")
       

        webHandler.sendMediaPostDataRequest(Routes.IMAGE_2, form, (resp) => {
            alert(resp)
        }, (error) => {
            alert(error)
        })
    }

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
            this.uploadmedia()

        }).catch((error)=>{error});
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
            this.uploadmedia()
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
            <View style={{ flex: 1,marginBottom:100 }}>
                <ScrollView style={{ flexGrow: 1 }}>
                    <Image source={require('../../assets/images/back.png')} style={styles.image} />
                    <Text style={styles.profile}>Edit Profile</Text>
                    <View style={{
                        marginTop: 20,
                        alignSelf: 'center'
                    }} >
                        {console.log('within render ------>', this.state.imagePath)}
                        <Image
                            style={{ height: 90, width:90, borderRadius:45, backgroundColor: "white", }}
                            source={this.state.imagePath ? { uri: this.state.imagePath } : null}
                        />
                        <View style={{ ...styles.shadow, ...styles.shadowstyle, }}>
                            <FontAwesome name="camera" size={16} style={{paddingHorizontal:5, marginTop: 6, color: "black" }} onPress={() => { this.createThreeButtonAlert() }} />
                        </View>
                    </View>

                    <View style={{ marginTop:80  }}>
                        <View style={styles.textinput}>
                            <Text style={styles.heading}>First Name</Text>
                            <TextInput
                                style={{ marginStart: 5 }}
                                value={this.state.fname}
                                onChangeText={(text) => this.setState({ fname: text })}
                            />
                        </View>
                        <View style={styles.textinput}>
                            <Text style={styles.heading}>Last Name</Text>
                            <TextInput
                                style={{ marginStart: 5 }}
                                value={this.state.lname}
                                onChangeText={(text) => this.setState({ lname: text })}
                            />
                        </View>
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
                       ()=>alert('Upload Successful')
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
        justifyContent:'center',
        borderTopLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        alignItems:'center',
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
import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, } from 'react-native'
import { ScrollView, } from 'react-native-gesture-handler'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import WebHandler from '../remote/WebHandler';
import Routes from '../remote/Routes';
export default class App extends Component {
  state = {
    fname: '',
    lname: '',
    from: '',
    to: '',
    subject: '',
    description: '',
    // showPassword: '',
    isDatePickerVisible: false
  }
  showDatePicker(val) {
    this.setState({ isDatePickerVisible: true, selector: val })

  }
  handleConfirm(date) {
    const { selector } = this.state
    if (selector == "start") {
      this.setState({ from: date })
    } else if (selector == "end") {
      this.setState({ to: date })
    }
    this.setState({ isDatePickerVisible: false })
  }

  render() {

    return (
      <View style={{ flex: 1, marginBottom: 70 }}>
        <ScrollView>
          <Image source={require('../../assets/images/back.png')} style={styles.image} />
          <Text style={styles.leave}>Leave</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: '5%' }}>
           
            <View style={styles.container} >
              <Text style={styles.first}>First Name</Text>
              <TextInput
                value={this.state.fname}
                onChangeText={(text) => this.setState({ fname: text })}
                placeholderTextColor="black"
                style={styles.textinput}
              />
            </View>

            <View style={styles.container} >
              <Text style={styles.first}>Last Name</Text>
              <TextInput
                value={this.state.lname}
                onChangeText={(text) => this.setState({ lname: text })}
                placeholderTextColor="black"
                style={styles.textinput}
              />
            </View>
          </View>
          <Text style={styles.start}>Start Date</Text>
          <View style={styles.container3} >
            <TextInput
              value={this.state.from}
              editable={false}
              placeholder='dd-mm-yyyy'
              placeholderTextColor="grey"
              style={styles.textinput3}
            />
            <TouchableOpacity activeOpaticy={1}
              onPress={() => this.showDatePicker("start")}>
              <FontAwesome5 name='calendar-alt' size={20} style={styles.icon3} />
            </TouchableOpacity>
          </View>
          <Text style={styles.last}>Last Date</Text>
          <View style={styles.container3} >
            <TextInput
              editable={false}
              value={this.state.to}
              placeholder='dd-mm-yyyy'
              placeholderTextColor="grey"
              style={styles.textinput3}
            />
            <TouchableOpacity onPress={() => this.showDatePicker("end")}>
              <FontAwesome5 name='calendar-alt' size={20} style={styles.icon3} />
            </TouchableOpacity>
          </View>
          <Text style={styles.last}>Subject</Text>
          <View style={styles.container1} >
            <TextInput
              value={this.state.subject}
              onChangeText={(text) => this.setState({ subject: text })}
              placeholderTextColor="grey"
              style={styles.textinput1}
            />
          </View>

          <Text style={styles.last}>Discription</Text>
          <View style={{ ...styles.ContainerView, ...styles.shadow }}>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                value={this.state.description}
                onChangeText={(text) => this.setState({ description: text })}
                underlineColorAndroid="transparent"
                placeholder="Type something"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => this.SubmitLeave()}
            style={styles.button} activeOpacity={0.5}>
            <Text style={styles.text2}>Submit</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible}
            mode="date"
            onConfirm={(date) => this.handleConfirm(date.toDateString())
         
            }
            onCancel={() => this.hideDatePicker()}
          />
        </ScrollView>
      </View>
    )
  }
  SubmitLeave() {
    const { fname, lname, from, to, subject, description, } = this.state
    const webHandler = new WebHandler()
    const bodyParams = new FormData()
    bodyParams.append("fname", fname)
    bodyParams.append("lname", lname)
    bodyParams.append("from", from)
    bodyParams.append("to", to)
    bodyParams.append("subject", subject)
    bodyParams.append("description", description)
    webHandler.sendPostDataRequest(Routes.LEAVE_USER, bodyParams,
      (resp) => {
        alert(JSON.stringify(resp.message))
      },
      (error) => {
        alert(error)
      }
    )
  }

}


const styles = StyleSheet.create({
  image: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
  },
  leave: {
    position: 'absolute',
    fontSize: 40,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Ubuntu-Bold',
    textShadowColor: '#F6F5Fd',
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 10,
    top: 120,
  },
  first: {
  
    fontFamily: 'Ubuntu-Bold',
    color: '#1D132B',
    fontSize: 20,
  },
  textinput: {
    fontFamily: 'Ubuntu-Regular',
    borderBottomWidth: 1,    
    paddingHorizontal:10,
    width:120,
    borderColor: "#7B7B7B",
    flexWrap: 'wrap',
  },
  container: {
    height: 37,
    borderRadius: 10,
  },
  textinput1: {
    fontFamily: 'Ubuntu-Regular',
    flex:1
  },
  container1: {
    height: 37,
    borderRadius: 10,
    borderBottomWidth: 1,
    width: '78%',
    borderColor: "#7B7B7B",
    alignSelf: 'center',
    flexDirection: 'row'
  },

  textinput2: {
    fontFamily: 'Ubuntu-Regular',
    borderBottomWidth: 1,
    width: '85%',
    borderColor: "#7B7B7B",
    alignSelf: 'center',
  },
  container2: {
    height: 37,
    // margin: 12,
    borderRadius: 10,

  },
  start: {
    fontFamily: 'Ubuntu-Bold',
    color: '#1D132B',
    fontSize: 20,
    marginLeft: "13%",
    marginTop: '9%'
  },
  last: {
    fontFamily: 'Ubuntu-Bold',
    color: '#1D132B',
    fontSize: 20,
    marginLeft: "13%",
    marginTop: '4%'
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
  ContainerView: {
    backgroundColor: '#F6F5FD',
    width: "80%", marginHorizontal: 40,
    marginTop: 10, alignSelf: 'center',

    marginTop:20, borderRadius: 12
  },
  textAreaContainer: {
    paddingHorizontal: 10,
    height:150
  },
  textArea: {
    fontFamily: 'Ubuntu-Light',
    fontSize: 20,
    flexWrap: 'wrap',
  },
  button: {
    height: 50,
    width: "45%",
    marginVertical: '15%',
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
  textinput3: {
    marginStart: 10,
    flex: 1,
    fontFamily: 'Ubuntu-Regular'
  },
  container3: {
    marginTop: 5,
    justifyContent:'center',
    alignItems:'center',
    flexDirection: 'row',
    height: 35,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: "#7B7B7B",
    width: "78%",
    alignSelf: "center",
  },
  icon3: {
    color: '#1D132B',
  },

})

import React, { Component } from 'react'
import { FlatList } from 'react-native';
import { Text, View, TextInput, Image, ImageBackground, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      AllMenus: this.props.route.params?.GetAllMenus ?? null,
      AllDescription: this.props.route.params?.GetDescription ?? null,
      AllDates:this.props.route.params?.GetAllDates ?? null,
    })

  }
  componentDidMount() {
    let { AllMenus,AllDescription,AllDates } = this.state;
    let ShowValues = AllMenus
    let ShowDescriptions=AllDescription
    let ShowDates=AllDates
    this.setState({
      AllMenus: ShowValues,
      AllDescription:ShowDescriptions,
      AllDates:ShowDates,
    })
    console.log("All Menus", AllMenus)
    console.log("all descriptions:",AllDescription)
    console.log("Show All Dates"+this.state.AllDates)
  }
  MENUVIEW = (item, index) => {

    return (
      <View elevation={3}
        style={{
          borderRadius:15, marginTop: 20, marginHorizontal: 20, backgroundColor:"#f8f8f8",
          paddingHorizontal: 15, paddingVertical: 15,alignItems:'center',justifyContent:'center'
        }}>
        <Text style={{ fontSize: 18, fontFamily: 'Ubuntu-Regular', color: '#1D132B'}}>
          {this.state.AllMenus[index]}
        </Text>
        <Text style={{ fontSize: 16, fontFamily: 'Ubuntu-Light', color: '#1D132B', textAlign: 'center', paddingTop: 5,paddingBottom:10 }}>
          {this.state.AllDescription[index]}
        </Text>
        <View style={{ position: 'absolute', bottom: 5, zIndex: 1, right: 10 }}>
             <Text style={styles.notifytime} >{this.state.AllDates[index]}</Text>
                 </View>

        </View>
    
    )
  }

  FlatListHeader = () => {
    return (
      <View elevation={1} style={styles.box}>
        <Text style={styles.text}  >
          Good Day,  Have a Nice Lunch
        </Text>
      </View>
    )
  }

  render() {

    return (


      <View style={{ flex: 1, }}>

        <Image source={require('../../assets/images/back.png')} style={styles.image} />

        <TouchableOpacity style={{ position: 'absolute', top: 15, }}>
          <MaterialIcons name="keyboard-arrow-left" size={50} color="#fff" style={{}} />
        </TouchableOpacity>
        <Image style={{ position: 'absolute', zIndex: 1, alignSelf: 'center', top: '5%', width: 130, height: 110 }} source={require('../../assets/images/food.png')}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>

          <Text style={{ textAlign: 'center', fontSize: 35, fontFamily: "Ubuntu-Bold", color: "#fff", position: 'absolute', bottom: 70, }}> Menu </Text>

        </View>



        <View style={{ flex: 1, }}>

          <FlatList contentContainerStyle={{ flexGrow: 1, paddingBottom: 70, }}
            ListHeaderComponent={() => this.FlatListHeader()}
            data={this.state.AllMenus}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => this.MENUVIEW(item, index)}
            keyExtractor={(item, index) => index.toString()} />
        </View>


      </View>
    )
  }
}


const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginHorizontal: 10,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 15,
    borderColor: '#707070',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Bold',
    color: '#1E9041'
  },
  image: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
  },
notifytime: { fontSize: 14, textAlign: 'center' ,color:'red'},

})
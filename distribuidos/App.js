import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,Image, ScrollView, TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';
import ProfileImage from './src/sections/components/profileImage.js';
import TextContent from './src/sections/containers/textContent.js';

type Props = {};
export default class App extends Component<Props> {
  state = {
    photo:null,
    tittleR: '',
    contentR: '',
  };

  render() {
    const {photo} = this.state;
    return (
      <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titleText}>
          Sistema de Peticiones, quejas, reclamos, sugerencias y denuncias
        </Text>
      {
        photo &&(<ProfileImage img = {this.state.photo.uri}/>)
      }

        <TouchableOpacity style={styles.myTouchable} onPress={this.choosePhoto}>
          <Text>Foto</Text>
        </TouchableOpacity>

        <TextInput
        style={styles.tiStyle}
          onChangeText={(tittleR) => this.setState({tittleR})}
          placeholder={'Titulo'}
          />

        <TextInput
        style={styles.tiStyle}
          onChangeText={(contentR) => this.setState({contentR})}
          placeholder={'Descripción'}
          />

        <TouchableOpacity style={styles.myTouchable} onPress={() => this.saidHello()}>
          <Text>ENVIAR!!</Text>
        </TouchableOpacity>


      </ScrollView>
    );
  }

  choosePhoto = () =>{
    const options={noData:true};
    ImagePicker.launchImageLibrary(options, (response) => {
      if(response.uri){
        this.setState({photo:response});
      }
    });
  }

  saidHello(param)
  {
    Toast.show(this.state.tittleR + " \n" + this.state.contentR);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d7d7d7',
    alignItems:'center'
  },
  myTouchable:{
    borderColor:'#000000',
    borderWidth:3,
    width:90,
    marginBottom:10,
    alignItems:'center'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin:15
  },
  tiContainer : {
    backgroundColor: '#c6c0c0',
    height: 40,
    width: "90%",
    margin:15
  },
  tiStyle:{
    height: 40,
    borderColor: '#a3a1a1',
    borderWidth: 3
  }
});

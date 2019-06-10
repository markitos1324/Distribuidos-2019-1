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
        <TextContent title = {'Titulo de la queja'} content ={this.state.tittleR}/>
        <TextContent title = {'Descripción'} content ={this.state.contentR}/>

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
  }
});

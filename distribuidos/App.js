import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,Image, ScrollView, TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';
import ProfileImage from './src/sections/components/profileImage.js';
import TextContent from './src/sections/containers/textContent.js';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <ScrollView>
        <ProfileImage/>
        <TextContent title = {'Titulo de la queja'}/>
        <TextContent title = {'Descripción'}/>

        <TouchableOpacity style={styles.myTouchable} onPress={() => this.saidHello("Holiii")}>
          <Text>ENVIAR!!</Text>
        </TouchableOpacity>


      </ScrollView>
    );
  }
  saidHello(param)
  {
    Toast.show("Hola mundo feliz!!! " + param);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    backgroundColor: '#ff0000',
  },
  myTouchable:{
    borderColor:'#000000',
    borderWidth:3,
    width:150
  }
});

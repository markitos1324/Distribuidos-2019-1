import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,Image} from 'react-native';
import Toast from 'react-native-simple-toast';
import ProfileImage from './src/sections/components/profileImage.js';
import TextContent from './src/sections/containers/textContent.js';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
      <ProfileImage/>
      <TextContent title = {'Titulo de la queja'}/>
      <TextContent title = {'Descripción'}/>
      <Button onPress={() => this.saidHello("Holiii")}  title="Hello world"  color="#b473b4"  accessibilityLabel="Learn more about this purple button"/>

      </View>
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
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

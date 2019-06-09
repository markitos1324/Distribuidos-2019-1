import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput
} from 'react-native';



type Props = {};
class TextContent extends Component {

  constructor(props) {
  super(props);
  this.state = { textHold: this.props.title,text:'' };
}

  render(){
    return(
      <View style={styles.container}>
        <TextInput
        style={styles.tiStyle}
          onChangeText={(text) => this.setState({text})}
          placeholder={this.state.textHold}
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container : {
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

export default TextContent;

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
  this.state = { text: this.props.title };
}

  render(){
    return(
      <View style={styles.container}>
        <TextInput
        style={styles.tiStyle}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container : {
    backgroundColor: 'green',
    height: "7%",
    width: "90%",
    margin:5
  },
  tiStyle:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});

export default TextContent;

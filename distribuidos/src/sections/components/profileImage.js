import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

function ProfileImage(props) {
  return(
    <View style={styles.container}>
      <Image style={styles.pfStyle} source={{uri:props.img}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    height: 150,
    width: 280,
    alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin:5
  },
  pfStyle:{
    height: "100%",
    width: "100%",
    resizeMode:'stretch'
  }
})

export default ProfileImage;

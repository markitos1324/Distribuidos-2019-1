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
      <Image style={styles.pfStyle} source={require('../../../assets/profile.jpg')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    height: "35%",
    width: "45%",
    justifyContent: 'center',
    alignItems: 'center',
    margin:5
  },
  pfStyle:{
    height: "100%",
    width: "100%",
  }
})

export default ProfileImage;

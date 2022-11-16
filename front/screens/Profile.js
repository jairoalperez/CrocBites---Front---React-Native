import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import NavBar from '../components/NavBar'

const Profile = () => {
  return (
    <View style={styles.container}> 
      <Text>Profile</Text>
      <NavBar />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({

  container: {
      height: '100%',
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "whitesmoke",
      width: '100%'

  },
});
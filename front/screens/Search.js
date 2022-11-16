import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import NavBar from '../components/NavBar'

const Search = () => {
  return (
    <View style={styles.container}> 
      <Text>Search</Text>
      <NavBar />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({

  container: {
      height: '100%',
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "whitesmoke",
      width: '100%'

  },
});
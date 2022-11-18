import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import { storeData, getData } from '../helpers/asyncStorage'
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

const Profile = () => {

  const [userId, setUserId] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')

  const [elements, setElements] = useState([])

  useEffect(() => {
    console.log('cargo profile')

    getData('username').then(result => {
        setUsername(result)
    })
    getData('name').then(result => {
        setName(result)
    })
    getData('userId').then(result => {
        setUserId(result)
    })
}, [])

useEffect(() => {
  console.log('cargo profile')

  if (userId !== '' && userId !== 'nouser') {
      async function searchMangas() {
          await axios.get('https://backend-twittersito-siu.herokuapp.com/buscar-post/' + userId)
              .then(res => {
                  setElements(res.data)
              })
      }
      searchMangas()
      console.log('busqueda ready')
  }

  console.log(userId)
  console.log(name)
  console.log(username)
  console.log(elements)

}, [userId])

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
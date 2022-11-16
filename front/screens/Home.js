import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native"
import { storeData, getData } from '../helpers/asyncStorage'
import logo from '../assets/cocoicon.png'

const Home = ({ navigation }) => {

  useEffect(() => {
    console.log('cargo home')
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        CrocBites
      </Text>

      <Image 
      source={logo}
      style={styles.image}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login')
        }}
        style={styles.buttonlogin}>
        <Text style={styles.textbuttonl}>
          Iniciar Sesion
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Register')
        }}
        style={styles.buttonregister}>
        <Text style={styles.textbuttonr}>
          Registrarse
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          //storeData('userId', 'nouser')
          navigation.navigate('Profile')
          //getData('userId')
        }}
        style={styles.buttonguest}>
        <Text style={styles.textbuttonr}>
          Entrar sin Cuenta
        </Text>
      </TouchableOpacity>

    </View>
  )
};

export default Home


/*---------------------------------------------------------------------------------------
------------------------------------- Estilos -------------------------------------------
---------------------------------------------------------------------------------------*/
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",

  },
  title: {
    fontSize: 75,
    marginBottom: 50,
    fontWeight: 'bold',
    color: 'olivedrab',

  },
  image: {
    height: 184,
    width: 368,

  },
  buttonlogin: {
    backgroundColor: "yellowgreen",
    padding: 10,
    marginTop: 80,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 200,

  },
  buttonregister: {
    backgroundColor: 'olivedrab',
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 200,

  },
  buttonguest: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 200,
    marginTop: 10,

  },
  textbuttonl: {
    fontSize: 20,

  },

  textbuttonr: {
    fontSize: 20,
    color: "white",

  },
  image: {
    height: 309, 
    width: 285,

  },

});
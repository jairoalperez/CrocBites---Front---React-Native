import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

const Register = () => {

  useEffect(() => {
    console.log('cargo register')
  }, [])

  const navigation = useNavigation();

  //Se declara el state user con los parametros que recibiran de los text input
  const [user, setUser] = useState({
    name: '',
    last: '',
    user: '',
    email: '',
    date: '',
    pass: '',
    passc: ''
  })

  //Se utiliza para setear los parametros del state user
  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value })
  }

  //HTTP Register
  const registerapp = () => {
    const fetchregister = async () => {
      const res = await axios.post('https://backend-twittersito-siu.herokuapp.com/registro', {
        username: user.user,
        correo: user.email,
        nombre: user.name,
        apellido: user.last,
        date: user.date,
        bio: 'Bio vacia',
        direccion: 'Direccion vacia',
        contraseña: user.pass,
        verificarclave: user.passc
      },
        console.log('Conexion Satisfactoria')
      )
      console.log(res.data)
      Alert.alert('Usuario Registrado')
    }
    fetchregister()
  }



  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        REGISTRARSE
      </Text>

      <TextInput
        style={styles.tinput1}
        keyboardType='default'
        placeholder='Nombre'
        placeholderTextColor='gray'
        onChangeText={(value) => handleChangeText('name', value)} />

      <TextInput
        style={styles.tinput}
        keyboardType='default'
        placeholder='Apellido'
        placeholderTextColor='gray'
        onChangeText={(value) => handleChangeText('last', value)} />

      <TextInput
        style={styles.tinput}
        keyboardType='default'
        placeholder='Username'
        placeholderTextColor='gray'
        onChangeText={(value) => handleChangeText('user', value)} />

      <TextInput
        style={styles.tinput}
        keyboardType='email-address'
        placeholder='Correo Electronico'
        placeholderTextColor='gray'
        onChangeText={(value) => handleChangeText('email', value)} />

      <TextInput
        style={styles.tinput}
        keyboardType='default'
        placeholder='Fecha de Nacimiento'
        placeholderTextColor='gray'
        onChangeText={(value) => handleChangeText('date', value)} />

      <TextInput
        secureTextEntry={true}
        style={styles.tinput}
        keyboardType='default'
        placeholder='Contraseña'
        placeholderTextColor='gray'
        onChangeText={(value) => handleChangeText('pass', value)} />

      <TextInput
        secureTextEntry={true}
        style={styles.tinput}
        keyboardType='default'
        placeholder='Confirmar Contraseña'
        placeholderTextColor='gray'
        onChangeText={(value) => handleChangeText('passc', value)} />

      <TouchableOpacity
        onPress={() => {

          //if para confirmar si las contraseñas coinciden.
          if (user.pass === user.passc) {

            //console.log(user.user + ' ' + user.name + ' ' + user.last + ' ' + user.email + ' ' + user.date + ' ' + user.pass)
            registerapp()

          } else {
            console.log('Las contraseñas deben coincidir')
            Alert.alert('Las contraseñas deben coincidir')
          }

        }}
        style={styles.button}>
        <Text style={styles.textbutton}>
          Registrarse
        </Text>
      </TouchableOpacity>

    </View>
  )
}

export default Register

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
    fontSize: 55,
    marginBottom: 50,
    fontWeight: 'bold',
    color: 'olivedrab'

  },
  tinput1: {
    height: 40,
    marginTop: 50,
    padding: 10,
    height: 50,
    width: 250,
    borderWidth: 2,
    backgroundColor: "white",

  },
  tinput: {
    height: 40,
    marginTop: 12,
    padding: 10,
    height: 50,
    width: 250,
    borderWidth: 2,
    backgroundColor: "white"

  },
  button: {
    backgroundColor: "olivedrab",
    padding: 10,
    marginTop: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 200,

  },
  textbutton: {
    fontSize: 20,
    color: "white",

  },


});
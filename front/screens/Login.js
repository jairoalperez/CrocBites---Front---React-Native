import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import axios from 'axios';
import {storeData, getData} from '../helpers/asyncStorage'

const Login = () => {

  useEffect(() => {
    console.log('cargo login')
    setLoged(0)
  }, [])

  const navigation = useNavigation();

  //Se declara el state log con los parametros del username y password que recibiran de los text input
  const [log, setLog] = useState({
    username: '',
    pass: '',
  })

  const [loged, setLoged] = useState(0)

  //Se utiliza para setear los parametros del state log
  const handleChangeText = (username, value) => {
    setLog({ ...log, [username]: value })
  }

  //HTTP Login
  const loginapp = () => {
    const fetchlogin = async () => {
      const res = await axios.post('https://backend-mangaread.herokuapp.com/login', {
        username: log.username,
        password: log.pass
      },
        console.log('Conexion Satisfactoria'),
      )
      console.log(res.data)
      
      if(res.data == 1) {

        const cargar = async () => {
          await Alert.alert('Login Satisfactorio')
          await console.log('Login Satisfactorio')
          await fetchgetuser()
          await navigation.navigate('Profile')
        }
        cargar()
        
      }else {
        Alert.alert('Datos Incorrectos')
        console.log('Datos Incorrectos')
      }
      
    }
    fetchlogin()
  }

  //HTTP Get User By Username
    const fetchgetuser = async () => {
      const res = await axios.get('https://backend-mangaread.herokuapp.com/buscar-nombre/' + log.username)
          const datos = res.data
          const result = datos.find(item => item.username === log.username)
          storeData('username', result.username)
          storeData('userId', result.id_usuario.toString())
          storeData('email', result.correo)
          storeData('name', result.nombre)
    }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        INICIAR SESION
      </Text>

      <TextInput
        style={styles.tinputu}
        keyboardType='default'
        placeholder='Username'
        placeholderTextColor='gray'
        onChangeText={(value) => handleChangeText('username', value)} />

      <TextInput
        secureTextEntry={true}
        style={styles.tinputp}
        keyboardType='default'
        placeholder='Contraseña'
        placeholderTextColor='gray'
        onChangeText={(value) => handleChangeText('pass', value)} />

      <TouchableOpacity
        onPress={() => {
          //loginapp()
        }}
        style={styles.button}>
        <Text style={styles.textbutton}>
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
          navigation.navigate('Profile')
          //storeData('userId', 'nouser')
        }}
        style={styles.buttonguest}>
        <Text style={styles.textbuttonl}>
          Entrar sin Cuenta
        </Text>
      </TouchableOpacity>

    </View>
  )
};

export default Login


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
    fontSize: 60,
    marginBottom: 50,
    fontWeight: 'bold',
    color: 'olivedrab'

  },
  tinputu: {
    height: 40,
    marginTop: 80,
    padding: 10,
    height: 50,
    width: 250,
    borderWidth: 2,
    backgroundColor: "white",

  },
  tinputp: {
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
    marginTop: 30,
    marginBottom: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 300,

  },
  textbutton: {
    fontSize: 20,
    color: "white",

  },
  buttonregister: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 200,

  },
  buttonguest: {
    backgroundColor: 'yellowgreen',
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 200,
    marginTop: 10

  },
  textbuttonl: {
    fontSize: 20,
  },

  textbuttonr: {
    fontSize: 20,
    color: "white",

  },

});
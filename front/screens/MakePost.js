import { View, Text, StyleSheet, Touchable, TouchableOpacity, Image, TextInput, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import NavBar from '../components/NavBar';
import { storeData, getData } from '../helpers/asyncStorage'

const MakePost = () => {

  const [userId, setUserId] = useState('')

  useEffect(() => {
    console.log('cargo imageupload')

    getData('userId').then(result => {
      setUserId(result)
    })
  }, [])

  useEffect(() => {
    console.log(userId)
  }, [userId])

  const [image, setImage] = useState('')
  const [bite, setBite] = useState({
    contenido: '',
  })

  const handleChangeText = (contenido, value) => {
    setBite({ ...bite, [contenido]: value })
  }

  const openLibrary = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Permiso para la camara denegado')
    }
    if (status === 'granted') {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      })
      if (!res.cancelled) {
        setImage(res)
      }
    }
  }

  const uploadBite = async () => {

      var tt = Date.now()
      var hoy = new Date(tt)
      var fs = hoy.toLocaleDateString('es-MX')

    if (image === '') {

      const fetchregister = async () => {
        const res = await axios.post('https://backend-twittersito-siu.herokuapp.com/crear-post', {
          id_usuario: userId,
          contenido: bite.contenido,
          fecha: fs
        },
          console.log('Conexion Satisfactoria')
        )
        console.log(res.data)
        Alert.alert('Bite Publicado')
      }
      fetchregister()

      

      console.log(userId)
      console.log(bite.contenido)
      console.log(fs)

    } else {
      const imgdata = {
        name: new Date().getTime() + '_manga',
        uri: image.uri,
        type: 'image/jpg',
      }
  
      const mdstring = JSON.stringify(imgdata)
  
      const formData = new FormData()
      formData.append("bite", imgdata)
      formData.append('id_usuario', userId)
      formData.append('contenido', bite.contenido)
      formData.append('fecha', fs)
  
      try {
        const res = await axios.post('https://backend-twittersito-siu.herokuapp.com/upload', formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
          }
        },
          console.log('conexion satisfactoria')
        )
        console.log(res.data)
        Alert.alert(res.data)
  
      } catch (error) {
        console.log(error.message)
      }
      console.log('else')
    }



  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss()
      }}>
        <View style={styles.containerimg}>
          <Text style={styles.textS}>Crear Bite</Text>

          <TextInput
            style={styles.tinputu}
            keyboardType='default'
            placeholder='Escribe tu Bite aqui (Max 250 Caracateres)'
            placeholderTextColor='gray'
            multiline
            textAlignVertical='top'
            maxLength={250}
            onChangeText={(value) => handleChangeText('contenido', value)} />

          <TouchableOpacity onPress={openLibrary} style={styles.uploadBtn}>
            <Text style={styles.textbutton}>
              Agregar imagen al bite
            </Text>
          </TouchableOpacity>
          <View style={styles.containerimg}>
            {image ? (<Image source={{ uri: image.uri }} style={styles.image} />) : null}
          </View>
          <Text style={styles.skip} onPress={uploadBite}>
            Publicar
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <NavBar />
    </View>
  )
}

export default MakePost

/*---------------------------------------------------------------------------------------
------------------------------------- Estilos -------------------------------------------
---------------------------------------------------------------------------------------*/
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "olivedrab",

  },
  containerimg: {
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBtn: {
    backgroundColor: "yellowgreen",
    padding: 10,
    marginTop: 30,
    marginBottom: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 300,
  },
  textbutton: {
    fontSize: 20,
    color: "white",
  },
  skip: {
    fontSize: 25,
    color: "black",
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: 10,
  },
  image: {
    height: 100,
    width: 200,
    marginBottom: 30

  },
  tinputu: {
    height: 40,
    marginTop: 80,
    padding: 10,
    height: 250,
    width: 350,
    borderWidth: 2,
    backgroundColor: "white",
    textAlignVertical: 'top'

  },
  textS: {
    fontSize: 50,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
  },

});
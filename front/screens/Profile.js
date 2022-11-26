import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import { storeData, getData } from '../helpers/asyncStorage'
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const Profile = () => {

  const navigation = useNavigation();

  const [userId, setUserId] = useState('')
  const [username, setUsername] = useState('')

  const [seguidos, setSeguidos] = useState([])
  const [seguidores, setSeguidores] = useState([])

  const [userData, setUserData] = useState([])
  const [elements, setElements] = useState([])

  useEffect(() => {
    console.log('cargo profile')

    getData('username').then(result => {
      setUsername(result)
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
      async function searchSeguidos() {
        await axios.get('https://backend-twittersito-siu.herokuapp.com/buscar-seguidosc/' + userId)
          .then(res => {
            const respuesta = res.data
            const rdata = respuesta.find(rdata => rdata.count !== null)
            setSeguidos(rdata)
          })
      }
      async function searchSeguidores() {
        await axios.get('https://backend-twittersito-siu.herokuapp.com/buscar-seguidoresc/' + userId)
          .then(res => {
            const respuesta = res.data
            const rdata = respuesta.find(rdata => rdata.count !== null)
            setSeguidores(rdata)
          })
      }

      searchMangas()
      searchSeguidos()
      searchSeguidores()
      console.log('busqueda ready')
    }

    if (userId !== '' && userId !== 'nouser') {
      async function searchUser() {
        await axios.get('https://backend-twittersito-siu.herokuapp.com/buscar-usuario/' + userId)
          .then(res => {
            setUserData(res.data)
          })
      }
      searchUser()
      console.log('busqueda ready')
    }

  }, [userId, username])

  const [refresh, setRefresh] = useState(false)
  const pullMe = () => {
    setRefresh(true)
    setTimeout(() => {
      setRefresh(false)
      console.log('pagina refrescada')
      async function searchBites() {
        await axios.get('https://backend-twittersito-siu.herokuapp.com/buscar-post/' + userId)
          .then(res => {
            setElements(res.data)
          })
      }
      async function searchSeguidos() {
        await axios.get('https://backend-twittersito-siu.herokuapp.com/buscar-seguidosc/' + userId)
          .then(res => {
            const respuesta = res.data
            const rdata = respuesta.find(rdata => rdata.count !== null)
            setSeguidos(rdata)
          })
      }
      async function searchSeguidores() {
        await axios.get('https://backend-twittersito-siu.herokuapp.com/buscar-seguidoresc/' + userId)
          .then(res => {
            const respuesta = res.data
            const rdata = respuesta.find(rdata => rdata.count !== null)
            setSeguidores(rdata)
          })
      }
      async function searchUser() {
        await axios.get('https://backend-twittersito-siu.herokuapp.com/buscar-usuario/' + userId)
          .then(res => {
            setUserData(res.data)
          })
      }

      searchUser()
      searchBites()
      searchSeguidos()
      searchSeguidores()
    }, 3000)
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerusername}
        refreshControl={<RefreshControl
          refreshing={refresh}
          onRefresh={() => pullMe()}
        />}
      >

        {userData.map(data => {
          return (
            <View style={styles.containerusername}>
              <Text style={styles.username}>@{data.username}</Text>

              <View style={styles.containerf}>
                <Text style={styles.follows}
                onPress={() => {
                  storeData('usersearch', userId)
                  navigation.navigate('Followers')
                }}
                >Seguidores: {seguidores.count}</Text>

                <Text style={styles.follows}
                onPress={() => {
                  storeData('usersearch', userId)
                  navigation.navigate('Following')
                }}
                >Seguidos: {seguidos.count}</Text>
              </View>

              <View style={styles.containerbio}>
                <Text style={styles.nombre}>{data.nombre} {data.apellido}</Text>
                <Text style={styles.bio}>{data.bio}</Text>
                <Text style={styles.datosbio}>{data.cumpleaños}</Text>
              </View>

              <View style={styles.containerbotones}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Edit'),
                    console.log('Presionaste el boton de Editar')
                  }}
                  style={styles.button}>
                  <Text style={styles.textbutton}>
                    Editar Perfil
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })}


        <Text style={styles.tweets}>
          Bites
        </Text>

        {elements.map((elemento, a, b) => {
          return (
            <View style={styles.containerborrar} key={a}>


              <View style={styles.containerb} key={a}>
              <TouchableOpacity onPress={() => {
                    storeData('postselected', elemento.id_post.toString())
                    navigation.navigate('Post')
                  }}>

                <View style={styles.containeruser}>
                  <Text style={styles.fecha}>{elemento.fecha}</Text>
                </View>

                <Text style={styles.content}>{elemento.contenido}</Text>

                {elemento.foto_url ? (
                  <Image
                    style={{ width: 280, height: 275, marginTop: 10, marginBottom: 10 }}
                    source={{ uri: elemento.foto_url }}
                  />
                ) : null}

                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  console.log('dejar de seguir ' + elemento.pagina)
                  const deleteFollow = async () => {
                    const res = await axios.delete('https://backend-twittersito-siu.herokuapp.com/borrar-post/' + elemento.id_post)

                    const newdata = (elements.filter(element => element.id_post !== elemento.id_post))
                    setElements(newdata)

                  }
                  deleteFollow()
                }}
                style={styles.buttonsf}>
                <Icon name="close" size={30} color="white" />
              </TouchableOpacity>
            </View>

          )
        })}

      </ScrollView>
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
  containerusername: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "whitesmoke",
    width: 420,
    marginTop: 20,

  },
  containerf: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "whitesmoke",
    marginBottom: 20,

  },
  containerbio: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "olivedrab",
    textAlign: 'left',
    borderRadius: 10,
    width: 350,
    padding: 10,
    marginBottom: 5,

  },
  containerbotones: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "whitesmoke",
    marginBottom: 20
  },

  username: {
    marginTop: 20,
    fontSize: 50,
    color: "black",
    marginBottom: 10,
    fontWeight: 'bold'

  },
  nombre: {
    fontSize: 25,
    color: "white",
    marginBottom: 20,
    fontWeight: 'bold',
    padding: 10,

  },
  bio: {
    fontSize: 20,
    color: "black",
    padding: 10,
    backgroundColor: 'whitesmoke'
  },
  datosbio: {
    fontSize: 15,
    color: "white",
    padding: 10,
  },

  follows: {
    fontSize: 15,
    color: "black",
    marginBottom: 15,
    fontWeight: 'bold'

  },
  textbutton: {
    fontSize: 20,
    color: "white",

  },
  button: {
    backgroundColor: "yellowgreen",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    height: 50,
    width: 150,

  },
  tweets: {
    marginTop: 30,
    fontSize: 30,
    color: "black",
    marginBottom: 10,
    fontWeight: 'bold'

  },
  buttonsf: {
    backgroundColor: "red",
    padding: 10,
    marginBottom: 15,
    marginLeft: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,

  },


  containerb: {
    justifyContent: 'center',
    alignItems: 'left',
    backgroundColor: "olivedrab",
    textAlign: 'left',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginTop: 20,
    width: 300

  },
  containerborrar: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  containeruser: {
    justifyContent: 'left',
    alignItems: 'left',
    textAlign: 'left',

  },
  containerpd: {
    justifyContent: 'left',
    alignItems: 'left',
    textAlign: 'left',
    width: 280

  },
  nombret: {
    fontSize: 18,
    color: "white",
    marginBottom: 0,
    fontWeight: 'bold',
    padding: 10,

  },
  usernamet: {
    fontSize: 15,
    color: "white",
    marginBottom: 0,
    padding: 10,

  },
  content: {
    fontSize: 15,
    color: "black",
    padding: 10,
    backgroundColor: 'whitesmoke',
    width: 280,
    marginBottom: 10
  },
  fecha: {
    fontSize: 15,
    color: "white",
    padding: 10,
    fontWeight: 'bold',
    backgroundColor: 'olivedrab'
  },
  postdata: {
    fontSize: 18,
    color: "white",
    marginBottom: 0,
    fontWeight: 'bold',
    marginTop: 5,

  },
});
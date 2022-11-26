import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import { storeData, getData } from '../helpers/asyncStorage'
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const UserS = () => {

  const navigation = useNavigation();

  const [userSearch, setUserSearch] = useState('')

  const [userData, setUserData] = useState([])
  const [elements, setElements] = useState([])
  const [userId, setUserId] = useState('')

  useEffect(() => {
    console.log('cargo profile')

    getData('usersearch').then(result => {
      setUserSearch(result)
    })

    getData('userId').then(result => {
      setUserId(result)
    })
  }, [])

  useEffect(() => {
    console.log('cargo profile')

    if (userSearch !== '' && userSearch !== 'nouser') {
      async function searchMangas() {
        await axios.get('https://backend-twittersito-siu.herokuapp.com/buscar-post/' + userSearch)
          .then(res => {
            setElements(res.data)
          })
      }
      searchMangas()
      console.log('busqueda ready')
    }

    if (userSearch !== '' && userSearch !== 'nouser') {
      async function searchUser() {
        await axios.get('https://backend-twittersito-siu.herokuapp.com/buscar-usuario/' + userSearch)
          .then(res => {
            setUserData(res.data)
          })
      }
      searchUser()
      console.log('busqueda ready')
    }

    console.log(userSearch)

  }, [userSearch, userId])

  const [refresh, setRefresh] = useState(false)
  const pullMe = () => {
    setRefresh(true)
    setTimeout(() => {
      setRefresh(false)
      console.log('pagina refrescada')
      async function searchBites() {
        await axios.get('https://backend-twittersito-siu.herokuapp.com/buscar-post/' + userSearch)
          .then(res => {
            setElements(res.data)
          })
      }
      searchBites()
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
                <Text style={styles.follows}>Seguidores: </Text>
                <Text style={styles.follows}>Seguidos: </Text>
              </View>

              <View style={styles.containerbio}>
                <Text style={styles.nombre}>{data.nombre} {data.apellido}</Text>
                <Text style={styles.bio}>{data.bio}</Text>
                <Text style={styles.datosbio}>{data.cumpleaños}</Text>
              </View>
            </View>
          )
        })}


        <Text style={styles.tweets}>
          Bites
        </Text>

        {elements.map(elemento => {
          return (
            <View style={styles.containerborrar}>


              <View style={styles.containerb}>

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
                    style={{ width: 350, height: 350, marginTop: 10, marginBottom: 10 }}
                    source={{ uri: elemento.foto_url }}
                  />
                ) : null}


                <View style={styles.containerpd}>
                  <TouchableOpacity
                    onPress={() => {

                      const darLike = async () => {

                        const res = await axios.post('https://backend-twittersito-siu.herokuapp.com/like', {
                          id_user: userId,
                          id_post: elemento.id_post
                        },
                          console.log('Conexion Satisfactoria'),
                        )
                        console.log(res.data)
                        if (res.data === 1) {
                          Alert.alert(elemento.username + ' te da las gracias por darle like a su bite!')
                        } else {
                          const deleteLike = async () => {
                            const res = await axios.delete('https://backend-twittersito-siu.herokuapp.com/dlike/' + userId + '/' + elemento.id_post)
                            Alert.alert('Se elimino tu like')
                          }
                          deleteLike()

                        }
                      }
                      darLike()



                    }}
                    style={styles.botonesbar}>
                    <Icon name="heart" size={30} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      console.log('retweet: ' + elemento.id_post)
                    }}
                    style={styles.botonesbar}>
                    <Icon name="retweet" size={30} color="white" />
                  </TouchableOpacity>
                </View>

                </TouchableOpacity>

              </View>
            </View>

          )
        })}

      </ScrollView>
      <NavBar />
    </View>
  )
}

export default UserS

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
    alignItems: 'center',
    backgroundColor: "olivedrab",
    textAlign: 'left',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginTop: 20,
    width: 375

  },
  containerborrar: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  containeruser: {
    justifyContent: 'left',
    alignItems: 'left',
    textAlign: 'left',
    width: 350

  },
  containerpd: {

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'left',
    textAlign: 'left',
    width: 350

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
    width: 350,
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
    marginLeft: 30,
    marginRight: 30

  },
  botonesbar: {
    marginLeft: 20,
    marginRight: 20,

  },
});
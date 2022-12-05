import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import axios from 'axios';
import { storeData, getData } from '../helpers/asyncStorage'
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';


const Dashboard = () => {

  const navigation = useNavigation();

  const [elements, setElements] = useState([])
  const [userId, setUserId] = useState('')
  const [estado, setEstado] = useState(0)

  useEffect(() => {
    console.log('cargo dashboard')

    getData('userId').then(result => {
      setUserId(result)
    })

    async function searchBites() {
      await axios.get('https://backend-twittersito-siu.herokuapp.com/leer-post')
        .then(res => {
          setElements(res.data)
        })

    }
    searchBites()

  }, [])

  const [refresh, setRefresh] = useState(false)

  const pullMe = () => {
    setRefresh(true)
    setTimeout(() => {
      setRefresh(false)
      console.log('pagina refrescada')
      async function searchBites() {
        await axios.get('https://backend-twittersito-siu.herokuapp.com/leer-post')
          .then(res => {
            setElements(res.data)
          })
      }
      searchBites()
    }, 3000)
  }




  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerscroll}
        refreshControl={<RefreshControl
          refreshing={refresh}
          onRefresh={() => pullMe()}
        />}
      >
        <View style={styles.containerP}>
          <Text style={styles.textS}>Home</Text>
          <TouchableOpacity
            onPress={() => {
              console.log('Presionaste el boton de Rebites')
              navigation.navigate('DashboardR')
            }}
            style={styles.button}>
            <Text style={styles.textbutton}>
              Rebites
            </Text>
          </TouchableOpacity>

            




          {    elements.map((elemento, i) => {
            return (
              <View style={styles.containerb} key={i}>
                <TouchableOpacity onPress={() => {
                  storeData('postselected', elemento.id_post.toString())
                  navigation.navigate('Post')
                }}>


                  <View style={styles.containeruser}>
                    <Text style={styles.nombre}>{elemento.nombre} {elemento.apellido}</Text>
                    <Text style={styles.username}>@{elemento.username}</Text>
                    <Text style={styles.fecha}>{elemento.fecha}</Text>
                  </View>

                  <Text style={styles.content} >{elemento.contenido}</Text>

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
                        console.log('rebite: ' + elemento.id_post)
                        storeData('ret', elemento.id_post.toString())
                        storeData('userret', elemento.id_usuario.toString())
                        navigation.navigate('CRetweet')
                      }}
                      style={styles.botonesbar}>
                      <Icon name="retweet" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        console.log('comentario: ' + elemento.id_post)
                        storeData('comentar', elemento.id_post.toString())
                        navigation.navigate('Coment')
                      }}
                      style={styles.botonesbar}>
                      <Icon name="comments" size={30} color="white" />
                    </TouchableOpacity>
                  </View>

                </TouchableOpacity>
              </View>

            )
          })}






        </View>
      </ScrollView>
      <NavBar />
    </View>
  )
}

export default Dashboard

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
  containerscroll: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50,
    width: 420

  },
  containerP: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    marginTop: 10,
    marginBottom: 10,
  },
  textS: {
    fontSize: 50,
    marginBottom: 20,
    fontWeight: 'bold',
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
    width: 400

  },
  containeruser: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'left',
    width: 350

  },
  containerpd: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 350

  },
  nombre: {
    fontSize: 18,
    color: "white",
    marginBottom: 0,
    fontWeight: 'bold',
    padding: 10,

  },
  username: {
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
    fontSize: 12,
    color: "white",
    padding: 10,
    backgroundColor: 'olivedrab'
  },
  postdata: {
    fontSize: 18,
    color: "white",
    marginBottom: 0,
    fontWeight: 'bold',
    padding: 10,

  },
  botonesbar: {
    marginLeft: 20,
    marginRight: 20,

  },

});
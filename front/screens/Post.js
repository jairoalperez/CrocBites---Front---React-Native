import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react'
import { storeData, getData } from '../helpers/asyncStorage';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

const Post = () => {
  const navigation = useNavigation();

  const [postData, setPostData] = useState([])
  const [likes, setLikes] = useState('')
  const [userId, setUserId] = useState('')

  const [bites, setBites] = useState([])

  const [comments, setComments] = useState([])

  useEffect(() => {

    getData('postselected').then(result => {
      setPostData(result)
    })
    getData('userId').then(result => {
      setUserId(result)
    })
  }, [])

  useEffect(() => {
    console.log('cargo post')

    if (postData !== '' && postData !== 'nopost') {
      async function searchBites() {
        await axios.get('https://backend-twittersito-siu.herokuapp.com/buscarunpost/' + postData)
          .then(res => {
            setBites(res.data)
          })
      }
      async function searchLikes() {
        await axios.get('https://backend-twittersito-siu.herokuapp.com/contar-likes/' + postData)
          .then(res => {
            const respuesta = res.data
            const rdata = respuesta.find(rdata => rdata.count !== null)
            setLikes(rdata)
          })
      }
      async function searchCom() {
        await axios.get('https://backend-twittersito-siu.herokuapp.com/mostrar-comentarios/' + postData)
          .then(res => {
            setComments(res.data)
          })
      }

      searchBites()
      searchLikes()
      searchCom()
      console.log('busqueda ready')
    }

    console.log(postData)

  }, [postData])

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.containerscroll}>

        <View style={styles.results}>

          {bites.map((post, o) => {
            return (
              <View style={styles.containerb} key={o}>

                <View style={styles.containeruser}>
                  <Text style={styles.nombre}
                    onPress={() => {
                      if (userId == post.id_usuario) {
                        console.log('igual')
                        navigation.navigate('Profile')
                      } else {
                        console.log('diferente')
                        storeData('usersearch', post.id_usuario.toString())
                        navigation.navigate('UserS')
                      }

                    }}
                  >{post.nombre} {post.apellido}</Text>

                  <Text style={styles.username}

                  >@{post.username}</Text>

                  <Text style={styles.fecha}

                  >{post.fecha}</Text>
                </View>

                <Text style={styles.content}>{post.contenido}</Text>

                {post.foto_url ? (
                  <Image
                    style={{ width: 350, height: 350, marginTop: 10, marginBottom: 10 }}
                    source={{ uri: post.foto_url }}
                  />
                ) : null}

                <View style={styles.containerpd}>
                  <Text style={styles.postdata}>Likes: {likes.count}</Text>
                </View>

              </View>

            )
          })}

        </View>

          <Text style={styles.tweets}> Comentarios </Text>

        <View style={styles.results}>

          {comments.map((com, o) => {
            return (
              <View style={styles.containerb} key={o}>

                <View style={styles.containeruser}>
                  <Text style={styles.nombre}>{com.nombre} {com.apellido}</Text>

                  <Text style={styles.username}>@{com.username}</Text>
                </View>

                <Text style={styles.content}>{com.contenido}</Text>

              </View>

            )
          })}

        </View>




      </ScrollView>

      <NavBar />
    </View>
  )
}

export default Post

const styles = StyleSheet.create({

  container: {
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    width: '100%'

  },
  containerscroll: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 420,
    marginTop: 80

  },
  containerrow: {
    flexDirection: 'row',
    marginBottom: 10
  },
  results: {
    marginTop: 40
  },
  tinputu: {
    height: 40,
    padding: 10,
    height: 50,
    width: 250,
    borderWidth: 2,
    backgroundColor: "white",

  },
  boton: {
    padding: 5
  },
  textbutton: {
    fontSize: 20,
    color: "white",

  },
  buttonc: {
    backgroundColor: "olivedrab",
    padding: 10,
    marginBottom: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 250,

  },
  textbuttonc: {
    fontSize: 20,
    color: "white",
    fontWeight: 'bold'

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
  tweets: {
    marginTop: 50,
    fontSize: 30,
    color: "black",
    fontWeight: 'bold'

  },

});
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import axios from 'axios';
import { storeData, getData } from '../helpers/asyncStorage'
import { useNavigation } from "@react-navigation/native";


const Dashboard = () => {

  const navigation = useNavigation();

  const [elements, setElements] = useState([])

  useEffect(() => {
    console.log('cargo dashboard')

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
          {elements.map(elemento => {
            return (
              <View style={styles.containerb}>

                <View style={styles.containeruser}>
                  <Text style={styles.nombre}>{elemento.nombre} {elemento.apellido}</Text>
                  <Text style={styles.username}>@{elemento.username}</Text>
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
                  <Text style={styles.postdata}>Likes: x</Text>
                  <Text style={styles.postdata}>Retweets: x</Text>
                </View>

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
  button: {
    backgroundColor: "darkgoldenrod",
    padding: 10,
    marginBottom: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height: 75,
    width: 250,

  },
  textbutton: {
    fontSize: 20,
    color: "white",

  },

  containerb: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "olivedrab",
    textAlign: 'left',
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
    width: 350
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

});
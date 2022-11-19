import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerscroll}>
        <View style={styles.containerP}>
          <Text style={styles.textS}>Home</Text>
          {elements.map(elemento => {
            return (
              <View style={styles.containerb}>

                <View style={styles.containeruser}>
                  <Text style={styles.nombre}>Cristiano Ronaldo</Text>
                  <Text style={styles.username}>@cristiano</Text>
                  <Text style={styles.fecha}>07/07/2022</Text>
                </View>

                <Text style={styles.content}>It's always impossible to hide the comfort that the @cr7cristianoronaldo Underwear collection provides and the fun that we have every time we shoot a campaign.</Text>

                <View style={styles.containerpd}>
                  <Text style={styles.postdata}>Likes: 15260</Text>
                  <Text style={styles.postdata}>Retweets: 1368</Text>
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
    backgroundColor: "gold",

  },
  containerscroll: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 80,
    width: 420

  },
  containerP: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gold",
    marginTop: 10,
    marginBottom: 10,
  },
  textS: {
    fontSize: 50,
    marginBottom: 30,
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
    backgroundColor: "darkslategrey",
    textAlign: 'left',
    padding: 10,
    marginBottom: 20,
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
    backgroundColor: 'darkslategrey'
  },
  postdata: {
    fontSize: 18,
    color: "white",
    marginBottom: 0,
    fontWeight: 'bold',
    padding: 10,

  },

});
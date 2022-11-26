import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react'
import { storeData, getData } from '../helpers/asyncStorage';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

const Followers = () => {
  const navigation = useNavigation();

  const [followers, setFollowers] = useState([])
  const [userSearch, setUserSearch] = useState('')

  useEffect(() => {

    getData('usersearch').then(result => {
      setUserSearch(result)
    })
  }, [])

  useEffect(() => {
    console.log('cargo post')

    if (userSearch !== '' && userSearch !== 'nouser') {
      async function searchF() {
        await axios.get('https://backend-twittersito-siu.herokuapp.com/buscar-seguidores/' + userSearch)
          .then(res => {
            setFollowers(res.data)
          })
      }

      searchF()
      console.log('busqueda ready')
    }

  }, [userSearch])

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.containerscroll}>

      <Text style={styles.textS}>Seguidores</Text>

        <View style={styles.results}>

          {followers.map((f, o) => {
            return (
              <View key={o}>
                <TouchableOpacity
                  onPress={() => {
                    storeData('usersearch', f.id_usuario.toString())
                    navigation.navigate("UserS")
                  }}
                  style={styles.buttonc}>
                  <Text style={styles.textbuttonc}>
                    @{f.username}
                  </Text>
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

export default Followers

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
  textS: {
    fontSize: 50,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  results: {
    marginTop: 20
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
    width: 275,

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
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react'
import Picker from '@ouroboros/react-native-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { storeData, getData } from '../helpers/asyncStorage';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

const Search = () => {
  const navigation = useNavigation();

  const [search, setSearch] = useState({
    word: '',
  })

  const [elements, setElements] = useState({
    element: []
  })

  const [bites, setBites] = useState({
    bite: []
  })

  let [picker, setPicker] = useState('user');

  const handleChangeText = (word, value) => {
    setSearch({ ...search, [word]: value })
  }

  const searchUser = async () => {
    const res = await axios.get('https://backend-twittersito-siu.herokuapp.com/buscar-userb/' + search.word)
    const datos = res.data
    setElements({ element: datos })
  }

  const searchBites = async () => {
    const res = await axios.get('https://backend-twittersito-siu.herokuapp.com/buscar-postb/' + search.word)
    const datos = res.data
    setBites({ bite: datos })
  }

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.containerscroll}>

        <View style={styles.containerrow}>
          <TextInput
            style={styles.tinputu}
            keyboardType='default'
            placeholder='Busqueda'
            placeholderTextColor='gray'
            onChangeText={(value) => handleChangeText('word', value)} />
          <TouchableOpacity
            onPress={() => {
              if (picker === 'user') {
                console.log(picker)
                console.log(search.word)
                searchUser()
              } if (picker === 'bite') {
                console.log(picker)
                console.log(search.word)
                searchBites()
              }


            }}
            style={styles.boton}>
            <Icon name="search" size={40} color="black" />
          </TouchableOpacity>
        </View>

        <Picker
          onChanged={setPicker}
          options={[
            { value: 'user', text: 'Buscar Usuario' },
            { value: 'bite', text: 'Buscar Bites' },
          ]}
          style={{ borderWidth: 1, borderColor: '#a7a7a7', borderRadius: 5, marginBottom: 5, padding: 5 }}
          value={picker}
        />

        <View style={styles.results}>

          {elements.element.map(elemento => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    storeData('usersearch', elemento.id_usuario.toString())
                    navigation.navigate("UserS")
                    //console.log(elemento.capitulo.toString())
                    //console.log(search.word)
                  }}
                  style={styles.buttonc}>
                  <Text style={styles.textbuttonc}>
                    @{elemento.username}
                  </Text>
                </TouchableOpacity>
              </View>
            )
          })}

          {bites.bite.map(post => {
            return (
              <View style={styles.containerb}>

                <View style={styles.containeruser}>
                  <Text style={styles.nombre}>{post.nombre} {post.apellido}</Text>
                  <Text style={styles.username}>@{post.username}</Text>
                  <Text style={styles.fecha}>{post.fecha}</Text>
                </View>

                <Text style={styles.content}>{post.contenido}</Text>

                {post.foto_url ? (
                  <Image
                    style={{ width: 350, height: 350, marginTop: 10, marginBottom: 10 }}
                    source={{ uri: post.foto_url }}
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

export default Search

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
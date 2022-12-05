import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import axios from 'axios';
import { storeData, getData } from '../helpers/asyncStorage'
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';


const DashboardR = () => {

    const navigation = useNavigation();

    const [elements, setElements] = useState([])
    const [userId, setUserId] = useState('')
    const [estado, setEstado] = useState(0)

    useEffect(() => {
        console.log('cargo dashboardR')

        getData('userId').then(result => {
            setUserId(result)
        })

        async function searchBites() {
            await axios.get('https://backend-twittersito-siu.herokuapp.com/buscar-rebites')
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
                await axios.get('https://backend-twittersito-siu.herokuapp.com/buscar-rebites')
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
                    <Text style={styles.textS}>Rebites</Text>

                    <TouchableOpacity
                        onPress={() => {
                            console.log('Presionaste el boton de Bites')
                            navigation.navigate('Dashboard')
                        }}
                        style={styles.button}>
                        <Text style={styles.textbutton}>
                            Bites
                        </Text>
                    </TouchableOpacity>






                    {elements.map((elemento, i) => {
                        return (
                            <View style={styles.containerb} key={i}>
                                <TouchableOpacity onPress={() => {
                                    storeData('postselected', elemento.id_post.toString())
                                    navigation.navigate('Post')
                                }}>

                                    <View style={styles.containerre}>
                                        <View style={styles.containeruser}>
                                            <Text style={styles.nombre}>{elemento.nombrere} {elemento.apellidore}</Text>
                                            <Text style={styles.username}>@{elemento.userre}</Text>
                                            <Text style={styles.fecha}>{elemento.fecha}</Text>
                                        </View>

                                    <Text style={styles.content} >{elemento.contenido}</Text>
                                    </View>


                                    <View style={styles.containeruser}>
                                        <Text style={styles.nombre}>{elemento.nombrep} {elemento.apellidop}</Text>
                                        <Text style={styles.username}>@{elemento.userp}</Text>
                                        <Text style={styles.fecha}>{elemento.postfecha}</Text>
                                    </View>

                                    <Text style={styles.content} >{elemento.postcon}</Text>

                                    {elemento.foto_url ? (
                                        <Image
                                            style={{ width: 350, height: 350, marginTop: 10, marginBottom: 10 }}
                                            source={{ uri: elemento.foto_url }}
                                        />
                                    ) : null}

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

export default DashboardR

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
    containerre: {
        backgroundColor: 'black',
        marginTop: 10,
        borderRadius: 5,

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
import { View, StyleSheet, Text, TouchableOpacity, Alert, TextInput } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { storeData, getData } from '../helpers/asyncStorage'
import axios from 'axios';

const CRetweet = () => {

    useEffect(() => {
        console.log('cargo cretweet')

        getData('ret').then(result => {
            setIdPost(result)
        })

        getData('userret').then(result => {
            setUserRet(result)
        })

        getData('userId').then(result => {
            setUserId(result)
        })

    }, [])

    const navigation = useNavigation();

    const [comment, setComment] = useState({
        contenido: '',
    })

    const [idPost, setIdPost] = useState('')
    const [idUser, setUserId] = useState('')
    const [userRet, setUserRet] = useState('')

    const handleChangeText = (contenido, value) => {
        setComment({ ...comment, [contenido]: value })
    }

    const fetchcomentario = async () => {

        var tt = Date.now()
        var hoy = new Date(tt)
        var fs = hoy.toLocaleDateString('es-MX')

        const res = await axios.post('https://backend-twittersito-siu.herokuapp.com/rebite', {
            contenido: comment.contenido,
            fecha: fs,
            id_post: idPost,
            id_usuariop: userRet,
            id_usuarior: idUser
        },
            console.log('Conexion Satisfactoria')
        )
        console.log(res.data)
        Alert.alert('Comentario Publicado Satisfactoriamente')
        navigation.navigate('Dashboard')
    }

    return (
        <View style={styles.container}>

            <TextInput
                style={styles.tinputu}
                keyboardType='default'
                placeholder='Escribe tu rebite aqui (Max 250 Caracateres)'
                placeholderTextColor='gray'
                multiline
                textAlignVertical='top'
                maxLength={250}
                onChangeText={(value) => handleChangeText('contenido', value)} />

            <TouchableOpacity
                onPress={() => {

                    fetchcomentario()

                }}
                style={styles.button}>
                <Text style={styles.textbutton}>
                    Publicar
                </Text>
            </TouchableOpacity>


        </View>

    )
}

export default CRetweet


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "whitesmoke",

    },
    title: {
        fontSize: 55,
        marginBottom: 50,
        fontWeight: 'bold',
        color: 'olivedrab'

    },
    tinputu: {
        height: 40,
        padding: 10,
        height: 250,
        width: 350,
        borderWidth: 2,
        backgroundColor: "white",
        textAlignVertical: 'top'

    },
    button: {
        backgroundColor: "olivedrab",
        padding: 10,
        marginTop: 50,
        marginBottom: 250,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 200,

    },
    textbutton: {
        fontSize: 20,
        color: "white",

    },




})
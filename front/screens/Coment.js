import { View, StyleSheet, Text, TouchableOpacity, Alert, TextInput } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { storeData, getData } from '../helpers/asyncStorage'
import axios from 'axios';

const Coment = () => {

    useEffect(() => {
        console.log('cargo coment')

        getData('comentar').then(result => {
            setIdPost(result)
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

    const handleChangeText = (contenido, value) => {
        setComment({ ...comment, [contenido]: value })
    }

    const fetchcomentario = async () => {
        const res = await axios.post('https://backend-twittersito-siu.herokuapp.com/comentar', {
            contenido: comment.contenido,
            id_post: idPost,
            id_usuario: idUser
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
                placeholder='Escribe tu comentario aqui (Max 250 Caracateres)'
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
                    Comentar
                </Text>
            </TouchableOpacity>


        </View>

    )
}

export default Coment


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


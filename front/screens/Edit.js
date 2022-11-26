import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { storeData, getData } from '../helpers/asyncStorage'

const Edit = () => {

    const [userId, setUserId] = useState('')

    useEffect(() => {
        console.log('cargo edit')

        getData('userId').then(result => {
            setUserId(result)
        })

    }, [])

    const navigation = useNavigation();

    //Se declara el state user con los parametros que recibiran de los text input
    const [user, setUser] = useState({
        name: '',
        last: '',
        user: '',
        email: '',
        date: '',
        bio: '',
        add: ''
    })

    //Se utiliza para setear los parametros del state user
    const handleChangeText = (name, value) => {
        setUser({ ...user, [name]: value })
    }

    //HTTP Edit
    const registerapp = () => {

        const fetchregister = async () => {
            const res = await axios.put('https://backend-twittersito-siu.herokuapp.com/editar-usuario', {
                username: user.user,
                correo: user.email,
                nombre: user.name,
                apellido: user.last,
                date: fs,
                bio: user.bio,
                direccion: user.add,
                id_usuario: userId
            },
                console.log('Conexion Satisfactoria')
            )
            console.log(res.data)
            Alert.alert('Usuario Editado Satisfactoriamente')
            navigation.navigate('Profile')
        }
        fetchregister()
    }



    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                EDITAR USUARIO
            </Text>

            <TextInput
                style={styles.tinput1}
                keyboardType='default'
                placeholder='Nombre'
                placeholderTextColor='gray'
                maxLength={10}
                onChangeText={(value) => handleChangeText('name', value)} />

            <TextInput
                style={styles.tinput}
                keyboardType='default'
                placeholder='Apellido'
                placeholderTextColor='gray'
                maxLength={10}
                onChangeText={(value) => handleChangeText('last', value)} />

            <TextInput
                style={styles.tinput}
                keyboardType='default'
                placeholder='Username'
                placeholderTextColor='gray'
                maxLength={10}
                onChangeText={(value) => handleChangeText('user', value)} />

            <TextInput
                style={styles.tinput}
                keyboardType='email-address'
                placeholder='Correo Electronico'
                placeholderTextColor='gray'
                onChangeText={(value) => handleChangeText('email', value)} />

            <TextInput
                style={styles.tinput}
                keyboardType='default'
                placeholder='Fecha de Nacimiento'
                placeholderTextColor='gray'
                onChangeText={(value) => handleChangeText('date', value)} />

            <TextInput
                style={styles.tinputu}
                keyboardType='default'
                placeholder='Biografia (Max 250 Caracateres)'
                placeholderTextColor='gray'
                multiline
                textAlignVertical='top'
                maxLength={250}
                onChangeText={(value) => handleChangeText('bio', value)} />

            <TextInput
                style={styles.tinput}
                keyboardType='default'
                placeholder='Direccion'
                placeholderTextColor='gray'
                onChangeText={(value) => handleChangeText('add', value)} />

            <TouchableOpacity
                onPress={() => {

                    


                    registerapp()

                }}
                style={styles.button}>
                <Text style={styles.textbutton}>
                    Guardar Cambios
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default Edit

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
    title: {
        fontSize: 40,
        marginBottom: 30,
        fontWeight: 'bold',
        color: 'olivedrab'

    },
    tinput1: {
        height: 40,
        marginTop: 10,
        padding: 10,
        height: 50,
        width: 250,
        borderWidth: 2,
        backgroundColor: "white",

    },
    tinput: {
        height: 40,
        marginTop: 12,
        padding: 10,
        height: 50,
        width: 250,
        borderWidth: 2,
        backgroundColor: "white"

    },
    button: {
        backgroundColor: "olivedrab",
        padding: 10,
        marginTop: 50,
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
    tinputu: {
        height: 40,
        marginTop: 12,
        padding: 10,
        height: 250,
        width: 250,
        borderWidth: 2,
        backgroundColor: "white",
        textAlignVertical: 'top'

    },


});
import AsyncStorage from '@react-native-async-storage/async-storage';

export function hello() {
    console.log('hola mis napas')
}

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
        console.log('dato guardado: '+value)
    }catch (e) {
        console.log(e)
    }
}

export const getData = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key)
        if (data !== null) {
            return data
            //alert(data)
        } else {
            console.log('error leyendo '+key)
        }

    } catch (error) {
        console.log(error)
    }


        
        
    }
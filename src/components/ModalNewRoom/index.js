import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

export default function ModalNewRoom({ setVisible }) {
    const [ roomname, setRoomName ] = useState('')

    return (
        <View style={styles.container}>

            <TouchableWithoutFeedback onPress={setVisible}>
                 <View style={styles.modal}></View>
            </TouchableWithoutFeedback>


            <View style={styles.modalContent}>
                <Text style={styles.title}>Criar um novo Grupo?</Text>
                <TextInput style={styles.input}
                    value={roomname}
                    onChangeText={(text) => setRoomName(text) }
                    placeholder='Nome para a sua sala?'
                />

                <TouchableOpacity style={styles.buttonCreate}>
                    <Text style={styles.buttonText}>Criar Sala</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

// Estilização
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgba(34, 34, 34, 0.4)'
    },
    modal: {
        flex: 1,
       
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
    },
    title: {
        marginTop: 14,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    input: {
        borderRadius: 4,
        height: 45,
        backgroundColor: '#DDD',
        marginVertical: 15,
        fontSize: 17,
        paddingHorizontal: 10,
    },
    buttonCreate: {
        borderRadius: 5,
        backgroundColor: '#2E54D4',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#FFF'
    }
})

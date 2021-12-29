import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function ModalNewRoom({ setVisible, setUpdateModal }) {
    const [ roomname, setRoomName ] = useState('');

    const user = auth().currentUser.toJSON();

    function handleButtonCreate() {
       if(roomname === '' ) return;

       createRoom();

    }

    // Criar nova sala no firestore
    function createRoom(){
        firestore()
        .collection('MESSAGE_THREADS')
        .add({
            name: roomname,
            owner: user.uid,
            lastMessage:{
                text: `Grupo ${roomname} criado. Bem vindo(a)!`,
                createAt: firestore.FieldValue.serverTimestamp(),
            }
        })
        .then((docRef) => {
            docRef.collection('MESSAGES').add({
                text: `Grupo ${roomname} criado. Bem vindo(a)!`,
                createAt: firestore.FieldValue.serverTimestamp(),
                system: true,
            })
            .then(() => {
                // Fechar modal
                setVisible();
                setUpdateModal();
            })

        })
        .catch((err) =>{
            console.log(err)
        })

    }

    return (
        <View style={styles.container}>

            <TouchableWithoutFeedback onPress={setVisible}>
                 <View style={styles.modal}></View>
            </TouchableWithoutFeedback>


            <View style={styles.modalContent}>
                <Text style={styles.title}>Criar um novo Grupo?</Text>
                <TextInput
                    value={roomname}
                    onChangeText={(text) => setRoomName(text) }
                    placeholder='Nome para a sua sala?'
                    style={styles.input}
                />

                <TouchableOpacity style={styles.buttonCreate} onPress={handleButtonCreate}>
                    <Text style={styles.buttonText}>Criar Sala</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.backButton} onPress={setVisible}>
                    <Text>Voltar</Text>
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
    },
  
})

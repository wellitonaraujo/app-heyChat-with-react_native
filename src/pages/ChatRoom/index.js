import {View, 
        Text,
        StyleSheet,
        SafeAreaView,
        TouchableOpacity,
        FlatList,
        Modal,
        ActivityIndicator,
        Alert
        } from "react-native";

import React, { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import MaterialIcons  from "react-native-vector-icons/MaterialIcons";


import FabButton from "../../components/FabButton";
import ModalNewRoom from "../../components/ModalNewRoom";
import ChatList from "../../components/ChatList";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// --------------------------------------------------------------------------------------

export default function ChatRoom() {

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [ user, setUser ] = useState(null);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ threads, setThreads ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ updateModal, setUpdateModal ] = useState(false);

    useEffect(() => {
        const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
        // console.log(hasUser)

        setUser(hasUser);


    }, [isFocused])


    useEffect(() => {
        let isActive = true;

        function getChats(){
            firestore()
            .collection('MESSAGE_THREADS')
            .orderBy('lastMessage.createAt', 'desc')
            .limit(10)
            .get()
            .then((snapshot) => {
                const threads = snapshot.docs.map((docSnapshot) => {
                    return {
                        _id: docSnapshot.id,
                        name: '',
                        lastMessage: { text: '' },
                        ...docSnapshot.data()
                    }
                })

                if(isActive) {
                    setThreads(threads);
                    setLoading(false);
                }

            })
        }

        getChats();

        // Quando o componente é desmontado
        return () => {
            isActive = false;
        }

    }, [isFocused, updateModal ])
 

    function handleSignOut(){
       auth()
       .signOut()
       .then(() => {
           setUser(null);
        navigation.navigate("SignIn")
       })
       .catch(() => {
        console.log("Sem usuario....")
       })
    }

    function deleteRoom(ownerId, idRoom) {
        // Verifica se quem está querendo deleter é de fato dono do grupo
        if(ownerId !== user?.uid) return;

        Alert.alert(
            "Atenção!",
            "Você tem certeza que deseja deletar essa sala?",
            [
                {
                    text: "Cancelar",
                    onPress: () => {},
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => handleDeleteRom(idRoom),
                }
            ]
        )
    }

   async function handleDeleteRom(idRoom) {
    await firestore()
    .collection('MESSAGE_THREADS')
    .doc(idRoom)
    .delete();

    setUpdateModal(!updateModal);
    }

    if(loading) {
        return(
            <ActivityIndicator size="large" color="#555" />
        )

    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.headerRoom} >
                <View style={styles.headerRoomLeft}>

                { user && (
                    <TouchableOpacity onPress={handleSignOut}>
                    <MaterialIcons name="arrow-back" size={28} color="#FFF"/>
                    </TouchableOpacity>
                )}

                    <Text style={styles.title}>Grupos</Text>
                </View>

                <TouchableOpacity>
                    <MaterialIcons name="search" size={28} color="#FFF"/>
                </TouchableOpacity>
            </View>

            <FlatList 
            data={threads}
            keyExtractor={ item => item._id }
            showsVerticalScrollIndicator={false}
            renderItem={ ({ item }) => (
                <ChatList data={item} deleteRoom={ () => deleteRoom(item.owner, item._id) }/>
            )}
            />

            <FabButton setVisible={ () => setModalVisible(true) } userStatus={user}/>

            <Modal visible={modalVisible} animationType="fade" transparent={true}>
                <ModalNewRoom setVisible={ () => setModalVisible(false) } setUpdateModal={() => {setUpdateModal(!updateModal)}}/>
            </Modal>

        </SafeAreaView>
    );
  
}
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#FFF'
        },
        headerRoom: {
           flexDirection: 'row',
           justifyContent: 'space-between',
           paddingTop: 40,
           paddingBottom: 20,
           paddingHorizontal: 10,
           backgroundColor: '#2E54D4',
           borderBottomRightRadius: 20,
           borderBottomLeftRadius: 20
        },
        headerRoomLeft: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        title: {
            fontSize: 26,
            fontWeight: 'bold',
            color: '#FFF',
            paddingLeft: 10
        }
    })
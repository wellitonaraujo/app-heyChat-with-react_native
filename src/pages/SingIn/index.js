import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Platform } from "react-native";

import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function SignIn() {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState(false); //false > tela de Login | true > Tela de cadastro
 
    function handleLogin() { 
        if(type) {
            // Cadastrar um novo usuario
            if(name === '' || email === '' || password === '') return;

            auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                user.user.updateProfile({
                    displayName: name
                })
                .then(() => {
                    navigation.goBack();
                })

            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('Email ja em uso.');
                  }
              
                  if (error.code === 'auth/invalid-email') {
                    console.log('Email inválido.!');
                }
            })

        }else { 
           //Logando um usuario'

           auth()
           .signInWithEmailAndPassword(email, password)
           .then(() => {
               navigation.goBack();
           })
           .catch((error) => {      
              if (error.code === 'auth/invalid-email') {
                console.log('Email inválido.!');
            }
           })
        }
        
    }

    return(
        <SafeAreaView style={styles.container}>

            <Text style={styles.logo}>HeyGrupos</Text>
            <Text style={{ marginBottom: 20, padding: 15, fontSize: 18 }}>Ajude, colabore, faça networking!</Text>

            { type && (
                    <TextInput 
                    style={styles.input}
                    value={name}
                    onChangeText={(text) => setName(text) }
                    placeholder="Qual seu nome?"
                    placeholderTextColor="#99999B"
                     />
            )}

            <TextInput 
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text) }
                placeholder="Seu email"
                placeholderTextColor="#99999B"
            />

            <TextInput 
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text) }
                placeholder="Sua senha"
                placeholderTextColor="#99999B"
                secureTextEntry={true}
            />

            <TouchableOpacity 
            style={[styles.buttonLogin, { backgroundColor: type ? "#F53745" : "#57DD86" } ]}
            onPress={handleLogin}
            >
                <Text style={styles.buttonText}>
                    { type ? "Cadastrar" : "Acessar" }
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => setType(!type) }>
                <Text>
                   { type ? "Já pousso uma conta" : "Criar uma conta" }
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
  
}
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            backgroundColor: '#fff'
        },
        logo:{
            marginTop: Platform.OS === 'android' ? 55 : 80,
            fontSize: 30,
            fontWeight: "bold",
            color: '#121212'
        },
        input: {
            width:'90%',
            color: '#121212',
            backgroundColor: '#EBEBEB',
            borderRadius: 6,
            marginBottom: 10,
            fontSize: 16,
            paddingHorizontal: 15,
            height: 50
        },
        buttonLogin: {
            width: '90%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            borderRadius: 6,
            marginTop: 10,
            marginBottom: 10
        },
        buttonText: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 19
        },
    })
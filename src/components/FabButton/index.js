import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

function FabButton({ setVisible, userStatus }){

    const navigation = useNavigation();

    function handleNavigateButton() {
        userStatus ? setVisible() : navigation.navigate("SignIn")
    }

        return (
            <TouchableOpacity style={styles.containerButton}
                              activeOpacity={0.8}
                              onPress={handleNavigateButton}>
                <View>
                    <Text style={styles.buttonText}>+</Text>
                </View>
            </TouchableOpacity>
        )

}

export default FabButton;

const styles = StyleSheet.create({
    containerButton:{
        backgroundColor: '#2E54D4',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: '5%',
        right: '6%'
    },
    buttonText: {
        fontSize: 30,
        color: '#FFF',
        fontWeight: 'bold'
    }
})

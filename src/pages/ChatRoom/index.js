import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList  } from "react-native";

import { useNavigation } from "@react-navigation/native";

import auth from '@react-native-firebase/auth';

export default function ChatRoom() {

    const navigation = useNavigation();

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.headerRoom} >
                <View style={styles.headerRoomLeft}>
                    <TouchableOpacity>
                        
                    </TouchableOpacity>
                </View>
            </View>   
        </SafeAreaView>
    );
  
}
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }
    })
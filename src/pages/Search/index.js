import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Search() {
    return(
        <View style={styles.container}>
            <Text>Tela Search</Text>
        </View>
    );
  
}
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }
    })
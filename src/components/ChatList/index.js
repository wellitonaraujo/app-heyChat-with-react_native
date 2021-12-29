import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ChatList = ({ data, deleteRoom }) => {
    return (
        <TouchableOpacity onPress={ () => {} } onLongPress={ () => deleteRoom && deleteRoom() }>
            <View style={styles.row}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.nameText} numberOfLines={1}>{data.name}</Text>
                    </View>

                    <Text style={styles.contentText} numberOfLines={1}>
                        {data.lastMessage.text}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ChatList;

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(241, 240, 245, 0.5)',
        marginVertical: 5
    },
    content: {
        flexShrink: 1,
    },
    header: {
        flexDirection: 'row'
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    contentText: {
        color: '#C1C1C1',
        fontSize: 17,
        marginTop: 3,
    }


})

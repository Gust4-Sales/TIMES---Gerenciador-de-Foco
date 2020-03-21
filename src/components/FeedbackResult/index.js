import React from 'react'

import { StyleSheet, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function FeedbackResult(props){
    return(
        <View style={styles.container}>
            <Icon name={props.icon} size={25} color="#FC5185" style={styles.icon}/>
            <View style={styles.info}>
                <Text style={{color: '#91A8E5', fontSize: 24, marginBottom: 5}}>{props.title}</Text>
                <Text style={{color: '#A6A6A6', fontSize: 20}}>{props.value}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        position: 'absolute',
        left: 0,
        marginLeft: '5%',
    },
    info: {
        position: 'absolute',

        width: '75%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#ddd',
    }
})
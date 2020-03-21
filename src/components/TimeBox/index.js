import React from 'react'

import { View, Text } from 'react-native'

import styles from './styles'

export default function TimeBox( props ) {
    return(
        <View style={styles.timeBox}>
            <Text style={styles.timeTitle}>{props.title}</Text>
            <Text style={styles.hour}>{props.hour}</Text>
        </View>        
    )
}


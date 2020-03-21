import React, { useEffect } from 'react'
import { View, } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './styles'

export default function BreakIconsContainer(props) {
    const { breakCounter, finishedBreaks, pauseActive } = props
    
    const flipAnimation = {
        from: {
            rotate: '0deg'
        },
        to: {
            rotate: '360deg'
        }
    }

    function renderBreaks(){
        let breaks = []

        for (let c = 1; c <= breakCounter; c++){
            breaks.push(
                <Animatable.View
                    animation={(c-1 === finishedBreaks) && !pauseActive ? flipAnimation : ''} 
                    useNativeDriver
                    iterationCount={Infinity}
                    duration={2500}
                    easing="linear"
                    key={c}
                >
                    <Icon 
                        style={styles.icon} 
                        name={c <= finishedBreaks ? "hourglass-end" : "hourglass-start"} 
                        color={c <= finishedBreaks ? "#FC5185" : "white"} 
                        size={30} 
                    />
                </Animatable.View>
            )
        }
            
        return breaks
    } 


    return(
        <View style={styles.IconsContainer}>
            { renderBreaks() }
        </View>
    )
}
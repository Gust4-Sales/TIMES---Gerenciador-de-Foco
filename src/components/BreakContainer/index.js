import React, { useEffect, useState, } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import Slider from '@react-native-community/slider'
import { scheduleBreakFinishedNotification, cancellAllNotifications } from '../../Notification.config'
import Icon from "react-native-vector-icons/FontAwesome"
import ProgressBar from 'react-native-progress/Bar'
import * as Animatable from 'react-native-animatable'
import moment from 'moment'
import styles from './styles'


let breakTimeStart = null
const sliderValues = [ "Péssimo", "Ruim", "Médio", "Bom", "Ótimo"]

export default function BreakContainer(props) {
    let { breakTime } = props
    breakTime = breakTime * 60 
    // breakTime = 5 // remove

    const [containerOpacity, setContainerOpacity] = useState(1)
    const [sliderValue, setSliderValue] = useState("Médio")
    const [showSlider, setShowSlider] = useState(true)
    const [breakProgress, setBreakProgress] = useState(0)
    const [breakActive, setBreakActive] = useState(false)
    const [showBreakProgress, setShowBreakProgress] = useState(false)
    const [showConfirmarBtn, setShowConfirmarBtn] = useState(true)
    const [showCancelarBreakBtn, setShowCancelarBreakBtn] = useState(false)

    useEffect(() => {
        let breakTimer = null
        
        if (breakActive) {
            if (breakProgress < 1) {
                breakTimer = setInterval(() => {
                    let now = moment()
                    let secsSinceBreakStarted = now.diff(breakTimeStart, 'seconds')

                    setBreakProgress(secsSinceBreakStarted/breakTime) // SecsPassedSinceBreakStarted / Tempo de Intervalo in secs
                }, 1000)
            } else {
                clearInterval(breakTimer)
                finishBreak()
            }
        }
        
        return () => clearInterval(breakTimer) 
    }, [breakProgress, breakActive])


    useEffect(() => {
        if (showConfirmarBtn) {
            return
        }

        props.setFocusValue(sliderValues.indexOf(sliderValue) + 1)
        if (props.lastWorkingCicle){
            props.finishCicle()
        } else {
            // Notification
            cancellAllNotifications()
            scheduleBreakFinishedNotification(breakTime)
            
            setShowSlider(false)
            setShowBreakProgress(true)
            setShowCancelarBreakBtn(true)
            setShowConfirmarBtn(false)

            setBreakActive(true)
            breakTimeStart = moment()
        }
    }, [sliderValue, showConfirmarBtn])

    function finishBreak(showAlert = true){
        // Need to send the input answer to the parent 

        setContainerOpacity(0)

        if (showAlert){
            Alert.alert(
                "De volta ao trabalho!",
                "Seu intervalo acabou.",
                [{
                    text: "OK", onPress: () => {
                        props.closeModal()
                    }
                }]
            )
        } else {
            cancellAllNotifications()
            props.closeModal()
        }
    }

    return(
        <View style={[styles.container, { opacity: containerOpacity }]}>
            <Text style={styles.title}>{props.title}</Text>
            {
                showSlider && 
                <View style={{alignItems: 'center', paddingBottom: 15,}}>
                    <Text style={{fontSize: 20, marginBottom: 10}}>Avalie seu foco</Text>
                    <Text style={{color: '#3b2d40', paddingBottom: 4}}>{sliderValue}</Text>
                    <Slider
                        style={{width: 200}} 
                        onSlidingComplete={value => {
                            setSliderValue(sliderValues[value-1])
                        }}
                        value={3}
                        minimumValue={1}
                        maximumValue={5}
                        step={1}
                        minimumTrackTintColor="#574B90"
                        maximumTrackTintColor="#000000"
                        thumbTintColor="#FC5185"
                    />
                </View>
               
            }
            {
                showBreakProgress &&
                <ProgressBar 
                    progress={breakProgress} 
                    style={{marginBottom: 10}}
                    borderRadius={1} 
                    borderColor="#574B90" 
                    borderWidth={2} 
                    color="#FC5185" 
                    width={250}
                    height={15}
                    useNativeDriver={true} 
                />
            }

            <Animatable.View animation={ showConfirmarBtn ? "tada" : '' } iterationCount={Infinity} delay={1000}>
                <Icon name="bell" color="#fc5185" size={50} style={{marginBottom: 15}}/>
            </Animatable.View>
            
            {
                showConfirmarBtn &&
                <TouchableOpacity onPress={() => setShowConfirmarBtn(false)}>
                    <Text style={styles.txtBtn}>Confirmar</Text>
                </TouchableOpacity>
            }
            {
                showCancelarBreakBtn &&
                <TouchableOpacity onPress={() => finishBreak(false)}>
                    <Text style={styles.txtBtn}>Cancelar Intervalo</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

